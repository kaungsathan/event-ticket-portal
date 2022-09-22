import { app } from "./main-app"
import moment from "moment"
// import { getCurrentInstance } from "vue"

app.config.globalProperties.$moment = moment

// export function useMoment() {
//   const vm = getCurrentInstance()
//   return vm.appContext.config.globalProperties.$moment
// }
