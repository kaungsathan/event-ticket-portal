<template>
  <Button v-if="themeStore.getTheme === 'dark'" icon="pi pi-sun" class="p-button-rounded p-button-text" @click="changeTheme('light')" />
  <Button v-else icon="pi pi-moon" class="p-button-rounded p-button-text" @click="changeTheme('dark')" />
</template>

<script setup>
import { useThemeStore } from '@/store/themeStore'
import EventBus from '@/libs/AppEventBus'

const themeStore = useThemeStore()

const changeTheme = (theme) => {
  EventBus.emit('theme-toggle', theme)
}
</script>
