import { defineStore } from "pinia"

export const useLocaleStore = defineStore({
  id: "useLocaleStore",
  state: () => ({
    currentLocale: localStorage.getItem("locale") || "en",
    currentTheme: localStorage.getItem("theme") || "lara-light-indigo"
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
      localStorage.setItem("locale", locale)
    },
    async setTheme(theme) {
      this.currentTheme = theme
      localStorage.setItem("theme", theme)
    }
  }
})
