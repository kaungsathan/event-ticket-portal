<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
  <Toast position="bottom-right"></Toast>
</template>

<script>
import EventBus from "@/libs/AppEventBus"
import LayoutDefault from "@/layouts/default/App.vue"
import LayoutFull from "@/layouts/full/App.vue"
import Toast from "primevue/toast"

export default {
  themeChangeListener: null,
  components: { LayoutDefault, LayoutFull, Toast },
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
    EventBus.on("show-toast", this.showToast)
  },
  methods: {
    showToast(event) {
      this.$toast.add({
        severity: event.severity,
        summary: event.summary,
        detail: event.detail,
        life: 3000
      })
    }
  },
  beforeUnmount() {
    EventBus.off("theme-change", this.themeChangeListener)
    EventBus.off("show-toast", this.showToast)
  }
}
</script>
