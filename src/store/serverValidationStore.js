import { defineStore } from 'pinia'

export const useServerValidationStore = defineStore({
  id: 'useServerValidationStore',
  state: () => ({
    errors: {}
  }),

  getters: {
    getErrors(state) {
      return state.errors
    },

    getError: (state) => (key) => {
      return state.errors ? state.errors[key] : null
    },

    hasErrors(state) {
      return Object.keys(state.errors).length > 0
    }
  },

  actions: {
    setErrors(errors) {
      this.errors = errors
    }
  }
})
