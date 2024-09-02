<template>
  <Select :options="optionsCountryPhoneCode" optionValue="code" optionLabel="name" :filter="true" placeholder="Select Country Code" class="w-full" v-model="model">
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import optionsCountryCode from '@/assets/data/countryPhoneCode'

const model = defineModel()

const optionsCountryPhoneCode = ref([])

onMounted(() => {
  optionsCountryPhoneCode.value = optionsCountryCode
})

const flag = computed(() => {
  const country = optionsCountryPhoneCode.value.find((country) => country.code === model.value)
  if (country) {
    return country.iso2
  }
  return ''
})
</script>
<style lang="scss" scoped></style>
