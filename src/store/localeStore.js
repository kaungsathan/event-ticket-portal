import { defineStore } from "pinia";
import Cookies from 'js-cookie'

export const useLocaleStore = defineStore({
  id: "useLocaleStore",
  state: () => ({
    currentLocale: Cookies.get('locale') || "en",
  }),

  getters: {
    getCurrentLanguage(state) {
      return state.currentLocale;
    },
  },

  actions: {
    async setLanguage(locale) {
      this.currentLocale = locale;
      Cookies.set('locale', locale)
    },
  },
});
