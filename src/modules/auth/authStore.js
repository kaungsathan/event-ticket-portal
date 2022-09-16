import { defineStore } from "pinia"
import Cookies from "js-cookie"
import { authService } from "./authService"

export const useAuthStore = defineStore({
  id: "useAuthStore",
  state: () => ({
    token: Cookies.get("userToken") || null,
    loginResponse: null
  }),

  getters: {
    getToken(state) {
      return state.token
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
        this.token = "token"
      }
    },
    logout() {
      this.token = null
      authService.logout()
    }
  }
})
