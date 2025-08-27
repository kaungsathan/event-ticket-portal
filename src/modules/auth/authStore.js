import { defineStore } from 'pinia'
import { authService } from './authService'
import ability from '@/libs/casl/ability'

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
        this.token = response.data.token
        //update ability after successfully login
        ability.update(response.data.user.permissions)

        localStorage.setItem('userToken', response.data.token)
        localStorage.setItem('userData', JSON.stringify(response.data.user))
        localStorage.setItem('userAbility', JSON.stringify(response.data.user.permissions))
      }
    },
    logout() {
      this.token = null
      this.userData = null
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('userAbility')
    },
    async fetchProfile() {
      const response = await authService.getProfile()
      if (response) {
        this.userData = JSON.stringify(response.data)
        localStorage.setItem('userData', this.userData)
      }
    },
    async update(params) {
      const response = await authService.updateProfile(params)
      if (response) {
        this.userData = JSON.stringify(response.data)
      }
    }
  }
})
