import api from '@/libs/axios'

const endpoints = {
  events: 'api/events',
  option_data: 'api/options'
}

const service = {
  getAll: async (params) => {
    try {
      const result = await api.get(endpoints.events, {
        params: params
      })
      return result.data
    } catch {
      return null
    }
  },
  getOne: async (params) => {
    try {
      const result = await api.get(`${endpoints.events}/${params.id}`)
      return result.data
    } catch {
      return null
    }
  },
  add: async (params) => {
    try {
      const result = await api.post(endpoints.events, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    } catch {
      return null
    }
  },
  update: async (params) => {
    try {
      /**
       * need to use multipart/form-data instead of application/json for files uploads
       * use POST method for update because file upload is included
       * PUT or PATCH method is not supported by multipart/form-data
       * Comment by: Aung Kyaw Minn
       */
      const result = await api.post(`${endpoints.events}/${params.id}/update`, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    } catch {
      return null
    }
  },
  delete: async (params) => {
    try {
      const result = await api.delete(`${endpoints.events}/${params.id}`)
      return result.data
    } catch {
      return null
    }
  }
}

export { service }
