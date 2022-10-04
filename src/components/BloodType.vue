<template>
  <Dropdown
    inputId="bloodType"
    v-model="bloodType"
    :options="optionsBloodType"
    class="w-full"
  />
</template>

<script>
import { defineComponent, ref, watch } from "vue"

import Dropdown from "primevue/dropdown"

export default defineComponent({
  name: "BloodType",
  components: { Dropdown },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const bloodType = ref("")
    const optionsBloodType = ref(["A", "B", "O", "AB"])

    watch([bloodType], () => {
      emit("update:modelValue", bloodType.value)
    })

    return {
      bloodType,
      optionsBloodType
    }
  }
})
</script>
<style scope></style>
