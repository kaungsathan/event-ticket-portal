import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required, email, url } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRouter, useRoute } from 'vue-router'

export const useEdit = () => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
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
    fetchOrganizer()
  })

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const fetchOrganizer = async () => {
    isLoading.value = true

    await store.fetchOne({
      id: route.params.id
    })

    const response = store.getOneResponse

    if (response && response.data) {
      state.company_name = response.data.company_name
      state.description = response.data.description
      state.email = response.data.email
      state.company_phone = response.data.company_phone
      state.website = response.data.website
      state.address = response.data.address
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
      updateOrganizer()
    }
  }

  const updateOrganizer = async () => {
    isLoading.value = true

    try {
      await store.update({
        id: route.params.id,
        company_name: state.company_name,
        description: state.description,
        email: state.email,
        company_phone: state.company_phone,
        website: state.website,
        address: state.address,
        status: state.status
      })

      const response = store.getUpdateResponse

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
