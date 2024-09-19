<template>
  <div class="layout-collapse-topbar">
    <button class="layout-collapse-menu-button layout-collapse-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars" />
    </button>

    <AppBreadcrumb />

    <ul class="layout-collapse-topbar-menu flex items-center gap-3">
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

<script setup>
import AppLocale from './AppLocale.vue'
import AppUserProfile from './AppUserProfile.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import AppThemeToggle from './AppThemeToggle.vue'

const emit = defineEmits(['menu-toggle'])

const onMenuToggle = (event) => {
  emit('menu-toggle', event)
}
</script>
