<template>
  <div
    class="flex justify-content-center align-items-center cursor-pointer ml-3"
    @click="togglePanel"
  >
    <Avatar
      image="https://www.fillmurray.com/100/100"
      size="large"
      shape="circle"
    />
    <div class="user-menu ml-4 hidden lg:block">
      <div class="font-bold">Username</div>
      <div class="text-sm mt-1">Role</div>
    </div>
    <i
      class="pi pi-angle-down ml-2 hidden lg:block"
      style="color: var(--primary-color)"
    ></i>
  </div>
  <OverlayPanel ref="userPanel" :style="{ width: '300px' }">
    <div class="p-0 m-0 shadow-1">
      <div class="p-4 bg-primary border-round-top-md">
        <div class="text-white text-xl font-bold">Name</div>
        <div class="text-white mt-2">Role</div>
      </div>
      <div class="p-4 flex align-items-center">
        <i class="pi pi-user" style="font-size: 1.2rem"></i>
        <div class="pl-4">
          <div class="text-xl font-medium">My Profile</div>
          <div class="mt-2 text-bluegray-400 text-sm">
            View personal profile details.
          </div>
        </div>
      </div>
      <Divider class="p-0 m-0" />

      <div class="p-4 flex align-items-center">
        <i class="pi pi-user-edit" style="font-size: 1.2rem"></i>
        <div class="pl-4">
          <div class="text-xl font-medium">Edit Profile</div>
          <div class="mt-2 text-bluegray-400 text-sm">
            Modify your personal details.
          </div>
        </div>
      </div>
      <Divider class="p-0 m-0" />

      <div class="p-4 flex align-items-center">
        <i class="pi pi-user" style="font-size: 1.2rem"></i>
        <div class="pl-4">
          <div class="text-xl font-medium">Account Settings</div>
          <div class="mt-2 text-bluegray-400 text-sm">
            Modify your personal details.
          </div>
        </div>
      </div>
      <Divider class="p-0 m-0" />

      <div class="p-4 flex align-items-center">
        <i class="pi pi-cog" style="font-size: 1.2rem"></i>
        <div class="pl-4">
          <div class="text-xl font-medium">Privacy Settings</div>
          <div class="mt-2 text-bluegray-400 text-sm">
            Control your privacy parameters
          </div>
        </div>
      </div>
      <Divider class="p-0 m-0" />

      <div class="p-4 text-center">
        <Button label="Sign Out" class="p-button-rounded" />
      </div>
    </div>
  </OverlayPanel>
</template>
<script>
import { ref, defineComponent, onMounted, onUnmounted } from "vue"

import Avatar from "primevue/avatar"
import Button from "primevue/button"
import Divider from "primevue/divider"
import OverlayPanel from "primevue/overlaypanel"

export default defineComponent({
  name: "AppUserProfile",
  components: { Avatar, Button, Divider, OverlayPanel },
  setup() {
    const userPanel = ref()

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

    return {
      userPanel,
      togglePanel
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
