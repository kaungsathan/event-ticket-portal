<template>
  <Select input-id="bloodType" v-model="model" :options="optionsBloodType" class="w-full" />
</template>

<script setup>
import { ref } from 'vue'

const optionsBloodType = ref(['A', 'B', 'O', 'AB'])

const model = defineModel()
</script>
