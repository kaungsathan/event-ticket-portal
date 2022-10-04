<template>
  <Dropdown
    inputId="gender"
    v-model="gender"
    :options="optionsBloodType"
    class="w-full"
  />
</template>

<script>
import { defineComponent, ref, watch } from "vue"

import Dropdown from "primevue/dropdown"

export default defineComponent({
  name: "Gender",
  components: { Dropdown },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const gender = ref("")
    const optionsBloodType = ref(["MALE", "FEMALE", "PREFER NOT TO SAY"])

    watch([gender], () => {
      emit("update:modelValue", gender.value)
    })

    return {
      gender,
      optionsBloodType
    }
  }
})
</script>
<style scope></style>
