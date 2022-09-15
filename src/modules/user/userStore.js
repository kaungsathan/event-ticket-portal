import { defineStore } from "pinia"
import { userService } from "./userService"

export const useUserStore = defineStore({
  id: "useUserStore",
  state: () => ({
    listResponse: null,
    oneResponse: null,
    updateResponse: null,
    addResponse: null,
    deleteResponse: null,
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
    },
  },

  actions: {
    async fetchAll(params) {
      const response = await userService.getAll(params)
      this.listResponse = response
    },
    async fetchOne(params) {
      const response = await userService.getOne(params)
      this.adminUserResponse = response
    },
    async update(params) {
      const response = await userService.update(params)
      this.updateResponse = response
    },
    async add(params) {
      const response = await userService.add(params)
      this.addResponse = response
    },
    async delete(params) {
      const response = await userService.delete(params)
      this.deleteResponse = response
    },
  },
})
