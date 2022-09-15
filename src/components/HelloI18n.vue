<template>
  <p>{{ $t("hello") }}</p>
  <p>{{ $t("message") }}</p>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "HelloI18n",
})
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "mm": {
    "hello": "မင်္ဂလာပါ i18n in SFC!"
  }
}
</i18n>
