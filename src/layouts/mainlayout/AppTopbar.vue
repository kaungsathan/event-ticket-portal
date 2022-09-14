<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>ONENEX</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <Button
          v-if="$appState.darkTheme"
          icon="pi pi-sun"
          class="p-button-rounded p-button-text"
          @click="changeTheme($event, 'lara-light-indigo', false)"
        />
        <Button
          v-else
          icon="pi pi-moon"
          class="p-button-rounded p-button-text"
          @click="changeTheme($event, 'lara-dark-indigo', true)"
        />
      </li>
      <li>
        <Menu ref="languageMenu" :model="languageMenuItems" :popup="true">
        </Menu>
        <Button
          type="button"
          @click="toggleLanguageMenu"
          class="p-button-text mr-2 mb-2"
        >
          <img alt="logo" :src="getFlagUrl()" style="width: 1.5rem" />
          <span class="ml-2 p-button-label">{{ $t(localeStore.getCurrentLanguage) }}</span>
        </Button>
      </li>
      <li>
        <Menu ref="menu" :model="profileMenuItems" :popup="true" />
        <Button
          type="button"
          label="Profile"
          icon="pi pi-user"
          @click="toggleMenu"
          style="width: auto"
          class="p-button-text"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useLocaleStore } from "@/store/localeStore";
import { useAuthStore } from "@/modules/auth/authStore";

import EventBus from "@/libs/AppEventBus";
import { useRouter } from "vue-router";

export default {
  setup() {
    const localeStore = useLocaleStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const profileMenuItems = ref([
      {
        label: "User Profile",
        icon: "pi pi-user",
      },
      {
        label: "Setting",
        icon: "pi pi-cog",
      },
      {
        separator: true,
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: () => {
          userLogout();
        },
      },
    ]);
    const languageMenuItems = ref([
      {
        label: "Myanmar",
        image: require("@/assets/flags/mm.png"),
        code: "mm",
        command: (event) => {
          changeLocale(event.item.code);
        },
      },
      {
        label: "English",
        image: require("@/assets/flags/en.png"),
        code: "en",
        command: (event) => {
          changeLocale(event.item.code);
        },
      },
    ]);

    const changeLocale = (locale) => {
      localeStore.setLanguage(locale);
    };

    const getFlagUrl = () => {
      return localeStore.getCurrentLanguage === "mm"
        ? require("@/assets/flags/mm.png")
        : require("@/assets/flags/en.png");
    };

    const userLogout = () => {
      authStore.logout();
      router.replace({ name: "login" });
    };

    return {
      localeStore,
      profileMenuItems,
      languageMenuItems,

      getFlagUrl,
    };
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme
        ? require("@/assets/images/logo-white.svg")
        : require("@/assets/images/logo-dark.svg");
    },
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    toggleLanguageMenu(event) {
      this.$refs.languageMenu.toggle(event);
    },
    onContextRightClick(event) {
      this.$refs.contextMenu.show(event);
    },
    changeTheme(event, theme, dark) {
      EventBus.emit("theme-change", { theme: theme, dark: dark });
      event.preventDefault();
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>
