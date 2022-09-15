import axios from "axios"

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(function (config) {
  const token = ""
  config.headers.common["Authorization"] = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 403) {
        console.log("Session Error")
      }
      alert(err.message)
    } else if (err.request) {
      alert(err.message)
    } else {
      alert(err.message)
    }
  }
)

export default api
