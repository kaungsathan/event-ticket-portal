import { reactive, ref, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../authStore'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'

export const useLogin = () => {
  const store = useAuthStore()
  const router = useRouter()

  const submitted = ref(false)
  const isLoading = ref(false)

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const state = reactive({
    identifier: '',
    password: ''
  })

  const rules = {
    identifier: { required },
    password: { required }
  }

  const v$ = useVuelidate(rules, state)

  const handleSubmit = async (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
      return
    }

    if (!isLoading.value) {
      await loginUser()
    }
  }

  const loginUser = async () => {
    isLoading.value = true

    await store.login({
      email: state.identifier.trim(),
      password: state.password.trim()
    })

    const response = store.getLoginResponse

    if (response) {
      isLoading.value = false
      await router.replace({ name: 'dashboard' })
    } else {
      isLoading.value = false
    }
  }

  return {
    state,
    v$,
    handleSubmit,
    submitted,
    isLoading
  }
}
