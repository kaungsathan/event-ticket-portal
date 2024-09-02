<template>
  <div class="nrc grid grid-cols-12">
    <Select
      inputId="prefix"
      v-model="prefix"
      @change="onSelectedPrefix"
      :options="optionsPrefix"
      class="col-span-2"
      :pt="{
        root: {
          class: 'border-0 shadow-none'
        },
        dropdown: {
          class: 'w-auto'
        }
      }"
    />

    <Select
      inputId="town"
      v-model="town"
      :options="optionsTown"
      optionLabel="name"
      optionValue="name"
      :filter="true"
      class="col-span-4"
      :pt="{
        root: {
          class: 'border-0 shadow-none'
        },
        dropdown: {
          class: 'w-auto'
        }
      }"
    />

    <Select
      inputId="type"
      v-model="type"
      :options="optionsType"
      class="col-span-3"
      :pt="{
        root: {
          class: 'border-0 shadow-none'
        },
        dropdown: {
          class: 'w-auto'
        }
      }"
    />

    <InputText
      v-model="number"
      placeholder="000000"
      class="col-span-3"
      :pt="{
        root: {
          class: 'border-0 shadow-none outline-none'
        }
      }"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

import nrcData from '@/assets/data/nrcData'

const model = defineModel()

const prefix = ref('')
const town = ref('')
const type = ref('')
const number = ref('')
const optionsPrefix = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
const optionsTown = ref([])
const optionsType = ref(['N', 'P', 'E', 'C'])

const nrcRegExp = new RegExp(/^([0-9]{1,2})\/([A-Z]{5,8})\(([N,P,E,C])\)([0-9]{6})$/)

onMounted(() => {
  getNRCData()
})

const getNRCData = () => {
  if (model.value) {
    const result = model.value.split(nrcRegExp).filter(Boolean) //to remove empty string from array
    if (result && result.length === 4) {
      prefix.value = parseInt(result[0])
      town.value = result[1]
      type.value = result[2]
      number.value = parseInt(result[3])
    }
  }
}

const onSelectedPrefix = (event) => {
  if (event.value) {
    optionsTown.value = nrcData[event.value] || []
    town.value = ''
  }
}

watch([prefix, town, type, number], () => {
  if (prefix.value) {
    optionsTown.value = nrcData[prefix.value] || []
  }
  model.value = `${prefix.value}/${town.value}(${type.value})${number.value}`
})

watch(
  () => model.value,
  () => {
    getNRCData()
  }
)
</script>
<style lang="css" scoped>
.nrc {
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
