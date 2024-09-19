<template>
  <div class="rounded-xl border border-surface-200 p-4">
    <div class="block pb-4 text-2xl font-bold lg:hidden">{{ $route.meta.title }}</div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- User Profile -->
        <div class="flex items-center md:col-span-2 lg:col-span-3">
          <div class="flex items-center gap-2">
            <img :src="avatarPreview" class="block h-[100px] w-[100px] rounded-2xl object-contain" />
            <FileUpload mode="basic" :customUpload="true" name="avatar" accept="image/*" chooseLabel="Browse" @clear="onFileRemove" @select="onFileChange"></FileUpload>
          </div>
        </div>

        <!-- Username -->
        <div class="flex flex-col gap-1">
          <label for="username" class="text-sm" :class="{ 'text-red-500': v$.username.$invalid && submitted }">Username<span class="text-red-500">*</span></label>
          <InputText id="username" v-model="v$.username.$model" :invalid="v$.username.$invalid && submitted" readonly="true" />

          <div>
            <ClientValidation field="username" :model="v$.username" :submitted="submitted" />
            <ServerValidation field="username" />
          </div>
        </div>

        <!-- Full Name -->
        <div class="flex flex-col gap-1">
          <label for="full_name" class="text-sm" :class="{ 'text-red-500': v$.full_name.$invalid && submitted }">{{ $t('Full Name') }}<span class="text-red-500">*</span></label>
          <InputText id="full_name" v-model="v$.full_name.$model" :invalid="v$.full_name.$invalid && submitted" />

          <div>
            <ClientValidation field="full_name" :model="v$.full_name" :submitted="submitted" />
            <ServerValidation field="full_name" />
          </div>
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm" :class="{ 'text-red-500': v$.password.$invalid && submitted }">{{ $t('Password') }}<span class="text-red-500">*</span></label>
          <Password id="password" input-class="w-full" v-model="v$.password.$model" autocomplete="new-password" placeholder="Password" :invalid="v$.password.$invalid && submitted" :feedback="false" toggleMask />

          <div>
            <ClientValidation field="password" :model="v$.password" :submitted="submitted" />
            <ServerValidation field="password" />
          </div>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm" :class="{ 'text-red-500': v$.email.$invalid && submitted }">{{ $t('Email') }}</label>
          <InputText id="email" v-model="v$.email.$model" :invalid="v$.email.$invalid && submitted" aria-describedby="email-error" />

          <div>
            <ClientValidation field="email" :model="v$.email" :submitted="submitted" />
            <ServerValidation field="email" />
          </div>
        </div>

        <!-- Mobile Number -->
        <div class="flex flex-col gap-1">
          <label for="mobile_number" class="text-sm" :class="{ 'text-red-500': v$.mobile_number.$invalid && submitted }">{{ $t('Mobile Number') }}</label>
          <InputText id="mobile_number" v-model="v$.mobile_number.$model" :invalid="v$.mobile_number.$invalid && submitted" />

          <div>
            <ClientValidation field="mobile_number" :model="v$.mobile_number" :submitted="submitted" />
            <ServerValidation field="mobile_number" />
          </div>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-4">
        <router-link :to="{ name: 'dashboard' }">
          <Button label="Cancel" severity="secondary" text />
        </router-link>
        <Button type="submit" label="Save" />
      </div>
    </form>
    <Loading v-if="isLoading" />
  </div>
</template>

<script setup>
import { useProfile } from './useProfile'

const { isLoading, v$, onFileChange, onFileRemove, avatarPreview, handleSubmit, submitted } = useProfile()
</script>

<style lang="scss" scoped>
.avatar {
  width: 128px;
  height: 128px;
  object-fit: cover;
}
</style>
