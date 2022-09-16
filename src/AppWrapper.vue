<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EventBus from "@/libs/AppEventBus"
import LayoutDefault from "@/layouts/default/App.vue"
import LayoutFull from "@/layouts/full/App.vue"

export default {
  themeChangeListener: null,
  components: { LayoutDefault, LayoutFull },
  computed: {
    layout() {
      if (this.$route.meta.layout === "default") return "layout-default"
      return "layout-full"
    }
  },
  mounted() {
    this.themeChangeListener = (event) => {
      const elementId = "theme-link"
      const linkElement = document.getElementById(elementId)
      const cloneLinkElement = linkElement.cloneNode(true)
      const newThemeUrl = linkElement
        .getAttribute("href")
        .replace(this.$appState.theme, event.theme)

      cloneLinkElement.setAttribute("id", elementId + "-clone")
      cloneLinkElement.setAttribute("href", newThemeUrl)
      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove()
        cloneLinkElement.setAttribute("id", elementId)
      })
      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      )

      this.$appState.theme = event.theme
      this.$appState.darkTheme = event.dark
    }

    EventBus.on("theme-change", this.themeChangeListener)
  },
  beforeUnmount() {
    EventBus.off("theme-change", this.themeChangeListener)
  }
}
</script>
