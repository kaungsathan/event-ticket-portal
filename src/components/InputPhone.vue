<template>
  <input
    @keydown="isNumber($event)"
    @keypress="isNumber($event)"
    id="mobile_number"
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    maxlength="12"
    placeholder="912345678"
    :class="['p-inputtext p-component', { 'p-filled': filled }]"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script>
export default {
  name: "InputPhone",
  emits: ["update:modelValue"],
  props: {
    modelValue: null
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value)
    },
    isNumber: function (evt) {
      let keyCode = evt.keyCode ? evt.keyCode : evt.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && keyCode !== 8) {
        // 46 is delete
        // 8 is backspace
        evt.preventDefault()
      }
    }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0
    }
  }
}
</script>
