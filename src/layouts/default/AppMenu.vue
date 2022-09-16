<template>
  <div class="layout-menu-container">
    <AppSubmenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @keydown="onKeyDown"
    />
    <a href="https://www.primefaces.org/primeblocks-vue" class="block mt-3">
      <img alt="primeblocks" :src="bannerImage()" class="w-full" />
    </a>
  </div>
</template>

<script>
import AppSubmenu from "./AppSubmenu"

export default {
  components: {
    AppSubmenu: AppSubmenu
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    model: Array
  },
  emits: ["menuitem-click"],
  computed: {
    darkTheme() {
      return this.$appState.darkTheme
    }
  },
  methods: {
    onMenuItemClick(event) {
      this.$emit("menuitem-click", event)
    },
    onKeyDown(event) {
      const nodeElement = event.target
      if (event.code === "Enter" || event.code === "Space") {
        nodeElement.click()
        event.preventDefault()
      }
    },
    bannerImage() {
      return this.$appState.darkTheme
        ? require("@/assets/images/banner-primeblocks-dark.png")
        : require("@/assets/images/banner-primeblocks.png")
    }
  }
}
</script>
