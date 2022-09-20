import axios from "axios"
import EventBus from "@/libs/AppEventBus"
import JSONbig from "json-bigint"
import { useAuthStore } from "@/modules/auth/authStore"

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
})

api.interceptors.request.use(function (config) {
  const store = useAuthStore()
  const token = store.getToken
  config.headers.common["Authorization"] = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => {
    res.data = JSONbig.parse(JSON.stringify(res.data))
    return res
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 403) {
        console.log("Session Error")
      }
      /**
       * Can see EventBus in AppWrapper(Top Component)
       */
      EventBus.emit("show-toast", {
        severity: "error",
        summary: "",
        detail: err.message
      })
    } else if (err.request) {
      EventBus.emit("show-toast", {
        severity: "error",
        summary: "",
        detail: err.message
      })
    } else {
      EventBus.emit("show-toast", {
        severity: "error",
        summary: "",
        detail: err.message
      })
    }
  }
)

export default api
