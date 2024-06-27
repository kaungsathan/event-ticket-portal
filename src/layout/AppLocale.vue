<template>
  <Menu ref="languageMenu" :model="languageMenuItems" :popup="true">
    <template #item="{ item }">
      <div @click="changeLocale(item.code)" class="p-2 cursor-pointer">
        <div class="flex align-items-center gap-3">
          <SvgIcon :name="item.code" class="h-6 w-6"></SvgIcon>
          <span class="text-color">{{ item.label }}</span>
        </div>
      </div>
    </template>
  </Menu>
  <Button text class="h-full flex gap-3" @click="toggleLanguageMenu">
    <SvgIcon v-if="localeStore.getLocale === 'mm'" name="mm" class="h-6 w-6"></SvgIcon>
    <SvgIcon v-else name="en" class="h-6 w-6"></SvgIcon>
    <span class="hidden lg:flex text-color">{{ $t(`${localeStore.getLocale}`) }}</span>
    <div class="hidden lg:flex">
      <i class="pi pi-angle-down text-color"></i>
    </div>
  </Button>
</template>
<script setup>
import { useLocaleStore } from '@/store/localeStore'
import { ref, onMounted, onUnmounted } from 'vue'
import Tr from '@/libs/i18n/translation'

const localeStore = useLocaleStore()
const languageMenu = ref()
const languageMenuItems = ref([
  {
    label: 'Myanmar',
    image: `@/assets/images/mm.png`,
    code: 'mm'
  },
  {
    label: 'English',
    image: `@/assets/images/en.png`,
    code: 'en'
  }
])

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  if (languageMenu.value) {
    languageMenu.value.hide()
  }
}

const changeLocale = async (locale) => {
  await Tr.switchLanguage(locale)
  localeStore.setLocale(locale)
  languageMenu.value.hide()
}

const toggleLanguageMenu = (event) => {
  languageMenu.value.toggle(event)
}
</script>
