import { defineStore } from "pinia"
import Cookies from "js-cookie"

export const useLocaleStore = defineStore({
  id: "useLocaleStore",
  state: () => ({
    currentLocale: Cookies.get("locale") || "en",
    currentTheme: Cookies.get("theme") || "lara-light-indigo"
  }),

  getters: {
    getCurrentLanguage(state) {
      return state.currentLocale
    },
    getCurrentTheme(state) {
      return state.currentTheme
    }
  },

  actions: {
    async setLanguage(locale) {
      this.currentLocale = locale
      Cookies.set("locale", locale)
    },
    async setTheme(theme) {
      this.currentTheme = theme
      Cookies.set("theme", theme)
    }
  }
})
