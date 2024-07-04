<template>
  <div v-if="model.$invalid && submitted" class="text-red-600">
    <small v-for="error in model.$silentErrors" :key="error" class="flex items-center gap-x-1 text-sm">
      <slot v-if="$slots.icon" name="icon" class="h-4 w-4"></slot>
      <span class="text-sm">{{ error.$message.replace('Value', `The ${field.replace('-', ' ')} field`) }}.</span>
    </small>
  </div>
</template>

<script setup>
defineProps({
  model: {
    type: Object,
    required: true
  },
  submitted: {
    type: Boolean,
    required: true
  },
  field: {
    type: String,
    required: true
  }
})
</script>
