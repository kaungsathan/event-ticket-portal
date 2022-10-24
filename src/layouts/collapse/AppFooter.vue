<template>
  <div class="layout-footer">
    <img alt="Logo" :src="footerImage()" height="20" class="mr-2" />
    <span class="font-medium ml-2">Heal © {{ new Date().getFullYear() }}</span>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    darkTheme() {
      return this.$appState.darkTheme
    }
  },
  methods: {
    footerImage() {
      return this.$appState.darkTheme
        ? require("@/assets/images/logo-white.svg")
        : require("@/assets/images/logo-dark.svg")
    }
  }
}
</script>
