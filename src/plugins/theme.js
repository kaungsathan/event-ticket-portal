import { app } from "./main-app"
import { reactive } from "vue"

app.config.globalProperties.$appState = reactive({
  theme: "lara-light-indigo",
  darkTheme: false
})
