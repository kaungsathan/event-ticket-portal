import api from '@/libs/axios'

const endpoints = {
  users: '/users',
  option_data: '/options'
}

const service = {
  getAll: async (params) => {
    try {
      const result = await api.get(endpoints.users, {
        params: params
      })
      return result.data
    } catch {
      return null
    }
  },
  getOne: async (params) => {
    try {
      const result = await api.get(`${endpoints.users}/${params.id}`)
      return result.data
    } catch {
      return null
    }
  },
  add: async (params) => {
    try {
      const result = await api.post(endpoints.users, params, {
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
      const result = await api.post(`${endpoints.users}/${params.id}/update`, params, {
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
      const result = await api.delete(`${endpoints.users}/${params.id}`)
      return result.data
    } catch {
      return null
    }
  },
  getAllRole: async (params) => {
    try {
      const result = await api.get(`${endpoints.option_data}/role`, {
        params: params
      })
      return result.data
    } catch {
      return null
    }
  }
}

export { service }
