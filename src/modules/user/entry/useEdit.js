import { reactive, ref, onMounted, onBeforeUnmount } from "vue"
import { email, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { useStore } from "../store"
import { useRoute, useRouter } from "vue-router"
import { Errors } from "@/utils/serverValidation"

export default function useEdit() {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const isLoading = ref(false)
  const errors = new Errors()

  const state = reactive({
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
    gender: "",
    birthDate: ""
  })

  const rules = {
    name: { required },
    email: { required, email },
    age: { required },
    phoneNumber: { required },
    gender: { required },
    birthDate: { required }
  }

  const submitted = ref(false)

  const v$ = useVuelidate(rules, state)

  onMounted(() => {
    fetchUser()
  })

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const fetchUser = async () => {
    isLoading.value = true
    errors.clear()

    await store.fetchOne({
      id: route.params.id
    })

    const response = store.getOneResponse
    if (response) {
      state.name = response.firstName
      state.email = response.email
      state.age = response.age
      state.phoneNumber = response.phone
      state.gender = response.gender
      state.birthDate = response.birthDate
    }

    isLoading.value = false
  }

  const handleSubmit = (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
      return
    }

    updateUser()
  }
  const updateUser = async () => {
    isLoading.value = true

    try {
      await store.update({
        id: route.params.id,
        name: state.name,
        email: state.email,
        age: state.age,
        phoneNumber: state.phoneNumber,
        gender: state.gender,
        birthDate: state.birthDate
      })

      const response = store.getUpdateResponse

      if (response) {
        router.push({ name: "userList" })
      }

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      if (error.status === 422) {
        const err = error.data.data
        errors.record(err)
      }
    }
  }

  return {
    isLoading,
    state,
    v$,
    handleSubmit,
    submitted,
    errors
  }
}
