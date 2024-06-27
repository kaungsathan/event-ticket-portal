<template>
  <div class="h-screen flex flex-col justify-center px-10 lg:px-16">
    <div class="w-full flex flex-col items-center">
      <div class="text-4xl font-bold text-center">Not Found</div>
      <div class="text-light mt-4 text-center">Requested resource is not available.</div>
      <SvgIcon name="asset-error" class="w-full lg:w-1/3 mt-12" />
      <RouterLink to="/" class="mt-6">
        <Button label="Go to dashboard" icon="pi pi-arrow-left"> </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
</script>
