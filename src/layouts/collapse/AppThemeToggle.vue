<template>
  <Button
    v-if="$appState.darkTheme"
    icon="pi pi-sun"
    class="p-button-rounded p-button-text"
    @click="changeTheme($event, 'lara-light-indigo', false)"
  />
  <Button
    v-else
    icon="pi pi-moon"
    class="p-button-rounded p-button-text"
    @click="changeTheme($event, 'lara-dark-indigo', true)"
  />
</template>

<script>
import { defineComponent } from "vue"
import EventBus from "@/libs/AppEventBus"
import { useLocaleStore } from "@/store/localeStore"

import Button from "primevue/button"

export default defineComponent({
  name: "AppThemeToggle",
  components: { Button },
  setup() {
    const localeStore = useLocaleStore()
    const changeTheme = (event, theme, dark) => {
      localeStore.setTheme(theme)
      EventBus.emit("theme-change", { theme: theme, dark: dark })
      event.preventDefault()
    }
    return {
      changeTheme
    }
  }
})
</script>
