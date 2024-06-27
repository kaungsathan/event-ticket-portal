<template>
  <div class="p-4 rounded-xl shadow">
    <div class="text-2xl font-bold block lg:hidden pb-4">{{ $route.meta.title }}</div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- User Profile -->
        <div class="flex items-center md:col-span-2 lg:col-span-3">
          <div class="flex items-center gap-2">
            <img :src="avatarPreview" class="w-[100px] h-[100px] block object-contain rounded-2xl" />
            <FileUpload mode="basic" :customUpload="true" name="avatar" accept="image/*" chooseLabel="Browse" @clear="onFileRemove" @select="onFileChange"></FileUpload>
          </div>
        </div>

        <!-- Username -->
        <div class="flex flex-col gap-1">
          <label for="username" class="text-sm" :class="{ 'text-red-500': v$.username.$invalid && submitted }">Username<span class="text-red-500">*</span></label>
          <InputText id="username" v-model="v$.username.$model" :invalid="v$.username.$invalid && submitted" readonly="true" />

          <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="text-red-500">{{ v$.username.required.$message.replace('Value', 'Username') }}</small>
          <!-- Server Validation -->
          <small v-if="errors.has('username')" class="text-red-500">
            <div v-for="error in errors.get('username')" :key="error">
              {{ error }}
            </div>
          </small>
          <!-- Server Validation -->
        </div>

        <!-- Full Name -->
        <div class="flex flex-col gap-1">
          <label for="full_name" class="text-sm" :class="{ 'text-red-500': v$.full_name.$invalid && submitted }">{{ $t('Full Name') }}<span class="text-red-500">*</span></label>
          <InputText id="full_name" v-model="v$.full_name.$model" :invalid="v$.full_name.$invalid && submitted" />

          <small v-if="(v$.full_name.$invalid && submitted) || v$.full_name.$pending.$response" class="text-red-500">{{ v$.full_name.required.$message.replace('Value', 'Full Name') }}</small>
          <!-- Server Validation -->
          <small v-if="errors.has('full_name')" class="text-red-500">
            <div v-for="error in errors.get('full_name')" :key="error">
              {{ error }}
            </div>
          </small>
          <!-- Server Validation -->
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm" :class="{ 'text-red-500': v$.password.$invalid && submitted }">{{ $t('Password') }}<span class="text-red-500">*</span></label>
          <Password id="password" input-class="w-full" v-model="v$.password.$model" autocomplete="new-password" placeholder="Password" :invalid="v$.password.$invalid && submitted" :feedback="false" toggleMask />

          <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="text-red-500">
            <span v-if="v$.password.required.$invalid">
              {{ v$.password.required.$message.replace('Value', 'User password') }}
            </span>
            <span v-if="v$.password.minLength.$invalid">
              {{ v$.password.minLength.$message.replace('Value', 'User password') }}
            </span>
          </small>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm" :class="{ 'text-red-500': v$.email.$invalid && submitted }">{{ $t('Email') }}</label>
          <InputText id="email" v-model="v$.email.$model" :invalid="v$.email.$invalid && submitted" aria-describedby="email-error" />

          <span v-if="v$.email.$error && submitted">
            <span v-for="(error, index) of v$.email.$errors" id="email-error" :key="index">
              <small class="text-red-500">{{ error.$message.replace('Value', 'Email') }}</small>
            </span>
          </span>
        </div>

        <!-- Mobile Number -->
        <div class="flex flex-col gap-1">
          <label for="mobile_number" class="text-sm" :class="{ 'text-red-500': v$.mobile_number.$invalid && submitted }">{{ $t('Mobile Number') }}</label>
          <InputText id="mobile_number" v-model="v$.mobile_number.$model" :invalid="v$.mobile_number.$invalid && submitted" />

          <span v-if="v$.mobile_number.$error && submitted">
            <span v-for="(error, index) of v$.mobile_number.$errors" id="mobile-error" :key="index">
              <small class="text-red-500">{{ error.$message.replace('Value', 'Mobile Number') }}</small>
            </span>
          </span>
          <!-- Server Validation -->
          <small v-if="errors.has('phone_number')" class="text-red-500">
            <div v-for="error in errors.get('phone_number')" :key="error">
              {{ error }}
            </div>
          </small>
          <!-- Server Validation -->
        </div>

        <!-- Role -->
        <div class="flex flex-col gap-1">
          <label for="role" class="text-sm" :class="{ 'text-red-500': v$.role_id.$invalid && submitted }">{{ $t('Role') }}<span class="text-red-500">*</span></label>
          <Select v-model="v$.role_id.$model" :options="roles" optionLabel="name" optionValue="code" placeholder="Select role" class="w-full" :invalid="v$.role_id.$invalid && submitted" showClear />
          <small v-if="(v$.role_id.$invalid && submitted) || v$.role_id.$pending.$response" class="text-red-500">
            {{ v$.role_id.required.$message.replace('Value', 'User role') }}
          </small>
        </div>

        <!-- Status -->
        <div class="flex flex-col gap-1">
          <label for="status" class="text-sm" :class="{ 'text-red-500': v$.status.$invalid && submitted }">{{ $t('Status') }}<span class="text-red-500">*</span></label>
          <div class="flex flex-wrap gap-3">
            <div v-for="status in statuses" :key="status.code" class="flex align-items-center">
              <RadioButton v-model="v$.status.$model" :inputId="status.code" name="status" :value="status.name" />
              <label :for="status.code" class="ml-2">{{ status.name }}</label>
            </div>
          </div>
          <small v-if="(v$.status.$invalid && submitted) || v$.status.$pending.$response" class="text-red-500">
            {{ v$.status.required.$message.replace('Value', 'User status') }}
          </small>
        </div>
      </div>

      <div class="flex justify-end gap-4 mt-4">
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
import { useNew } from './useNew'

const { isLoading, v$, statuses, roles, onFileChange, onFileRemove, avatarPreview, handleSubmit, submitted, errors } = useNew()
</script>

<style lang="scss" scoped>
.avatar {
  width: 128px;
  height: 128px;
  object-fit: cover;
}
</style>
