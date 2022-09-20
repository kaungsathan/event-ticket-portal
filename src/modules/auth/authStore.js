import { defineStore } from "pinia"
import Cookies from "js-cookie"
import { authService } from "./authService"

export const useAuthStore = defineStore({
  id: "useAuthStore",
  state: () => ({
    token: Cookies.get("userToken") || null,
    userData: Cookies.get("userData") || null,
    loginResponse: null
  }),

  getters: {
    getToken(state) {
      return state.token
    },
    getUserData(state) {
      return state.userData
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
        Cookies.set("userToken", response.data.access_token)
        Cookies.set("userData", JSON.stringify(response.data.user))
        this.token = response.data.access_token
        this.userData = response.data.user
      }
    },
    logout() {
      this.token = null
      this.userData = null
      Cookies.remove("userToken")
      Cookies.remove("userData")
      // authService.logout()
    }
  }
})
