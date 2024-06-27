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

const toast = useToast()

onMounted(() => {
  EventBus.on('show-toast', showToast)
})

onBeforeUnmount(() => {
  EventBus.off('show-toast', showToast)
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
