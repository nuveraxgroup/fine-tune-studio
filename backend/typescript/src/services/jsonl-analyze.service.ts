import {
  AnalyzeReport, CostEstimation,
  Distribution,
  Error,
  Message,
  Sample,
  SampleError,
  SampleTokens
} from "../models/fine-tune.dto";
import { getEncoding, encodingForModel } from "js-tiktoken"
import percentile from "percentile"

export const jsonlAnalyze = (values: string[]): AnalyzeReport => {
  if(values.length >= 10) {
    const errorLines: SampleError[] = values.map((e, i) => ({ index: i, errors: jsonlAnalyzeLine(e) }))
      .filter((e) => e.errors !== null)
    if (errorLines.length === 0) {
      const tokens: SampleTokens[] = values.map((e, i) => jsonlTokenCountLine(i, e))
      const messageDist = distribution(
        tokens.map((e) => e.nMessages)
      )
      const tokensDist = distribution(
        tokens.map((e) => e.messagesTokensSize)
      )
      const assistantTokenDist = distribution(
        tokens.map((e) => e.assistantMessageLen)
      )
      const estimation = costEstimation(values, tokens.map((e) => e.messagesTokensSize))
      return {
        samples: values.length,
        tokens,
        messageDistribution: messageDist,
        tokensDistribution: tokensDist,
        assistantTokenDistribution: assistantTokenDist,
        costEstimation: estimation
      }
    }
    return {
      samples: values.length,
      errorLines
    }
  } else {
    // throw error if the have lass that 10 samples on the file
    return {
      samples: values.length,
      errors: [
        {
          "n_samples": `Min number of samples allowed "10"`
        }
      ]
    }
  }
}

export const jsonlAnalyzeLine = (values: string): Error | null => {
  const formatErrors: Error = {};
  try {
    const toJsonValues: any = JSON.parse(values)
    if (typeof toJsonValues !== 'object') {
      formatErrors["data_type"] = (formatErrors["data_type"] || 0) + 1;
      return formatErrors
    }
    const messages: any[] = toJsonValues.messages || [];
    if (messages.length === 0) {
      formatErrors["missing_messages_list"] = (formatErrors["missing_messages_list"] || 0) + 1;
      return formatErrors
    }
    for (const message of messages) {
      if (!("role" in message) || !("content" in message)) {
        formatErrors["message_missing_key"] = (formatErrors["message_missing_key"] || 0) + 1;
      }
      if (Object.keys(message).some(key => !["role", "content", "name", "function_call"].includes(key))) {
        formatErrors["message_unrecognized_key"] = (formatErrors["message_unrecognized_key"] || 0) + 1;
      }
      if (!["system", "user", "assistant", "function"].includes(message.role)) {
        formatErrors["unrecognized_role"] = (formatErrors["unrecognized_role"] || 0) + 1;
      }
      const content = message.content;
      const functionCall = message.function_call;
      if ((!content && !functionCall) || typeof content !== "string") {
        formatErrors["missing_content"] = (formatErrors["missing_content"] || 0) + 1;
      }
    }
    if (!messages.some(message => message.role === "assistant")) {
      formatErrors["example_missing_assistant_message"] = (formatErrors["example_missing_assistant_message"] || 0) + 1;
    }
  } catch (e) {
    formatErrors["missing_json_struct"] = (formatErrors["missing_json_struct"] || 0) + 1;
  }
  return Object.keys(formatErrors).length > 0 ? formatErrors: null
}

export const jsonlTokenCountLine = (index: number,values: string): SampleTokens => {
  let nMissingSystem: number = 0;
  let nMissingUser: number = 0;
  const toJsonValues: Sample = JSON.parse(values)
  if (!toJsonValues.messages.some(message => message.role === "system")) {
    nMissingSystem++;
  }
  if (!toJsonValues.messages.some(message => message.role === "user")) {
    nMissingUser++;
  }
  const nMessages = toJsonValues.messages.length
  const messagesTokensSize = numTokensFromMessages(toJsonValues.messages)
  const assistantMessageLen = numAssistantTokensFromMessages(toJsonValues.messages)
  return {
    index,
    nMissingSystem,
    nMissingUser,
    nMessages,
    messagesTokensSize,
    nTooLong: messagesTokensSize > 4096,
    assistantMessageLen
  }
}

export const numTokensFromMessages = (
  messages: Message[],
  model= "gpt-3.5-turbo-0613"
): number => {
  const enc = getEncoding("cl100k_base")
  let numTokens = 0
  let tokensPerMessage: number = 3
  let tokensPerName: number = 1
  if(model === "gpt-3.5-turbo-0301") {
    tokensPerMessage = 4
    tokensPerName = -1
  }
  messages.forEach((e) => {
    numTokens += tokensPerMessage
    for (const [key, value] of Object.entries(e)) {
      numTokens += enc.encode(value).length
      if(key === "name") {
        numTokens += tokensPerName
      }
    }
  })
  numTokens += 3
  return numTokens
}

export const numAssistantTokensFromMessages = (messages: Message[]): number => {
  const enc = getEncoding("cl100k_base")
  let numTokens = 0
  messages.forEach((e) => {
    if(e.role === "assistant") {
      numTokens += enc.encode(e.content).length
    }
  })
  return numTokens
}

export const distribution = (values: number[]): Distribution => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = calculateMean(values);
  const median = calculateMedian(values);
  const p1 = calculatePercentile(values, 10);
  const p90 = calculatePercentile(values, 90);
  return {
    min,
    max,
    mean,
    median,
    p1,
    p90
  }
}

function calculateMean(values: number[]): number {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

function calculateMedian(values: number[]): number {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  }
  return sortedValues[middle];
}

function calculatePercentile(values: number[], nPercentile: number): number {
  return <number>percentile(nPercentile, values)
}

const costEstimation = (values: string[], messagesTokensSize: number[]): CostEstimation => {
  // https://openai.com/pricing
  const MAX_TOKENS_PER_EXAMPLE = 4096
  const TARGET_EPOCHS = 3
  const MIN_TARGET_EXAMPLES = 100
  const MAX_TARGET_EXAMPLES = 25000
  const MIN_DEFAULT_EPOCHS = 1
  const MAX_DEFAULT_EPOCHS = 25
  const TRAINING_TOKENS = 0.0080
  let nEpochs = TARGET_EPOCHS
  const nTrainSamples = values.length
  if(nTrainSamples * TARGET_EPOCHS < MIN_TARGET_EXAMPLES) {
    nEpochs = Math.min(MAX_DEFAULT_EPOCHS, Math.floor(MIN_TARGET_EXAMPLES / nTrainSamples))
  } else if (nTrainSamples * TARGET_EPOCHS > MAX_TARGET_EXAMPLES) {
    nEpochs = Math.max(MIN_DEFAULT_EPOCHS, Math.floor(MAX_TARGET_EXAMPLES / nTrainSamples))
  }
  const nBillingTokensInDataset: number = messagesTokensSize.reduce((total, length) => total + Math.min(MAX_TOKENS_PER_EXAMPLE, length), 0)
  const totalTokens = nEpochs * nBillingTokensInDataset
  const costEstimation = (TRAINING_TOKENS * totalTokens) / 1000
  console.log(`Dataset has ~${nBillingTokensInDataset} tokens that will be charged for during training`);
  console.log(`By default, you'll train for ${nEpochs} epochs on this dataset`);
  console.log(`By default, you'll be charged for ~${totalTokens} tokens`);
  console.log(`Cost Estimation $${costEstimation} USD`);
  return {
    nBillingTokensInDataset,
    nEpochs,
    totalTokens,
    costEstimation
  }
}