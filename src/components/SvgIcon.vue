<template>
  <component :is="icon" class="fill-current" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

// feel free to update this with an svg directory of your choice
const icon = defineAsyncComponent(() => import(`@/assets/icons/${props.name}.svg?component`))
</script>
