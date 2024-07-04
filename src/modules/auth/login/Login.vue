<template>
  <div class="grid h-screen w-full grid-cols-1 lg:grid-cols-5">
    <div class="hidden h-screen w-full bg-primary-100 lg:col-span-3 lg:inline-flex"></div>
    <div class="h-screen w-full lg:col-span-2">
      <div class="flex h-screen flex-col justify-center px-10 lg:px-16">
        <div class="text-2xl font-medium">Welcome</div>
        <div class="mt-2 font-light">Sign in to continue</div>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="mt-16">
          <div class="flex flex-col gap-2">
            <FieldLabel for-field="identifier" :invalid="v$.identifier.$invalid && submitted" />
            <InputText id="identifier" v-model="v$.identifier.$model" :invalid="v$.identifier.$invalid && submitted" type="text" placeholder="Username" />
            <div>
              <ClientValidation field="identifier" :model="v$.identifier" :submitted="submitted" />
              <ServerValidation field="identifier" />
            </div>
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <FieldLabel for-field="password" :invalid="v$.identifier.$invalid && submitted" />
            <Password id="password" v-model="v$.password.$model" size="large" placeholder="Password" input-class="w-full" :invalid="v$.password.$invalid && submitted" :feedback="false" toggleMask />
            <div>
              <ClientValidation field="password" :model="v$.password" :submitted="submitted" />
              <ServerValidation field="password" />
            </div>
          </div>
          <Button type="submit" label="Sign In" class="mt-6 w-full" />
        </form>
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" />
</template>

<script setup>
import { useLogin } from './useLogin'
import ClientValidation from '@/components/ClientValidation.vue'
import ServerValidation from '@/components/ServerValidation.vue'
import Loading from '@/components/Loading.vue'
import FieldLabel from '@/components/FieldLabel.vue'

const { v$, handleSubmit, submitted, isLoading } = useLogin()
</script>

<style scoped></style>
