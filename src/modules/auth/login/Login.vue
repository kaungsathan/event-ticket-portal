<template>
  <div class="w-full grid grid-cols-1 lg:grid-cols-5 h-screen">
    <div class="hidden lg:inline-flex lg:col-span-3 bg-primary-100 h-screen w-full"></div>
    <div class="lg:col-span-2 h-screen w-full">
      <div class="px-10 lg:px-16 flex flex-col justify-center h-screen">
        <div class="text-2xl font-medium">Welcome</div>
        <div class="font-light mt-2">Sign in to continue</div>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="mt-16">
          <div class="flex flex-col gap-2">
            <label for="username" class="text-sm" :class="{ 'text-red-500': v$.username.$invalid && submitted }">Username</label>
            <InputText id="username" v-model="v$.username.$model" :invalid="v$.username.$invalid && submitted" type="text" placeholder="Username" />

            <span v-if="v$.username.$error && submitted">
              <span v-for="(error, index) of v$.username.$errors" id="email-error" :key="index">
                <small class="text-red-500">{{ error.$message }}</small>
              </span>
            </span>
            <small v-else-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="text-red-500">{{ v$.username.required.$message.replace('Value', 'Identifier') }}</small>
          </div>
          <div class="flex flex-col gap-2 mt-3">
            <label for="password" class="text-sm" :class="{ 'text-red-500': v$.password.$invalid && submitted }">Password</label>
            <Password id="password" v-model="v$.password.$model" size="large" placeholder="Password" input-class="w-full" :invalid="v$.password.$invalid && submitted" :feedback="false" toggleMask />
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="text-red-500">{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
          </div>
          <Button type="submit" label="Sign In" class="w-full mt-6" />
        </form>
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" />
</template>

<script setup>
import { useLogin } from './useLogin'

const { v$, handleSubmit, submitted, isLoading } = useLogin()
</script>

<style scoped></style>
