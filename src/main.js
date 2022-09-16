import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "prismjs/themes/prism-coy.css";
import "@/assets/styles/layout.scss";
import "@/assets/demo/flags/flags.css";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

import { reactive } from "vue";
import { createPinia } from "pinia";
import router from "@/routers";

import i18n from "./libs/i18n";
import { abilitiesPlugin } from "@casl/vue";
import ability from "./libs/acl/ability";
import { app } from "@/plugins/global-components";

//default theme
app.config.globalProperties.$appState = reactive({
  theme: "lara-light-indigo",
  darkTheme: false,
});

const pinia = createPinia();

app.use(PrimeVue, { ripple: false, inputStyle: "outlined" });
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);
app.use(pinia);
app.use(i18n);
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
});

app.mount("#app");
