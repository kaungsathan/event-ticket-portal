<template>
  <div class="layout-footer">
    <img alt="Logo" :src="footerImage()" height="20" class="mr-2" />
    by
    <span class="font-medium ml-2">PrimeVue</span>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    footerImage() {
      return this.$appState.darkTheme
        ? require('@/assets/images/logo-white.svg')
        : require('@/assets/images/logo-dark.svg');
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>
