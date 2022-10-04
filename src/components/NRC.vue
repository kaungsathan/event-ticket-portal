<template>
  <div class="grid m-0 p-0">
    <div class="col-2 pr-1 pl-0 py-0">
      <Dropdown
        inputId="prefix"
        v-model="prefix"
        :options="optionsPrefix"
        class="w-full nrc"
      />
    </div>
    <div class="col-4 pr-1 pl-0 py-0">
      <Dropdown
        inputId="town"
        v-model="town"
        :options="optionsTown"
        optionLabel="name"
        optionValue="name"
        :filter="true"
        class="w-full town"
      />
    </div>
    <div class="col-2 pr-1 pl-0 py-0">
      <Dropdown
        inputId="type"
        v-model="type"
        :options="optionsType"
        class="w-full type"
      />
    </div>
    <div class="col-4 pr-0 pl-0 py-0">
      <InputMask
        id="basic"
        mask="999999"
        v-model="number"
        placeholder="000000"
        slotChar=""
        class="w-full"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue"

import Dropdown from "primevue/dropdown"
import InputMask from "primevue/inputmask"

import nrcData from "@/assets/data/nrcData"

export default defineComponent({
  name: "NRC",
  components: { Dropdown, InputMask },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const prefix = ref()
    const town = ref("")
    const type = ref("")
    const number = ref("")
    const optionsPrefix = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
    const optionsTown = ref([])
    const optionsType = ref(["(N)", "(P)", "(E)", "(C)"])
    const nrcNumber = ref("")

    watch(prefix, () => {
      optionsTown.value = []
      for (const pre in nrcData) {
        if (pre == prefix.value) {
          optionsTown.value = nrcData[pre]
        }
      }
    })

    watch([prefix, town, type, number], () => {
      nrcNumber.value = `${prefix.value}/${town.value}${type.value}${number.value}`
      emit("update:modelValue", nrcNumber.value)
    })

    return {
      nrcData,
      prefix,
      town,
      type,
      number,
      optionsPrefix,
      optionsTown,
      optionsType
    }
  }
})
</script>
<style scope>
.town .p-dropdown-trigger {
  display: none;
}
.type .p-dropdown-trigger {
  display: none;
}
.nrc .p-dropdown-trigger {
  display: none;
}
</style>
