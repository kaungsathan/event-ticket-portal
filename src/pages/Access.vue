<template>
  <div class="flex h-screen flex-col justify-center px-10 lg:px-16">
    <div class="flex w-full flex-col items-center">
      <div class="text-center text-4xl font-bold">Access Denied</div>
      <div class="text-light mt-4 text-center">You do not have the necessary permissions. Please contact admins.</div>
      <SvgIcon name="asset-access" class="mt-12 w-full lg:w-1/3" />
      <RouterLink to="/" class="mt-6">
        <Button label="Go to dashboard" icon="pi pi-arrow-left"> </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
</script>
