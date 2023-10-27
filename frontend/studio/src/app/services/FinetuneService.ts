

interface FinetuneServiceProps {
  list(limit?: number): Promise<any>
  retrieve(id: string): Promise<any>
  cancel(id: string): Promise<any>
  events(id: string, limit?: number): Promise<any>
  del(id: string): Promise<any>
}

export const finetuneService = (): FinetuneServiceProps => {

  const list = async (limit: number = 100): Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/fine-tune/list`)
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

  const retrieve = async (id: string): Promise<any> => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/fine-tune/retrieve/${id}`)
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
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/fine-tune/cancel/${id}`)
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
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/fine-tune/events/${id}`)
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
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/fine-tune/model/${id}`)
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