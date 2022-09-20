import api from "@/libs/axios"

const endpoints = {
  subscription: "scsc/subscriptions"
}

const subscriptionService = {
  getAll: async (params) => {
    try {
      const result = await api.get(endpoints.subscription, { params: params })
      return result.data
    } catch {
      return null
    }
  },
  getOne: async (params) => {
    try {
      const result = await api.get(`${endpoints.subscription}/${params.id}`)
      return result.data
    } catch {
      return null
    }
  },
  update: async (params) => {
    try {
      const result = await api.put(
        `${endpoints.subscription}/${params.id}`,
        params
      )
      return result.data
    } catch {
      return null
    }
  },
  add: async (params) => {
    try {
      const result = await api.post(endpoints.subscription, params)
      return result.data
    } catch {
      return null
    }
  },
  delete: async (params) => {
    try {
      const result = await api.delete(`${endpoints.subscription}/${params.id}`)
      return result.data
    } catch {
      return null
    }
  }
}

export { subscriptionService }
