import { reactive, ref, onMounted } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "./../userStore";
import { useRoute } from "vue-router";

export default function useEditUser() {
  const store = useUserStore();
  const route = useRoute();

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

  onMounted(() => {
    fetchUser();
  });

  const fetchUser = async () => {
    await store.fetchOne({
      id: route.params.id,
    });

    const response = store.getOneResponse;
    if (response) {
      state.name = response.firstName;
      state.email = response.email;
      state.age = response.age;
      state.phoneNumber = response.phone;
      state.gender = response.gender;
      state.birthDate = response.birthDate;
    }
  };

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
