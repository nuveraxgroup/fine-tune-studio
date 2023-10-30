export interface UploadToOpenAI {
  trainingFile: string
  validationFIle?: string
  suffix?: string
}

export interface DeleteFile {
  fileNames: string[]
}

export interface AnalyzeFile {
  fileName: string
}

export interface FileDir {
  type: string
  name: string
}