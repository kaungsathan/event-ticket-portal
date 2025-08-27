import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required, email, minLength, maxLength, numeric, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRouter } from 'vue-router'
import placeholderImage from '@/assets/images/placeholder.png'

export const useNew = () => {
  const store = useStore()
  const router = useRouter()
  const isLoading = ref(false)
  const state = reactive({
    username: '',
    full_name: '',
    password: '',
    email: '',
    phone: '',
    avatar: null,
    role: null,
    status: 'Active'
  })
  const avatarPreview = ref(placeholderImage)

  const roles = ref([])

  const statuses = ref([
    { name: 'Active', code: 'active' },
    { name: 'Inactive', code: 'inactive' },
    { name: 'Locked', code: 'locked' }
  ])

  const rules = {
    username: { required },
    full_name: { required },
    password: {
      required,
      minLength: helpers.withMessage('Value should be at least 8 characters', minLength(8))
    },
    email: { email },
    phone: {
      numeric,
      minLength: helpers.withMessage('Value should be at least 6 characters', minLength(6)),
      maxLength: maxLength(12)
    },
    role: { required },
    status: { required }
  }

  const submitted = ref(false)

  const v$ = useVuelidate(rules, state)

  onMounted(() => {
    fetchRoles()
  })

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const fetchRoles = async () => {
    isLoading.value = true
    //fetch API
    await store.fetchAllRole()
    //get response
    const response = store.getAllRoleResponse

    //assign value
    if (response) {
      const options = response.data
      for (let i = 0; i < options.length; i += 1) {
        roles.value.push({ name: options[i].name, code: options[i].id })
      }
    }
    isLoading.value = false
  }

  const onFileChange = (event) => {
    const file = event.files[0] // Assuming event.target is the input element

    if (file) {
      state.avatar = file
      const reader = new FileReader()
      reader.onload = (e) => {
        avatarPreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const onFileRemove = () => {
    state.avatar = null
    avatarPreview.value = placeholderImage
  }

  const handleSubmit = (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
      return
    }

    if (!isLoading.value) {
      addUser()
    }
  }

  const addUser = async () => {
    isLoading.value = true

    try {
      await store.add({
        username: state.username,
        full_name: state.full_name,
        password: state.password,
        email: state.email,
        phone: state.phone,
        avatar: state.avatar,
        role: state.role,
        status: state.status
      })

      const response = store.getAddResponse

      if (response) {
        router.push({ name: 'userList' })
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
    roles,
    onFileChange,
    onFileRemove,
    avatarPreview,
    v$,
    handleSubmit,
    submitted
  }
}
