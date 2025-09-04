import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRouter } from 'vue-router'

export const useNew = () => {
  const store = useStore()
  const router = useRouter()
  const isLoading = ref(false)
  const state = reactive({
    event_id: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
    quantity: '',
    total_amount: '',
    payment_status: '',
    payment_method: '',
    status: 'completed'
  })

  const statuses = ref([
    { name: 'Completed', code: 'completed' },
    { name: 'Failed', code: 'failed' }
  ])

  const rules = {
    event_id: { required },
    customer_name: { required },
    customer_email: { required },
    customer_phone: { required },
    customer_address: { required },
    quantity: { required },
    total_amount: { required },
    payment_status: { required },
    payment_method: { required },
    status: { required }
  }

  const submitted = ref(false)

  const v$ = useVuelidate(rules, state)

  onMounted(() => {
    // Any initialization logic can go here
  })

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const handleSubmit = (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
      return
    }

    if (!isLoading.value) {
      addOrganizer()
    }
  }

  const addOrganizer = async () => {
    isLoading.value = true

    try {
      await store.add({
        event_id: state.event_id,
        customer_name: state.customer_name,
        customer_email: state.customer_email,
        customer_phone: state.customer_phone,
        customer_address: state.customer_address,
        quantity: state.quantity,
        total_amount: state.total_amount,
        payment_status: state.payment_status,
        payment_method: state.payment_method,
        status: state.status
      })

      const response = store.getAddResponse

      if (response) {
        router.push({ name: 'orderList' })
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
