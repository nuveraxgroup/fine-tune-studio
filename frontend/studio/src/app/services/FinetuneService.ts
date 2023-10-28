
export interface Job {
  object: string
  id: string
  created_at: string
  level: string
  message: string
  data: any
  type: string
}
export interface BodyJob {
  data: Job[]
  has_more: boolean
  object: string
}
export interface Page {
  body: BodyJob
  data: Job[]
  options: {
    method: string
    path: string
    query: {
      limit: number
    }
  }
  response: {
    size: number
    timeout: number
  }
}

export interface JobList {
  page: Page
}

interface FinetuneServiceProps {
  list(limit?: number): Promise<JobList>
  retrieve(id: string): Promise<any>
  cancel(id: string): Promise<any>
  events(id: string, limit?: number): Promise<any>
  del(id: string): Promise<any>
}

export const finetuneService = (): FinetuneServiceProps => {

  const list = async (limit: number = 100): Promise<JobList> => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/finetune/list`)
    const query = new URLSearchParams()
    query.set("limit", `${limit}`)
    url.search = query.toString()
    const response = await fetch(url.toString(), {
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

  const retrieve = async (id: string): Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/finetune/retrieve/${id}`)
    const response = await fetch(url.toString(), {
      method: 'GET',
      // headers: { "Authorization": `Bearer ${token}` }
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  const cancel = async (id: string): Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/finetune/cancel/${id}`)
    const response = await fetch(url.toString(), {
      method: 'PUT',
      // headers: { "Authorization": `Bearer ${token}` }
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  const events = async (id: string, limit: number = 100): Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/finetune/events/${id}`)
    const query = new URLSearchParams()
    query.set("limit", `${limit}`)
    url.search = query.toString()
    const response = await fetch(url.toString(), {
      method: 'GET',
      // headers: { "Authorization": `Bearer ${token}` }
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  const del = async (id: string): Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/finetune/model/${id}`)
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      // headers: { "Authorization": `Bearer ${token}` }
    })
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject(new Error("Error"))
  }

  return {
    list,
    retrieve,
    cancel,
    events,
    del
  }
}