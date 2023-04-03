import { defineStore } from 'pinia'
import { authService } from './authService'
import ability from '@/libs/acl/ability'

export const useAuthStore = defineStore({
    id: 'useAuthStore',
    state: () => ({
        token: localStorage.getItem('userToken') || null,
        userData: localStorage.getItem('userData') || null,
        loginResponse: null
    }),

    getters: {
        getToken(state) {
            return state.token
        },
        getUserData(state) {
            return state.userData ? JSON.parse(state.userData) : null
        },
        getLoginResponse(state) {
            return state.loginResponse
        },
        isAuth(state) {
            return state.token ? true : false
        }
    },

    actions: {
        async login(params) {
            const response = await authService.login(params)
            this.loginResponse = response
            if (response) {
                this.userData = JSON.stringify(response.data.user)
                this.token = response.data.access_token
                //update abality after successfully login
                ability.update(response.data.allowed_permissions)

                localStorage.setItem('userAbility', JSON.stringify(response.data.allowed_permissions))
                localStorage.setItem('userToken', response.data.access_token)
                localStorage.setItem('userData', JSON.stringify(response.data.user))
            }
        },
        logout() {
            this.token = null
            this.userData = null
            localStorage.removeItem('userToken')
            localStorage.removeItem('userData')
            localStorage.removeItem('userAbility')
        }
    }
})
