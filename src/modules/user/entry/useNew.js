import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useRouter } from 'vue-router'
import { Errors } from '@/utils/serverValidation'

export default function useNew() {
    const store = useStore()
    const router = useRouter()
    const isLoading = ref(false)
    const errors = new Errors()
    const state = reactive({
        name: '',
        email: '',
        age: '',
        phoneNumber: '',
        gender: '',
        birthDate: ''
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

    onMounted(() => {})

    onBeforeUnmount(() => {
        store.$dispose()
    })

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) {
            return
        }

        addUser()
    }

    const addUser = async () => {
        errors.clear()
        isLoading.value = true

        try {
            await store.add({
                name: state.name,
                email: state.email,
                age: state.age,
                phoneNumber: state.phoneNumber,
                gender: state.gender,
                birthDate: state.birthDate
            })

            const response = store.addResponse

            if (response) {
                router.push({ name: 'userList' })
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
