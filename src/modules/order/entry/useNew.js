import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRouter } from 'vue-router'
import { useStore as useEventStore } from '../../event/store'
import { useStore as usePaymentStore } from '../../setting/payment/store'

export const useNew = () => {
  const store = useStore()
  const router = useRouter()
  const eventStore = useEventStore()
  const paymentStore = usePaymentStore()
  const isLoading = ref(false)
  const events = ref([])
  const paymentMethods = ref([])
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

  const paymentStatuses = ref([
    { name: 'Pending', code: 'pending' },
    { name: 'Paid', code: 'paid' },
    { name: 'Failed', code: 'failed' },
    { name: 'Refunded', code: 'refunded' }
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
    fetchEvents()
    fetchPaymentMethods()
  })

  onBeforeUnmount(() => {
    store.$dispose()
    eventStore.$dispose()
    paymentStore.$dispose()
  })

  const handleSubmit = (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
      return
    }

    if (!isLoading.value) {
      addOrder()
    }
  }

  const fetchEvents = async () => {
    try {
      await eventStore.fetchAll({
        page: 1,
        per_page: 1000,
        status: 'active'
      })

      const response = eventStore.getAllResponse

      if (response && response.data.data.length > 0) {
        events.value = response.data.data.map((event) => ({
          id: event.id,
          name: event.title
        }))
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }

  const fetchPaymentMethods = async () => {
    try {
      await paymentStore.fetchAll({
        page: 1,
        per_page: 1000,
        status: 'active'
      })

      const response = paymentStore.getAllResponse

      if (response && response.data) {
        paymentMethods.value = response.data.data.map((method) => ({
          id: method.id,
          name: method.name
        }))
      }
    } catch (error) {
      console.error('Failed to fetch payment methods:', error)
    }
  }

  const addOrder = async () => {
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
    paymentStatuses,
    events,
    paymentMethods,
    v$,
    handleSubmit,
    submitted
  }
}
