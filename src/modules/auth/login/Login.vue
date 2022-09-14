<template>
  <div
    class="
      surface-0
      flex
      align-items-center
      justify-content-center
      min-h-screen min-w-screen
      overflow-hidden
    "
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="text-center mb-5">
            <img
              src="layout/images/avatar.png"
              alt="Image"
              height="50"
              class="mb-3"
            />
            <div class="text-900 text-3xl font-medium mb-3">
              Welcome, Isabel!
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <form @submit.prevent="handleSubmit(!v$.$invalid)">
            <div class="w-full md:w-10 mx-auto">
              <label
                for="email"
                class="block text-900 text-xl font-medium mb-2"
                :class="{ 'p-error': v$.email.$invalid && submitted }"
                >Email</label
              >
              <InputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                type="text"
                class="w-full"
                placeholder="Email"
                style="padding: 1rem"
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
                  (v$.email.$invalid && submitted) ||
                  v$.email.$pending.$response
                "
                class="p-error"
                >{{
                  v$.email.required.$message.replace("Value", "Email")
                }}</small
              >

              <label
                for="password"
                class="block text-900 font-medium text-xl mb-2 mt-3"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password</label
              >
              <Password
                id="password"
                placeholder="Password"
                class="w-full"
                inputClass="w-full"
                inputStyle="padding:1rem"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                :feedback="false"
              ></Password>

              <small
                v-if="
                  (v$.password.$invalid && submitted) ||
                  v$.password.$pending.$response
                "
                class="p-error"
                >{{
                  v$.password.required.$message.replace("Value", "Password")
                }}</small
              >

              <div
                class="
                  flex
                  align-items-center
                  justify-content-between
                  mb-5
                  mt-3
                "
              >
                <div class="flex align-items-center">
                  <Checkbox
                    id="rememberme1"
                    v-model="checked"
                    :binary="true"
                    class="mr-2"
                  ></Checkbox>
                  <label for="rememberme1">Remember me</label>
                </div>
                <a
                  class="
                    font-medium
                    no-underline
                    ml-2
                    text-right
                    cursor-pointer
                  "
                  style="color: var(--primary-color)"
                  >Forgot password?</a
                >
              </div>
              <Button
                type="submit"
                label="Sign In"
                class="w-full p-3 text-xl"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <BlockUI :blocked="isLoading" :fullScreen="true"> </BlockUI>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import useLogin from "./useLogin";

export default defineComponent({
  name: "login",
  setup() {
    const {
      checked,
      state,
      v$,
      handleSubmit,
      submitted,
      isLoading,
    } = useLogin();

    return {
      checked,

      state,
      v$,
      handleSubmit,
      submitted,
      isLoading,
    };
  },
});
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>