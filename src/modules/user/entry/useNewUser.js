import { reactive, ref, onMounted } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default function useNewUser() {
  const state = reactive({
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
    gender: "",
    birthDate: "",
  });

  const rules = {
    name: { required },
    email: { required, email },
    age: { required },
    phoneNumber: { required },
    gender: { required },
    birthDate: { required },
  };

  const submitted = ref(false);

  const v$ = useVuelidate(rules, state);

  onMounted(() => {});

  const handleSubmit = (isFormValid) => {
    submitted.value = true;

    if (!isFormValid) {
      return;
    }

    updateUser();
  };
  const updateUser = () => {
    resetForm();
  };

  const resetForm = () => {
    state.name = "";
    state.email = "";
    state.age = "";
    state.phoneNumber = "";
    state.gender = "";
    state.birthDate = "";
  };

  return {
    state,
    v$,
    handleSubmit,
    submitted,
  };
}
