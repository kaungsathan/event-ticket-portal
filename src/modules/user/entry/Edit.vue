<template>
  <div class="rounded-xl border border-surface-200 p-4">
    <div class="block pb-4 text-2xl font-bold lg:hidden">{{ $route.meta.title }}</div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- User Profile -->
        <!-- <div class="flex items-center md:col-span-2 lg:col-span-3">
          <div class="flex items-center gap-2">
            <img :src="avatarPreview" class="block h-[100px] w-[100px] rounded-2xl object-contain" />
            <FileUpload mode="basic" :customUpload="true" name="avatar" accept="image/*" chooseLabel="Browse" @clear="onFileRemove" @select="onFileChange"></FileUpload>
          </div>
        </div> -->

        <!-- Username -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="username" :invalid="v$.username.$invalid && submitted" required />
          <InputText id="username" v-model="v$.username.$model" :invalid="v$.username.$invalid && submitted" />
          <div>
            <ClientValidation field="username" :model="v$.username" :submitted="submitted" />
            <ServerValidation field="username" />
          </div>
        </div>

        <!-- Full Name -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="full_name" :invalid="v$.full_name.$invalid && submitted" required />
          <InputText id="full_name" v-model="v$.full_name.$model" :invalid="v$.full_name.$invalid && submitted" />
          <div>
            <ClientValidation field="full_name" :model="v$.full_name" :submitted="submitted" />
            <ServerValidation field="full_name" />
          </div>
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="password" :invalid="v$.password.$invalid && submitted" required />
          <Password id="password" input-class="w-full" v-model="v$.password.$model" autocomplete="new-password" placeholder="Password" :invalid="v$.password.$invalid && submitted" :feedback="false" toggleMask />

          <div>
            <ClientValidation field="password" :model="v$.password" :submitted="submitted" />
            <ServerValidation field="password" />
          </div>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="email" :invalid="v$.email.$invalid && submitted" />
          <InputText id="email" v-model="v$.email.$model" :invalid="v$.email.$invalid && submitted" aria-describedby="email-error" />

          <div>
            <ClientValidation field="email" :model="v$.email" :submitted="submitted" />
            <ServerValidation field="email" />
          </div>
        </div>

        <!-- Mobile Number -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="mobile_number" :invalid="v$.phone.$invalid && submitted" />
          <InputText id="phone" v-model="v$.phone.$model" :invalid="v$.phone.$invalid && submitted" />

          <div>
            <ClientValidation field="phone" :model="v$.phone" :submitted="submitted" />
            <ServerValidation field="phone" />
          </div>
        </div>

        <!-- Role -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="role" :invalid="v$.role.$invalid && submitted" required />
          <Select v-model="v$.role.$model" :options="roles" optionLabel="name" optionValue="name" placeholder="Select role" class="w-full" :invalid="v$.role.$invalid && submitted" showClear />
          <div>
            <ClientValidation field="role" :model="v$.role" :submitted="submitted" />
            <ServerValidation field="role" />
          </div>
        </div>

        <!-- Status -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="status" :invalid="v$.status.$invalid && submitted" required />
          <div class="flex flex-wrap gap-3">
            <div v-for="status in statuses" :key="status.code" class="align-items-center flex">
              <RadioButton v-model="v$.status.$model" :inputId="status.code" name="status" :value="status.code" />
              <label :for="status.code" class="ml-2">{{ status.name }}</label>
            </div>
          </div>

          <div>
            <ClientValidation field="status" :model="v$.status" :submitted="submitted" />
            <ServerValidation field="status" />
          </div>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-4">
        <router-link v-if="$can('index', 'User')" :to="{ name: 'userList' }">
          <Button label="Cancel" severity="secondary" text />
        </router-link>
        <Button type="submit" label="Save" />
      </div>
    </form>
    <Loading v-if="isLoading" />
  </div>
</template>

<script setup>
import { useEdit } from './useEdit'

const { isLoading, v$, statuses, roles, handleSubmit, submitted } = useEdit()
</script>

<style lang="scss" scoped></style>
