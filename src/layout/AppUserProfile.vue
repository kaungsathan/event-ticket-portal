<template>
  <Menu ref="userMenu" :model="profileMenuItems" :popup="true" />
  <div class="flex justify-center items-center cursor-pointer gap-3" @click="togglePanel">
    <Avatar :image="user?.avatar ? user.avatar : 'https://i.pravatar.cc/300'" size="large" shape="circle" />
    <div class="user-menu hidden lg:block">
      <div class="font-semibold">{{ user ? user.full_name : 'John' }}</div>
      <div class="text-sm">{{ user ? user.role.name : 'Role' }}</div>
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

const authStore = useAuthStore()
const router = useRouter()
const userMenu = ref()

const profileMenuItems = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user-edit',
    command: () => {
      linkTo('profile')
    }
  },
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

const linkTo = (routeName) => {
  router.push({ name: routeName })
}
</script>
<style lang="scss" scoped>
.user-menu {
  min-width: 100px;
}
</style>
