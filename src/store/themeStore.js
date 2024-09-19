import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'useThemeStore',
  state: () => ({
    theme: localStorage.getItem('theme') || 'light'
  }),

  getters: {
    getTheme(state) {
      return state.theme
    }
  },

  actions: {
    setTheme(theme) {
      this.theme = theme
      localStorage.setItem('theme', theme)
    }
  }
})
