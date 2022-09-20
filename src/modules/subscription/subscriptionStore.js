import { defineStore } from "pinia"
import { subscriptionService } from "./subscriptionService"

export const useSubscriptionStore = defineStore({
  id: "useSubscriptionStore",
  state: () => ({
    listResponse: null,
    oneResponse: null,
    updateResponse: null,
    addResponse: null,
    deleteResponse: null
  }),

  getters: {
    getAllResponse(state) {
      return state.listResponse
    },
    getOneResponse(state) {
      return state.adminUserResponse
    },
    getAddResponse(state) {
      return state.addResponse
    },
    getUpdateResponse(state) {
      return state.updateResponse
    },
    getDeleteResponse(state) {
      return state.deleteResponse
    }
  },

  actions: {
    async fetchAll(params) {
      const response = await subscriptionService.getAll(params)
      this.listResponse = response
    },
    async fetchOne(params) {
      const response = await subscriptionService.getOne(params)
      this.adminUserResponse = response
    },
    async update(params) {
      const response = await subscriptionService.update(params)
      this.updateResponse = response
    },
    async add(params) {
      const response = await subscriptionService.add(params)
      this.addResponse = response
    },
    async delete(params) {
      const response = await subscriptionService.delete(params)
      this.deleteResponse = response
    }
  }
})
