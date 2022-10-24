<template>
  <Dropdown
    inputId="gender"
    :modelValue="modelValue"
    :options="optionsGenderType"
    @change="$emit('update:modelValue', $event.value)"
    class="w-full"
  />
</template>

<script>
import { defineComponent, ref } from "vue"

import Dropdown from "primevue/dropdown"

export default defineComponent({
  name: "Gender",
  components: { Dropdown },
  props: {
    modelValue: {
      type: String,
      default: "",
      required: true
    }
  },
  setup() {
    const optionsGenderType = ref(["MALE", "FEMALE", "PREFER NOT TO SAY"])

    return {
      optionsGenderType
    }
  }
})
</script>
<style scope></style>
