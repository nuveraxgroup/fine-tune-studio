
export interface Message {
  role: string
  content: string
}

export interface Sample {
  messages: Message[]
}

export interface Errors {
  [key: string]: number
}

export interface SampleError {
  index: number
  errors: Errors
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