<template>
  <RouterProgressBar />
  <router-view />
  <Toast position="bottom-right"> </Toast>
</template>

<script setup>
import Toast from 'primevue/toast'
import RouterProgressBar from '@/components/RouterProgressBar.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import EventBus from '@/libs/AppEventBus'
import { useToast } from 'primevue/usetoast'
import { useThemeStore } from '@/store/themeStore'

const toast = useToast()
const themeStore = useThemeStore()

onMounted(() => {
  EventBus.on('show-toast', showToast)
  EventBus.on('theme-toggle', themeToggle)
  initTheme()
})

const initTheme = () => {
  const theme = themeStore.getTheme
  themeToggle(theme)
}

const themeToggle = (theme) => {
  themeStore.setTheme(theme)
  const element = document.querySelector('html')
  if (theme === 'dark') {
    element.classList.toggle('dark')
  } else {
    element.classList.remove('dark')
  }
}

onBeforeUnmount(() => {
  EventBus.off('show-toast', showToast)
  EventBus.off('theme-toggle', themeToggle)
})

const showToast = (event) => {
  toast.add({
    severity: event.severity,
    summary: event.summary,
    detail: event.detail,
    life: event.life
  })
}
</script>

<style scoped></style>
