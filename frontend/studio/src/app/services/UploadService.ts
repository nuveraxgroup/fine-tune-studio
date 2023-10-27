
export interface FilesInfo {
  file: File
}

export interface UploadToOpenAI {
  fileName: string
}

interface UploadServiceProps {
  jsonl(file: FilesInfo): Promise<any>
  localFiles(): Promise<any>
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

  const localFiles = async (): Promise<any> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/temp`, {
      method: 'GET',
      // headers: { "Authorization": `Bearer ${token}` }
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  const push = async (data: UploadToOpenAI): Promise<any> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/push`, {
      method: 'POST',
      // headers: { "Authorization": `Bearer ${token}` },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  return {
    jsonl,
    localFiles,
    push
  }
}