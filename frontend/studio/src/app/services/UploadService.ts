
export interface FilesInfo {
  file: File
}

export interface DeleteFile {
  fileNames: string[]
}

export interface UploadToOpenAI {
  trainingFile: string
  validationFIle?: string
  suffix?: string
}
export interface SimpleFIle {
  type: string
  name: string
}
export interface LocalFiles {
  files: SimpleFIle[]
}

interface UploadServiceProps {
  jsonl(file: FilesInfo): Promise<any>
  jsonlDel(data: DeleteFile): Promise<any>
  localFiles(): Promise<LocalFiles>
  push(data: UploadToOpenAI): Promise<any>
}

export const uploadService = (): UploadServiceProps => {

  const jsonl = async (file: FilesInfo): Promise<any> => {
    const formData = new FormData()
    formData.append("file", file.file)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/jsonl`, {
      method: 'POST',
      // headers: { "Authorization": `Bearer ${token}` },
      body: formData,
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  const jsonlDel = async (data: DeleteFile): Promise<any> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/jsonl-del`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  const localFiles = async (): Promise<any> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/temp`, {
      method: 'GET',
      headers: {
        Accept: "application/json; charset=utf-8"
        // "Content-Type": "application/json; charset=utf-8"
        // "Authorization": `Bearer ${token}`
      }
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  const push = async (data: UploadToOpenAI): Promise<any> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/push`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  return {
    jsonl,
    jsonlDel,
    localFiles,
    push
  }
}