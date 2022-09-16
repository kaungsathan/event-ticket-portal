import { reactive, ref } from "vue";
import { useAuthStore } from "../authStore";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";

export default function useLogin() {
  const store = useAuthStore();
  const router = useRouter();

  const checked = ref(false);
  const submitted = ref(false);
  const isLoading = ref(false);

  const state = reactive({
    email: "",
    password: "",
  });

  const rules = {
    email: { required, email },
    password: { required },
  };

  const v$ = useVuelidate(rules, state);

  const handleSubmit = (isFormValid) => {
    submitted.value = true;

    if (!isFormValid) {
      return;
    }

    loginUser();
  };

  const loginUser = async () => {
    isLoading.value = true;

    await store.login({
      email: state.email.trim(),
      password: state.password.trim(),
      isRemember: checked.value,
    });

    const response = store.getLoginResponse;

    if (response) {
      isLoading.value = false;
      router.replace({ name: "dashboard" });
    } else {
      isLoading.value = false;
      //need to remove
      router.replace({ name: "dashboard" });
    }
  };

  return {
    checked,

    state,
    v$,
    handleSubmit,
    submitted,
    isLoading,
  };
}
