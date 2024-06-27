<template>
  <div class="p-inputgroup nrc-group grid grid-cols-12 gap-1">
    <Select inputId="prefix" v-model="prefix" :options="optionsPrefix" class="nrc col-span-2" />

    <Select inputId="town" v-model="town" :options="optionsTown" optionLabel="name" optionValue="name" :filter="true" class="town col-span-4" />

    <Select inputId="type" v-model="type" :options="optionsType" class="type col-span-3" />

    <InputText
      v-model="number"
      placeholder="000000"
      class="col-span-3"
      :pt="{
        root: {
          class: 'border-0'
        }
      }"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

import nrcData from '@/assets/data/nrcData'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const prefix = ref('')
const town = ref('')
const type = ref('')
const number = ref('')
const optionsPrefix = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
const optionsTown = ref([])
const optionsType = ref(['N', 'P', 'E', 'C'])
const nrcNumber = ref('')

const nrcRegExp = new RegExp(/^([0-9]{1,2})\/([A-Z]{5,8})\(([N,P,E,C])\)([0-9]{6})$/)

onMounted(() => {
  getNRCData()
})

const getNRCData = () => {
  if (props.modelValue) {
    const result = props.modelValue.split(nrcRegExp).filter(Boolean) //to remove empty string from array
    if (result && result.length === 4) {
      prefix.value = parseInt(result[0])
      town.value = result[1]
      type.value = result[2]
      number.value = parseInt(result[3])
    }
  }
}

watch(prefix, () => {
  optionsTown.value = []
  for (const pre in nrcData) {
    if (pre == prefix.value) {
      optionsTown.value = nrcData[pre]
    }
  }
})

watch([prefix, town, type, number], () => {
  nrcNumber.value = `${prefix.value}/${town.value}(${type.value})${number.value}`
  emit('update:modelValue', nrcNumber.value)
})

watch(
  () => props.modelValue,
  () => {
    getNRCData()
  }
)
</script>
<style lang="scss" scope>
.nrc-group {
  border: 1px solid #ced4da;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
  border-radius: 6px;
}
.nrc-group:focus,
.nrc-group:hover {
  outline: 0 none;
  outline-offset: 0;
  border-color: rgb(var(--primary-700));
}
.town {
  border-width: 0px !important;
  .p-dropdown-trigger {
    width: auto !important;
  }
}

.type {
  border-width: 0px !important;
  .p-dropdown-trigger {
    width: auto !important;
  }
}
.nrc {
  border-width: 0px !important;
  .p-dropdown-trigger {
    width: auto !important;
  }
}
</style>
