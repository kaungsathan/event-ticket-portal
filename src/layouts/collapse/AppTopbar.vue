<template>
  <div class="layout-collapse-topbar">
    <button
      class="p-link layout-collapse-menu-button layout-collapse-topbar-button ml-0 lg:hidden"
      @click="onMenuToggle"
    >
      <i class="ri-menu-line ri-lg" />
    </button>

    <ul class="layout-collapse-topbar-menu flex origin-top">
      <li>
        <AppThemeToggle />
      </li>
      <li>
        <AppLocale />
      </li>
      <li>
        <AppUserProfile />
      </li>
    </ul>
  </div>
</template>

<script>
import AppLocale from "./AppLocale.vue"
import AppThemeToggle from "./AppThemeToggle.vue"
import AppUserProfile from "./AppUserProfile.vue"

import { defineComponent } from "vue"

export default defineComponent({
  name: "AppTopbar",
  components: {
    AppLocale,
    AppThemeToggle,
    AppUserProfile
  },
  setup() {},
  methods: {
    onMenuToggle(event) {
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit("menu-toggle", event)
    },
    toggleMenu(event) {
      this.$refs.menu.toggle(event)
    }
  }
})
</script>
