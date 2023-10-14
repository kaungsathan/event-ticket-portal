import api from '@/libs/axios'

const endpoints = {
  login: 'auth/login',
  logout: 'auth/logout'
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
  }
}

export { authService }
