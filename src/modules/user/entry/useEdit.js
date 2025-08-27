import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required, email, minLength, maxLength, numeric, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import placeholderImage from '@/assets/images/placeholder.png'

export const useEdit = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const isLoading = ref(true)

  const state = reactive({
    username: '',
    full_name: '',
    password: null,
    email: '',
    phone: '',
    avatar: null,
    role: null,
    status: 'active',
    avatar_updated: false
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
    fetchUser()
    fetchRoles()
  })

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const fetchUser = async () => {
    isLoading.value = true

    await store.fetchOne({
      id: route.params.id
    })

    const response = store.getOneResponse

    if (response && response.data) {
      state.username = response.data.username
      state.full_name = response.data.full_name
      state.email = response.data.email
      state.phone = response.data.phone
      state.avatar = response.data.avatar
      state.role = response.data.role
      state.status = response.data.status
      if (state.avatar != null) {
        avatarPreview.value = state.avatar
      }
    }

    isLoading.value = false
  }

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
  }

  const onFileChange = (event) => {
    const file = event.files[0] // Assuming event.target is the input element

    if (file) {
      state.avatar_updated = true
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
      updateRecord()
    }
  }

  const updateRecord = async () => {
    isLoading.value = true

    try {
      await store.update({
        id: route.params.id,
        username: state.username,
        full_name: state.full_name,
        password: state.password,
        email: state.email,
        phone: state.phone,
        role: state.role,
        status: state.status
      })

      const response = store.getUpdateResponse

      if (response) {
        router.push({ name: 'userList' })
      }

      isLoading.value = false
    } catch (error) {
      console.log(error)
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
