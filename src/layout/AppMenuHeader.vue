<template>
  <div class="layout-collapse-menu-header">
    <div class="flex items-center justify-between">
      <router-link :to="{ name: 'dashboard' }" class="w-full">
        <div class="flex content-start items-center gap-4">
          <!-- <img class="menu-collapse-logo" alt="Logo" src="@/assets/images/onenex.png" /> -->
          <span class="menu-collapse-label text-semibold text-2xl text-primary">Event Manager</span>
        </div>
      </router-link>
      <button v-if="!mobileMenuActive" class="p-link layout-collapse-menu-button layout-collapse-topbar-button menu-toggle ml-0" @click="onMenuToggle">
        <i class="pi" :class="menuActive ? 'pi-ellipsis-v' : 'pi-ellipsis-h'" style="font-size: 1.5rem; color: rgb(var(--text-color))" />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ menuActive: Boolean, mobileMenuActive: Boolean })

const emit = defineEmits(['menu-toggle'])

const onMenuToggle = (event) => {
  emit('menu-toggle', event)
}
</script>
