<template>
  <div class="card">
    <h5 class="text-start">User</h5>
    <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
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
              v-for="(error, index) of v$.email.$errors"
              id="email-error"
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
      <div class="flex justify-content-start">
        <div>
          <Button type="submit" label="Save" class="mt-2" />
        </div>
        <router-link v-if="$can('read', 'user')" :to="{ name: 'userList' }">
          <div>
            <Button label="Cancel" class="ml-2 mt-2 p-button-outlined" />
          </div>
        </router-link>
      </div>
    </form>
    <BlockUI :blocked="isLoading" :full-screen="true" />
  </div>
</template>

<script>
import BlockUI from "primevue/blockui"
import Button from "primevue/button"
import InputText from "primevue/inputtext"

import { defineComponent } from "vue"
import useNew from "./useNew"

export default defineComponent({
  name: "NewUser",
  components: { BlockUI, Button, InputText },
  setup() {
    const { isLoading, state, v$, handleSubmit, submitted } = useNew()

    return {
      isLoading,
      state,
      v$,
      handleSubmit,
      submitted
    }
  }
})
</script>

<i18n src="./../locale.json">
</i18n>

<style lang="scss" scoped></style>
