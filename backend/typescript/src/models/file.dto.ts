export interface UploadToOpenAI {
  fileName: string
}

export interface DeleteFile {
  fileNames: string[]
}

export interface FileDir {
  type: string
  name: string
}