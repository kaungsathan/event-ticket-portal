import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required, email, url } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRouter } from 'vue-router'

export const useNew = () => {
  const store = useStore()
  const router = useRouter()
  const isLoading = ref(false)
  const state = reactive({
    company_name: '',
    description: '',
    email: '',
    company_phone: '',
    website: '',
    address: '',
    status: 'active'
  })

  const statuses = ref([
    { name: 'Active', code: 'active' },
    { name: 'Inactive', code: 'inactive' }
  ])

  const rules = {
    company_name: { required },
    description: {},
    email: { required, email },
    company_phone: { required },
    website: { url },
    address: {},
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
        company_name: state.company_name,
        description: state.description,
        email: state.email,
        company_phone: state.company_phone,
        website: state.website,
        address: state.address,
        status: state.status
      })

      const response = store.getAddResponse

      if (response) {
        router.push({ name: 'organizerList' })
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
