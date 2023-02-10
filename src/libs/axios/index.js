import axios from 'axios'
import EventBus from '@/libs/AppEventBus'
import JSONbig from 'json-bigint'
import { useAuthStore } from '@/modules/auth/authStore'
import router from '@/routers'

const api = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

api.interceptors.request.use(function (config) {
    const store = useAuthStore()
    const token = store.getToken
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    config.transformResponse = (data) => data
    return config
})

api.interceptors.response.use(
    (res) => {
        res.data = JSONbig.parse(res.data)
        return res
    },
    (err) => {
        if (err.response) {
            console.log(err)
            if (err.response.status === 401) {
                const store = useAuthStore()
                store.logout()
                router.push({ name: 'login' })
            } else if (err.response.status === 403) {
                router.push({ name: 'not-authorized' })
            } else if (err.response.status === 422) {
                return Promise.reject(err.response)
            }
            showToast(err.message.data.message)
        } else if (err.request) {
            showToast(err.message)
        } else {
            showToast(err.message)
        }
    }
)

function showToast(message) {
    /**
     * Can see EventBus in AppWrapper(Top Component)
     */
    EventBus.emit('show-toast', {
        severity: 'error',
        summary: '',
        detail: message
    })
}

export default api
