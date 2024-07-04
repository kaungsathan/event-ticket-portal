import axios from 'axios'
import EventBus from '@/libs/AppEventBus'
import JsonParseBigInt from 'json-parse-bigint'
import { useAuthStore } from '@/modules/auth/authStore'
import { useServerValidationStore } from '@/store/serverValidationStore'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

api.interceptors.request.use((config) => {
  const store = useAuthStore()
  const token = store.getToken
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  config.transformResponse = (data) => data
  return config
})

api.interceptors.response.use(
  (res) => {
    res.data = JsonParseBigInt(res.data)
    return res
  },
  async (err) => {
    if (err.response) {
      err.response.data = JSON.parse(err.response.data)
      if (err.response.status === 401) {
        const store = useAuthStore()
        store.logout()
        await router.push({ name: 'login' })
      } else if (err.response.status === 403) {
        await router.push({ name: 'not-authorized' })
      } else if (err.response.status === 422) {
        const serverValidationStore = useServerValidationStore()
        serverValidationStore.setErrors(err.response.data.data)
        return Promise.reject(err.response)
      }
      showToast(err.message)
    } else if (err.request) {
      showToast(err.message)
    } else {
      showToast(err.message)
    }
  }
)

const showToast = (message) => {
  EventBus.emit('show-toast', {
    severity: 'error',
    summary: 'Error',
    detail: message,
    life: 3000
  })
}

export default api
