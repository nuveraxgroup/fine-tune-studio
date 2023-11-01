
export interface Message {
  role: string
  content: string
}

export interface Sample {
  messages: Message[]
}

export interface Error {
  [key: string]: number
}

export interface ErrorFile {
  [key: string]: string
}

export interface SampleError {
  index: number
  errors: Error
}

export interface SampleTokens {
  index: number
  nMissingSystem: number
  nMissingUser: number
  nMessages: number
  messagesTokensSize: number
  nTooLong: boolean
  assistantMessageLen: number
}

export interface Distribution {
  min: number
  max: number
  mean: number
  median: number
  p1: number
  p90: number
}

export interface AnalyzeReport {
  samples: number,
  errorLines?: SampleError[]
  tokens?: SampleTokens[],
  messageDistribution?: Distribution
  tokensDistribution?: Distribution
  assistantTokenDistribution?: Distribution,
  costEstimation?: CostEstimation,
  errors?: ErrorFile[]
}

export interface CostEstimation {
  nBillingTokensInDataset: number
  nEpochs: number
  totalTokens: number
  costEstimation: number
}