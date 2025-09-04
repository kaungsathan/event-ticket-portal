<template>
  <div class="rounded-xl border border-surface-200 p-4">
    <div class="block pb-4 text-2xl font-bold lg:hidden">{{ $route.meta.title }}</div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Event -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="event_id" :invalid="v$.event_id.$invalid && submitted" required />
          <Select v-model="v$.event_id.$model" :options="events" optionLabel="name" optionValue="id" placeholder="Select event" class="w-full" :invalid="v$.event_id.$invalid && submitted" showClear />
          <div>
            <ClientValidation field="event_id" :model="v$.event_id" :submitted="submitted" />
            <ServerValidation field="event_id" />
          </div>
        </div>

        <!-- Customer Name -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="customer_name" :invalid="v$.customer_name.$invalid && submitted" required />
          <InputText id="customer_name" v-model="v$.customer_name.$model" :invalid="v$.customer_name.$invalid && submitted" />
          <div>
            <ClientValidation field="customer_name" :model="v$.customer_name" :submitted="submitted" />
            <ServerValidation field="customer_name" />
          </div>
        </div>

        <!-- Customer Email -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="customer_email" :invalid="v$.customer_email.$invalid && submitted" required />
          <InputText id="customer_email" v-model="v$.customer_email.$model" :invalid="v$.customer_email.$invalid && submitted" type="email" />
          <div>
            <ClientValidation field="customer_email" :model="v$.customer_email" :submitted="submitted" />
            <ServerValidation field="customer_email" />
          </div>
        </div>

        <!-- Customer Phone -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="customer_phone" :invalid="v$.customer_phone.$invalid && submitted" required />
          <InputText id="customer_phone" v-model="v$.customer_phone.$model" :invalid="v$.customer_phone.$invalid && submitted" />
          <div>
            <ClientValidation field="customer_phone" :model="v$.customer_phone" :submitted="submitted" />
            <ServerValidation field="customer_phone" />
          </div>
        </div>

        <!-- Customer Address -->
        <div class="flex flex-col gap-1 md:col-span-2">
          <FieldLabel for-field="customer_address" :invalid="v$.customer_address.$invalid && submitted" required />
          <Textarea id="customer_address" v-model="v$.customer_address.$model" :invalid="v$.customer_address.$invalid && submitted" rows="2" />
          <div>
            <ClientValidation field="customer_address" :model="v$.customer_address" :submitted="submitted" />
            <ServerValidation field="customer_address" />
          </div>
        </div>

        <!-- Quantity -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="quantity" :invalid="v$.quantity.$invalid && submitted" required />
          <InputNumber id="quantity" v-model="v$.quantity.$model" :invalid="v$.quantity.$invalid && submitted" :min="1" class="w-full" />
          <div>
            <ClientValidation field="quantity" :model="v$.quantity" :submitted="submitted" />
            <ServerValidation field="quantity" />
          </div>
        </div>

        <!-- Total Amount -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="total_amount" :invalid="v$.total_amount.$invalid && submitted" required />
          <InputNumber id="total_amount" v-model="v$.total_amount.$model" :invalid="v$.total_amount.$invalid && submitted" mode="currency" currency="USD" :min="0" class="w-full" />
          <div>
            <ClientValidation field="total_amount" :model="v$.total_amount" :submitted="submitted" />
            <ServerValidation field="total_amount" />
          </div>
        </div>

        <!-- Payment Method -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="payment_method" :invalid="v$.payment_method.$invalid && submitted" required />
          <Select v-model="v$.payment_method.$model" :options="paymentMethods" optionLabel="name" optionValue="id" placeholder="Select payment method" class="w-full" :invalid="v$.payment_method.$invalid && submitted" showClear />
          <div>
            <ClientValidation field="payment_method" :model="v$.payment_method" :submitted="submitted" />
            <ServerValidation field="payment_method" />
          </div>
        </div>

        <!-- Payment Status -->
        <div class="flex flex-col gap-1">
          <FieldLabel for-field="payment_status" :invalid="v$.payment_status.$invalid && submitted" required />
          <div class="flex flex-wrap gap-3">
            <div v-for="paymentStatus in paymentStatuses" :key="paymentStatus.code" class="align-items-center flex">
              <RadioButton v-model="v$.payment_status.$model" :inputId="paymentStatus.code" name="payment_status" :value="paymentStatus.code" />
              <label :for="paymentStatus.code" class="ml-2">{{ paymentStatus.name }}</label>
            </div>
          </div>
          <div>
            <ClientValidation field="payment_status" :model="v$.payment_status" :submitted="submitted" />
            <ServerValidation field="payment_status" />
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
        <router-link v-if="$can('index', 'Order')" :to="{ name: 'orderList' }">
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

const { isLoading, v$, statuses, paymentStatuses, events, paymentMethods, handleSubmit, submitted } = useNew()
</script>

<style lang="scss" scoped>
.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
