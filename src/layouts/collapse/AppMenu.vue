<template>
  <div class="layout-collapse-menu-container">
    <AppSubmenu
      :items="model"
      class="layout-collapse-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @keydown="onKeyDown"
    />
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
    topbarImage() {
      return this.$appState.darkTheme
        ? require("@/assets/images/logo-white.svg")
        : require("@/assets/images/logo-dark.svg")
    }
  }
}
</script>
