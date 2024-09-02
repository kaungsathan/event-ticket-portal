<template>
  <div class="phone-number grid grid-cols-2">
    <Select
      :options="optionsCountryPhoneCode"
      optionValue="code"
      optionLabel="name"
      :filter="true"
      placeholder="Select Country Code"
      class="w-full"
      v-model="countryCode"
      :pt="{
        root: {
          class: 'border-0 shadow-none'
        }
      }"
    >
      <template #value="slotProps">
        <div class="relative flex items-center" v-if="slotProps.value">
          <img :class="'flag flag-' + flag" class="mr-2" />
          <div>({{ slotProps.value }})</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="relative flex items-center">
          <img :class="'flag flag-' + slotProps.option.iso2" class="mr-2" />
          <div>{{ slotProps.option.name }} {{ slotProps.option.code }}</div>
        </div>
      </template>
    </Select>

    <InputPhone
      mask="9999999999"
      placeholder=""
      slotChar=""
      class="w-full"
      v-model="phoneNumber"
      :pt="{
        root: {
          class: 'border-0 shadow-none'
        }
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import optionsCountryCode from '@/assets/data/countryPhoneCode'

const phoneNumber = defineModel('phoneNumber')
const countryCode = defineModel('countryCode')

const optionsCountryPhoneCode = ref([])

onMounted(() => {
  optionsCountryPhoneCode.value = optionsCountryCode
})

const flag = computed(() => {
  const country = optionsCountryPhoneCode.value.find((country) => country.code === countryCode.value)
  if (country) {
    return country.iso2
  }
  return ''
})
</script>
<style lang="css" scoped>
.phone-number {
  cursor: pointer;
  position: relative;
  user-select: none;
  background: var(--p-select-background);
  border: 1px solid var(--p-select-border-color);
  transition:
    background var(--p-select-transition-duration),
    color var(--p-select-transition-duration),
    border-color var(--p-select-transition-duration),
    outline-color var(--p-select-transition-duration),
    box-shadow var(--p-select-transition-duration);
  border-radius: var(--p-select-border-radius);
  outline-color: transparent;
  box-shadow: var(--p-select-shadow);
  overflow: hidden;
}
</style>
