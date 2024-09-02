<template>
  <input
    @keydown="isNumber($event)"
    @keypress="isNumber($event)"
    id="mobile_number"
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    maxlength="12"
    placeholder="912345678"
    v-model="model"
    class="border-0 shadow-none outline-none"
  />
</template>

<script setup>
const model = defineModel()

const isNumber = (evt) => {
  let keyCode = evt.keyCode ? evt.keyCode : evt.which
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && keyCode !== 8) {
    // 46 is delete
    // 8 is backspace
    evt.preventDefault()
  }
}
</script>
