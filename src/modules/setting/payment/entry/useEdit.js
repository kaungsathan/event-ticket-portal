import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRouter, useRoute } from 'vue-router'

export const useEdit = () => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const isLoading = ref(false)
  const state = reactive({
    name: '',
    status: 'active'
  })

  const statuses = ref([
    { name: 'Active', code: 'active' },
    { name: 'Inactive', code: 'inactive' }
  ])

  const rules = {
    name: { required },
    code: {},
    status: { required }
  }

  const submitted = ref(false)

  const v$ = useVuelidate(rules, state)

  onMounted(() => {
    // Any initialization logic can go here
    fetchPayment()
  })

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const fetchPayment = async () => {
    isLoading.value = true

    await store.fetchOne({
      id: route.params.id
    })

    const response = store.getOneResponse

    if (response && response.data) {
      state.name = response.data.name
      state.status = response.data.status
    }

    isLoading.value = false
  }

  const handleSubmit = (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
      return
    }

    if (!isLoading.value) {
      updatePayment()
    }
  }

  const updatePayment = async () => {
    isLoading.value = true

    try {
      await store.update({
        id: route.params.id,
        name: state.name,
        status: state.status
      })

      const response = store.getUpdateResponse

      if (response) {
        router.push({ name: 'paymentList' })
      }

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    state,
    statuses,
    v$,
    handleSubmit,
    submitted
  }
}
