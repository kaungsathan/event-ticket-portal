import { defineStore } from "pinia";

export const useLocaleStore = defineStore({
  id: "useLocaleStore",
  state: () => ({
    currentLocale: "en",
  }),

  getters: {
    getCurrentLanguage(state) {
      return state.currentLocale;
    },
  },

  actions: {
    async setLanguage(params) {
      this.currentLocale = params;
    },
  },
});
