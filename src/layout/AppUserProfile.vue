<template>
  <Menu ref="userMenu" :model="profileMenuItems" :popup="true" />
  <div class="flex cursor-pointer items-center justify-center gap-3" @click="togglePanel">
    <Avatar :image="avater" size="large" shape="circle" />
    <div class="user-menu hidden lg:block">
      <div class="font-semibold">{{ user ? user.full_name : 'John' }}</div>
      <div v-for="role in user.roles" :key="role" class="text-sm">{{ role }}</div>
    </div>
    <div class="hidden lg:block">
      <i class="pi pi-angle-down"></i>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { useAuthStore } from '@/modules/auth/authStore'
import { useRouter } from 'vue-router'

import { authService } from '@/modules/auth/authService'
import { computed } from 'vue'
import avaterImage from '@/assets/images/avater.png'

const authStore = useAuthStore()
const router = useRouter()
const userMenu = ref()

const profileMenuItems = ref([
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      userLogout()
    }
  }
])

// const user = authStore.getUserData
const user = computed(() => authStore.getUserData)

const avater = computed(() => {
  return user.value?.avatar ? user.value.avatar : avaterImage
})

const togglePanel = (event) => {
  userMenu.value.toggle(event)
}

const handleScroll = () => {
  if (userMenu.value) {
    userMenu.value.hide()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
})

const userLogout = () => {
  const token = localStorage.getItem('userToken')
  authService.logout(token)
  authStore.logout()
  router.push({ name: 'login' })
}
</script>
<style lang="scss" scoped>
.user-menu {
  min-width: 100px;
}
</style>
