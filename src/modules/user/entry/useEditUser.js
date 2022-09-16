import { reactive, ref, onMounted } from "vue"
import { email, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { useUserStore } from "../userStore"
import { useRoute, useRouter } from "vue-router"

export default function useEditUser() {
  const store = useUserStore()
  const route = useRoute()
  const router = useRouter()

  const isLoading = ref(false)

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

  const fetchUser = async () => {
    isLoading.value = true

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
  }

  return {
    isLoading,
    state,
    v$,
    handleSubmit,
    submitted
  }
}
