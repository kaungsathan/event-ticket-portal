<template>
    <div class="card">
        <h5 class="text-start">User</h5>
        <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
            <div class="grid">
                <div class="field col-12 md:col-6 lg:col-4">
                    <label for="name" :class="{ 'p-error': v$.name.$invalid && submitted }">Name*</label>
                    <InputText id="name" v-model="v$.name.$model" :class="{ 'p-invalid': v$.name.$invalid && submitted }" />

                    <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace('Value', 'Name') }}</small>
                    <!-- Server Validation -->
                    <small v-if="errors.has('name')" class="p-error">
                        <div v-for="error in errors.get('name')" :key="error">
                            {{ error }}
                        </div>
                    </small>
                    <!-- Server Validation -->
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label for="age" :class="{ 'p-error': v$.age.$invalid && submitted }">Age*</label>
                    <InputText id="age" v-model="v$.age.$model" :class="{ 'p-invalid': v$.age.$invalid && submitted }" />

                    <small v-if="(v$.age.$invalid && submitted) || v$.age.$pending.$response" class="p-error">{{ v$.age.required.$message.replace('Value', 'Age') }}</small>
                    <!-- Server Validation -->
                    <small v-if="errors.has('age')" class="p-error">
                        <div v-for="error in errors.get('age')" :key="error">
                            {{ error }}
                        </div>
                    </small>
                    <!-- Server Validation -->
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label for="email" :class="{ 'p-error': v$.email.$invalid && submitted }">Email*</label>
                    <InputText id="email" v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }" aria-describedby="email-error" />

                    <span v-if="v$.email.$error && submitted">
                        <span v-for="(error, index) of v$.email.$errors" id="email-error" :key="index">
                            <small class="p-error">{{ error.$message }}</small>
                        </span>
                    </span>
                    <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
                    <!-- Server Validation -->
                    <small v-if="errors.has('email')" class="p-error">
                        <div v-for="error in errors.get('email')" :key="error">
                            {{ error }}
                        </div>
                    </small>
                    <!-- Server Validation -->
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label for="phoneNumber" :class="{ 'p-error': v$.phoneNumber.$invalid && submitted }">Phone Number*</label>
                    <InputText id="phoneNumber" v-model="v$.phoneNumber.$model" :class="{ 'p-invalid': v$.phoneNumber.$invalid && submitted }" />

                    <small v-if="(v$.phoneNumber.$invalid && submitted) || v$.phoneNumber.$pending.$response" class="p-error">{{ v$.phoneNumber.required.$message.replace('Value', 'PhoneNumber') }}</small>
                    <!-- Server Validation -->
                    <small v-if="errors.has('phone_number')" class="p-error">
                        <div v-for="error in errors.get('phone_number')" :key="error">
                            {{ error }}
                        </div>
                    </small>
                    <!-- Server Validation -->
                </div>

                <div class="field col-12 md:col-6 lg:col-4">
                    <label for="gender" :class="{ 'p-error': v$.gender.$invalid && submitted }">Gender*</label>
                    <InputText id="gender" v-model="v$.gender.$model" :class="{ 'p-invalid': v$.gender.$invalid && submitted }" />

                    <small v-if="(v$.gender.$invalid && submitted) || v$.gender.$pending.$response" class="p-error">{{ v$.gender.required.$message.replace('Value', 'Gender') }}</small>
                    <!-- Server Validation -->
                    <small v-if="errors.has('gender')" class="p-error">
                        <div v-for="error in errors.get('gender')" :key="error">
                            {{ error }}
                        </div>
                    </small>
                    <!-- Server Validation -->
                </div>

                <div class="field col-12 md:col-6 lg:col-4">
                    <label for="birthDate" :class="{ 'p-error': v$.birthDate.$invalid && submitted }">Birth of Date*</label>
                    <InputText id="gender" v-model="v$.birthDate.$model" :class="{ 'p-invalid': v$.birthDate.$invalid && submitted }" />

                    <small v-if="(v$.birthDate.$invalid && submitted) || v$.birthDate.$pending.$response" class="p-error">{{ v$.birthDate.required.$message.replace('Value', 'BirthDate') }}</small>
                    <!-- Server Validation -->
                    <small v-if="errors.has('birth_date')" class="p-error">
                        <div v-for="error in errors.get('birth_date')" :key="error">
                            {{ error }}
                        </div>
                    </small>
                    <!-- Server Validation -->
                </div>
            </div>
            <div class="flex justify-content-end">
                <router-link v-if="$can('read', 'users')" :to="{ name: 'userList' }">
                    <div>
                        <Button label="Cancel" class="mt-2 p-button-secondary p-button-text" />
                    </div>
                </router-link>
                <div class="ml-2">
                    <Button type="submit" label="Save" class="mt-2 p-button-success" />
                </div>
            </div>
        </form>
        <Loading v-if="isLoading" />
    </div>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Loading from '@/components/Loading.vue'

import { useNew } from './useNew'

const { isLoading, v$, handleSubmit, submitted, errors } = useNew()
</script>

<style lang="scss" scoped></style>
