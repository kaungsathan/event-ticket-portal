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

        <!-- Name -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="payment-method" :invalid="v$.name.$invalid && submitted" required />
          <InputText id="name" v-model="v$.name.$model" :invalid="v$.name.$invalid && submitted" disabled />
          <div>
            <ClientValidation field="name" :model="v$.name" :submitted="submitted" />
            <ServerValidation field="name" />
          </div>
        </div>
        <div class="flex flex-col"></div>
        <div class="flex flex-col"></div>

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
import { useEdit } from './useEdit'

const { isLoading, v$, statuses, handleSubmit, submitted } = useEdit()
</script>

<style lang="scss" scoped>
.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
