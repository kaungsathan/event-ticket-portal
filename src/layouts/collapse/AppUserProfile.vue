<template>
  <Menu ref="userMenu" :model="profileMenuItems" :popup="true" />
  <div
    class="flex justify-content-center align-items-center cursor-pointer ml-3"
    @click="togglePanel"
  >
    <Avatar
      image="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250r"
      size="large"
      shape="circle"
    />
    <div class="user-menu ml-4 hidden lg:block">
      <div class="font-bold">Username</div>
      <div class="text-sm mt-1">Userrole</div>
    </div>
    <i
      class="pi pi-angle-down ml-2 hidden lg:block"
      style="color: var(--primary-color)"
    ></i>
  </div>
</template>
<script>
import { ref, defineComponent, onMounted, onUnmounted } from "vue"

import { useAuthStore } from "@/modules/auth/authStore"
import { useRouter } from "vue-router"
import { useConfirm } from "primevue/useconfirm"

import Avatar from "primevue/avatar"
import Menu from "primevue/menu"
// import Button from "primevue/button"
// import Divider from "primevue/divider"
// import OverlayPanel from "primevue/overlaypanel"
// import ConfirmDialog from "primevue/confirmdialog"

export default defineComponent({
  name: "AppUserProfile",
  components: {
    Avatar,
    Menu
    // Button,
    // Divider
    //  OverlayPanel,
    // ConfirmDialog
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const userMenu = ref()
    const confirm = useConfirm()

    const user = authStore.getUserData

    const profileMenuItems = ref([
      {
        label: "User Profile",
        icon: "pi pi-user"
      },
      {
        label: "Edit Profile",
        icon: "pi pi-user-edit"
      },
      {
        label: "Setting",
        icon: "pi pi-cog"
      },
      {
        separator: true
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: () => {
          userLogout()
        }
      }
    ])

    const togglePanel = (event) => {
      userMenu.value.toggle(event)
    }

    const handleScroll = () => {
      userMenu.value.hide()
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
    })

    onUnmounted(() => {
      window.addEventListener("scroll", handleScroll)
    })

    const showConfirmDialog = () => {
      confirm.require({
        message: "Are you sure?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sign out",
        rejectLabel: "Cancel",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-secondary p-button-text",

        accept: () => {
          userLogout()
        },
        reject: () => {
          //callback to execute when corporate rejects the action
        },
        onHide: () => {
          //Callback to execute when dialog is hidden
        }
      })
    }

    const userLogout = () => {
      authStore.logout()
      router.push({ name: "login" })
    }

    return {
      user,
      userMenu,
      profileMenuItems,
      togglePanel,
      userLogout,
      showConfirmDialog
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
.p-dialog-footer {
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
</style>
