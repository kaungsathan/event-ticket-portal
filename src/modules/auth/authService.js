import api from '@/libs/axios'

const endpoints = {
  login: 'auth/login',
  logout: 'auth/logout',
  profile: 'auth/profile'
}

const authService = {
  login: async (params) => {
    try {
      const result = await api.post(endpoints.login, params)
      return result.data
    } catch {
      return null
    }
  },
  logout: (token) => {
    try {
      api.post(endpoints.logout, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch {
      console.log('log out error')
    }
  },
  getProfile: async () => {
    try {
      const result = await api.get(endpoints.profile)
      return result.data
    } catch {
      return null
    }
  },
  updateProfile: async (params) => {
    try {
      /**
       * need to use multipart/form-data instead of application/json for files uploads
       * use POST method for update because file upload is included
       * PUT or PATCH method is not supported by multipart/form-data
       * Comment by: Aung Kyaw Minn
       */
      const result = await api.post(endpoints.profile, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    } catch {
      return null
    }
  }
}

export { authService }
