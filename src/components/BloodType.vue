<template>
  <Dropdown
    inputId="bloodType"
    :modelValue="modelValue"
    @change="$emit('update:modelValue', $event.value)"
    :options="optionsBloodType"
    class="w-full"
  />
</template>

<script>
import { defineComponent, ref } from "vue"

import Dropdown from "primevue/dropdown"

export default defineComponent({
  name: "BloodType",
  components: { Dropdown },
  props: {
    modelValue: {
      type: String,
      default: "",
      required: true
    }
  },
  setup() {
    const optionsBloodType = ref(["A", "B", "O", "AB"])

    return {
      optionsBloodType
    }
  }
})
</script>
<style scope></style>
