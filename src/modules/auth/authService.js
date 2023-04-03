import api from '@/libs/axios'

const endpoints = {
    login: 'auth/login'
}

const authService = {
    login: async (params) => {
        try {
            const result = await api.post(endpoints.login, params)
            return result.data
        } catch {
            return null
        }
    }
}

export { authService }
