<template>
  <div class="rounded-xl border border-surface-200 p-4">
    <div class="block pb-4 text-2xl font-bold lg:hidden">{{ $route.meta.title }}</div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Logo Upload -->
        <!-- <div class="flex items-center md:col-span-2 lg:col-span-3">
          <div class="flex items-center gap-2">
            <img :src="logoPreview" class="block h-[100px] w-[100px] rounded-2xl border object-contain" />
            <FileUpload mode="basic" :customUpload="true" name="logo" accept="image/*" chooseLabel="Browse Logo" @clear="onLogoRemove" @select="onLogoChange"></FileUpload>
          </div>
        </div> -->

        <!-- Company Name -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="company_name" :invalid="v$.company_name.$invalid && submitted" required />
          <InputText id="company_name" v-model="v$.company_name.$model" :invalid="v$.company_name.$invalid && submitted" />
          <div>
            <ClientValidation field="company_name" :model="v$.company_name" :submitted="submitted" />
            <ServerValidation field="company_name" />
          </div>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="email" :invalid="v$.email.$invalid && submitted" required />
          <InputText id="email" v-model="v$.email.$model" :invalid="v$.email.$invalid && submitted" />
          <div>
            <ClientValidation field="email" :model="v$.email" :submitted="submitted" />
            <ServerValidation field="email" />
          </div>
        </div>

        <!-- Company Phone -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="company_phone" :invalid="v$.company_phone.$invalid && submitted" required />
          <InputText id="company_phone" v-model="v$.company_phone.$model" :invalid="v$.company_phone.$invalid && submitted" />
          <div>
            <ClientValidation field="company_phone" :model="v$.company_phone" :submitted="submitted" />
            <ServerValidation field="company_phone" />
          </div>
        </div>

        <!-- Website -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="website" :invalid="v$.website.$invalid && submitted" />
          <InputText id="website" v-model="v$.website.$model" :invalid="v$.website.$invalid && submitted" placeholder="https://example.com" />
          <div>
            <ClientValidation field="website" :model="v$.website" :submitted="submitted" />
            <ServerValidation field="website" />
          </div>
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-1 md:col-span-2">
          <FieldLabel for-field="description" :invalid="v$.description.$invalid && submitted" />
          <Textarea id="description" v-model="v$.description.$model" :invalid="v$.description.$invalid && submitted" rows="3" />
          <div>
            <ClientValidation field="description" :model="v$.description" :submitted="submitted" />
            <ServerValidation field="description" />
          </div>
        </div>

        <!-- Address -->
        <div class="flex flex-col gap-1 md:col-span-2 lg:col-span-3">
          <FieldLabel for-field="address" :invalid="v$.address.$invalid && submitted" />
          <Textarea id="address" v-model="v$.address.$model" :invalid="v$.address.$invalid && submitted" rows="2" />
          <div>
            <ClientValidation field="address" :model="v$.address" :submitted="submitted" />
            <ServerValidation field="address" />
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
        <router-link v-if="$can('index', 'Organizer')" :to="{ name: 'organizerList' }">
          <Button label="Cancel" severity="secondary" text />
        </router-link>
        <Button type="submit" label="Save" />
      </div>
    </form>
    <Loading v-if="isLoading" />
  </div>
</template>

<script setup>
import { useNew } from './useNew'

// const { isLoading, v$, statuses, handleSubmit, submitted, logoPreview, onLogoChange, onLogoRemove } = useNew()
const { isLoading, v$, statuses, handleSubmit, submitted } = useNew()
</script>

<style lang="scss" scoped>
.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
