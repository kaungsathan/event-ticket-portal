<template>
  <div v-if="store.getError(field)" class="text-red-600">
    <small v-for="error in store.getError(field)" :key="error" class="flex items-center gap-x-1 text-sm">
      <slot v-if="$slots.icon" name="icon" class="h-4 w-4"></slot>
      <span class="text-sm">{{ error }}</span>
    </small>
  </div>
</template>

<script setup>
import { useServerValidationStore } from '@/store/serverValidationStore'
import { onBeforeUnmount } from 'vue'

const store = useServerValidationStore()
defineProps({
  field: {
    type: String,
    required: true
  }
})

onBeforeUnmount(() => {
  store.$reset()
})
</script>
