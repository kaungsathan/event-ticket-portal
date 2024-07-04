<template>
  <label for="{{forField}}" class="text-sm" :class="{ 'text-red-500': invalid }"
    >{{ $t(capitalizeFirstLetter(forField)) }}
    <span v-if="required" class="text-red-500">*</span>
  </label>
</template>

<script setup>
import { capitalizeFirstLetter } from '../utils/formatter.js'

defineProps({
  forField: {
    type: String,
    required: true
  },
  invalid: {
    type: Boolean,
    required: false
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>
