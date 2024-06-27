<template>
  <Select input-id="bloodType" :model-value="modelValue" :options="optionsBloodType" class="w-full" @change="$emit('update:modelValue', $event.value)" />
</template>

<script setup>
import { ref } from 'vue'

const optionsBloodType = ref(['A', 'B', 'O', 'AB'])

defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true
  }
})
</script>
