<template>
  <Select inputId="gender" v-model="model" :options="optionsGenderType" class="w-full" />
</template>

<script setup>
import { ref } from 'vue'

const model = defineModel()

const optionsGenderType = ref(['MALE', 'FEMALE', 'PREFER NOT TO SAY'])
</script>
<style scope></style>
