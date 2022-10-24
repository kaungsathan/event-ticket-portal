<template>
  <Button
    icon="pi pi-bell"
    @click="togglePanel"
    class="p-button-rounded p-button-text"
  />
  <OverlayPanel ref="userPanel" :style="{ width: '300px' }">
    <div class="p-0 m-0">
      <div
        class="p-4 bg-primary border-round-top-md w-full flex justify-content-between align-items-center"
      >
        <div class="text-white text-xl font-bold">Notification</div>
        <div class="">
          <Avatar
            label="5"
            style="background-color: var(--surface-0); color: var(--text-color)"
          />
        </div>
      </div>

      <div v-for="i in 5" :key="i">
        <div class="p-4 flex align-items-center cursor-pointer">
          <div>
            <Avatar
              image="https://www.fillmurray.com/100/100"
              size="large"
              shape="circle"
            />
          </div>
          <div class="pl-4 w-full">
            <div class="text-xl font-medium">Robert Fox</div>
            <div class="mt-2 flex justify-content-between">
              <div class="text-xl text-gray-500">Doctor</div>
              <div class="text-sm text-gray-500">Just Now</div>
            </div>
          </div>
        </div>
        <Divider class="p-0 m-0" />
      </div>
    </div>
  </OverlayPanel>
</template>
<script>
import { ref, defineComponent, onMounted, onUnmounted } from "vue"

import { useAuthStore } from "@/modules/auth/authStore"

import { useRouter } from "vue-router"

import Avatar from "primevue/avatar"
import Button from "primevue/button"
import Divider from "primevue/divider"
import OverlayPanel from "primevue/overlaypanel"

export default defineComponent({
  name: "AppNotification",
  components: { Avatar, Button, Divider, OverlayPanel },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const userPanel = ref()

    const user = authStore.getUserData

    const togglePanel = (event) => {
      userPanel.value.toggle(event)
    }

    const handleScroll = () => {
      userPanel.value.hide()
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
    })

    onUnmounted(() => {
      window.addEventListener("scroll", handleScroll)
    })

    const userLogout = () => {
      authStore.logout()
      router.replace({ name: "login" })
    }

    return {
      user,
      userPanel,
      togglePanel,
      userLogout
    }
  }
})
</script>
<style>
.user-menu {
  min-width: 100px;
}
.p-overlaypanel .p-overlaypanel-content {
  padding: 0 !important;
}
</style>
