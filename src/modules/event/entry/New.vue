<template>
  <div class="rounded-xl border border-surface-200 p-4">
    <div class="block pb-4 text-2xl font-bold lg:hidden">{{ $route.meta.title }}</div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Title -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="title" :invalid="v$.title.$invalid && submitted" required />
          <InputText id="title" v-model="v$.title.$model" :invalid="v$.title.$invalid && submitted" />
          <div>
            <ClientValidation field="title" :model="v$.title" :submitted="submitted" />
            <ServerValidation field="title" />
          </div>
        </div>

        <!-- Type -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="type" :invalid="v$.type.$invalid && submitted" required />
          <Select v-model="v$.type.$model" :options="eventTypes" optionLabel="name" optionValue="code" placeholder="Select type" class="w-full" :invalid="v$.type.$invalid && submitted" showClear />
          <div>
            <ClientValidation field="type" :model="v$.type" :submitted="submitted" />
            <ServerValidation field="type" />
          </div>
        </div>

        <!-- Category -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="category" :invalid="v$.category.$invalid && submitted" required />
          <Select v-model="v$.category.$model" :options="categories" optionLabel="name" optionValue="code" placeholder="Select category" class="w-full" :invalid="v$.category.$invalid && submitted" showClear />
          <div>
            <ClientValidation field="category" :model="v$.category" :submitted="submitted" />
            <ServerValidation field="category" />
          </div>
        </div>

        <!-- Organizer -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="organizer_id" :invalid="v$.organizer_id.$invalid && submitted" required />
          <Select v-model="v$.organizer_id.$model" :options="organizers" optionLabel="name" optionValue="id" placeholder="Select organizer" class="w-full" :invalid="v$.organizer_id.$invalid && submitted" showClear />
          <div>
            <ClientValidation field="organizer_id" :model="v$.organizer_id" :submitted="submitted" />
            <ServerValidation field="organizer_id" />
          </div>
        </div>

        <!-- Start Date -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="start_date" :invalid="v$.start_date.$invalid && submitted" required />
          <DatePicker id="start_date" v-model="v$.start_date.$model" :invalid="v$.start_date.$invalid && submitted" dateFormat="yy-mm-dd" showTime hourFormat="24" class="w-full" />
          <div>
            <ClientValidation field="start_date" :model="v$.start_date" :submitted="submitted" />
            <ServerValidation field="start_date" />
          </div>
        </div>

        <!-- End Date -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="end_date" :invalid="v$.end_date.$invalid && submitted" required />
          <DatePicker id="end_date" v-model="v$.end_date.$model" :invalid="v$.end_date.$invalid && submitted" dateFormat="yy-mm-dd" showTime hourFormat="24" class="w-full" />
          <div>
            <ClientValidation field="end_date" :model="v$.end_date" :submitted="submitted" />
            <ServerValidation field="end_date" />
          </div>
        </div>

        <!-- Location -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="location" :invalid="v$.location.$invalid && submitted" required />
          <InputText id="location" v-model="v$.location.$model" :invalid="v$.location.$invalid && submitted" />
          <div>
            <ClientValidation field="location" :model="v$.location" :submitted="submitted" />
            <ServerValidation field="location" />
          </div>
        </div>

        <!-- Price -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="price" :invalid="v$.price.$invalid && submitted" required />
          <InputNumber id="price" v-model="v$.price.$model" :invalid="v$.price.$invalid && submitted" mode="currency" currency="USD" locale="en-US" class="w-full" />
          <div>
            <ClientValidation field="price" :model="v$.price" :submitted="submitted" />
            <ServerValidation field="price" />
          </div>
        </div>

        <!-- Max Attendees -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="max_attendees" :invalid="v$.max_attendees.$invalid && submitted" required />
          <InputNumber id="max_attendees" v-model="v$.max_attendees.$model" :invalid="v$.max_attendees.$invalid && submitted" class="w-full" />
          <div>
            <ClientValidation field="max_attendees" :model="v$.max_attendees" :submitted="submitted" />
            <ServerValidation field="max_attendees" />
          </div>
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-1 md:col-span-2 lg:col-span-3">
          <FieldLabel for-field="description" :invalid="v$.description.$invalid && submitted" />
          <Textarea id="description" v-model="v$.description.$model" :invalid="v$.description.$invalid && submitted" rows="4" />
          <div>
            <ClientValidation field="description" :model="v$.description" :submitted="submitted" />
            <ServerValidation field="description" />
          </div>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-4">
        <router-link v-if="$can('index', 'Event')" :to="{ name: 'eventList' }">
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

const { isLoading, v$, eventTypes, categories, organizers, handleSubmit, submitted } = useNew()
</script>

<style lang="scss" scoped></style>
