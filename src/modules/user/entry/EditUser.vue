<template>
  <div class="card">
    <h5 class="text-start">Edit User</h5>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
      <div class="grid">
        <div class="field col-12 md:col-6 lg:col-4">
          <label
            for="name"
            :class="{ 'p-error': v$.name.$invalid && submitted }"
            >Name*</label
          >
          <InputText
            id="name"
            v-model="v$.name.$model"
            :class="{ 'p-invalid': v$.name.$invalid && submitted }"
          />

          <small
            v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
            class="p-error"
            >{{ v$.name.required.$message.replace("Value", "Name") }}</small
          >
        </div>
        <div class="field col-12 md:col-6 lg:col-4">
          <label for="age" :class="{ 'p-error': v$.age.$invalid && submitted }"
            >Age*</label
          >
          <InputText
            id="age"
            v-model="v$.age.$model"
            :class="{ 'p-invalid': v$.age.$invalid && submitted }"
          />

          <small
            v-if="(v$.age.$invalid && submitted) || v$.age.$pending.$response"
            class="p-error"
            >{{ v$.age.required.$message.replace("Value", "Age") }}</small
          >
        </div>
        <div class="field col-12 md:col-6 lg:col-4">
          <label
            for="email"
            :class="{ 'p-error': v$.email.$invalid && submitted }"
            >Email*</label
          >
          <InputText
            id="email"
            v-model="v$.email.$model"
            :class="{ 'p-invalid': v$.email.$invalid && submitted }"
            aria-describedby="email-error"
          />

          <span v-if="v$.email.$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.email.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.email.$invalid && submitted) || v$.email.$pending.$response
            "
            class="p-error"
            >{{ v$.email.required.$message.replace("Value", "Email") }}</small
          >
        </div>
        <div class="field col-12 md:col-6 lg:col-4">
          <label
            for="phoneNumber"
            :class="{ 'p-error': v$.phoneNumber.$invalid && submitted }"
            >Phone Number*</label
          >
          <InputText
            id="phoneNumber"
            v-model="v$.phoneNumber.$model"
            :class="{ 'p-invalid': v$.phoneNumber.$invalid && submitted }"
          />

          <small
            v-if="
              (v$.phoneNumber.$invalid && submitted) ||
              v$.phoneNumber.$pending.$response
            "
            class="p-error"
            >{{
              v$.phoneNumber.required.$message.replace("Value", "PhoneNumber")
            }}</small
          >
        </div>

        <div class="field col-12 md:col-6 lg:col-4">
          <label
            for="gender"
            :class="{ 'p-error': v$.gender.$invalid && submitted }"
            >Gender*</label
          >
          <InputText
            id="gender"
            v-model="v$.gender.$model"
            :class="{ 'p-invalid': v$.gender.$invalid && submitted }"
          />

          <small
            v-if="
              (v$.gender.$invalid && submitted) || v$.gender.$pending.$response
            "
            class="p-error"
            >{{ v$.gender.required.$message.replace("Value", "Gender") }}</small
          >
        </div>

        <div class="field col-12 md:col-6 lg:col-4">
          <label
            for="birthDate"
            :class="{ 'p-error': v$.birthDate.$invalid && submitted }"
            >Birth of Date*</label
          >
          <InputText
            id="gender"
            v-model="v$.birthDate.$model"
            :class="{ 'p-invalid': v$.birthDate.$invalid && submitted }"
          />

          <small
            v-if="
              (v$.birthDate.$invalid && submitted) ||
              v$.birthDate.$pending.$response
            "
            class="p-error"
            >{{
              v$.birthDate.required.$message.replace("Value", "BirthDate")
            }}</small
          >
        </div>
      </div>
      <div class="flex justify-content-end">
        <div>
          <Button type="submit" label="Update" class="mt-2" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, onMounted, defineComponent } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "./../userStore";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "editUser",
  setup() {
    const store = useUserStore();
    // const router = useRouter();
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
  },
});
</script>

<style lang="scss" scoped>
</style>

<i18n src="./../locale.json">
</i18n>
