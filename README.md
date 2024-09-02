# Portal Starter Kit

Vue3 Modular Architecture Portal Starter Kit

## Features

[Vue3](https://vuejs.org/)<br>
[Vue Composition API](https://vuejs.org/api/composition-api-setup.html)<br>
[Vue Router](https://router.vuejs.org/) - The official router for Vue.js<br>
[Pinia](https://pinia.vuejs.org/) - The Vue Store that you will enjoy using<br>
[Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js<br>
[I18ns](https://vue-i18n.intlify.dev/) - Vue I18n is internationalization plugin for Vue.js<br>
[CASL](https://casl.js.org/v6/en/) - Isomorphic Authorization JavaScript library<br>
[Husky](https://typicode.github.io/husky/) - Modern native git hooks made easy<br>
[Vite](https://vitejs.dev/) - Next Generation Frontend Tooling<br>
[Unplugin Vue Components](https://github.com/unplugin/unplugin-vue-components) - On-demand components auto importing for
Vue.

## UI

[PrimeVue](http://www.primefaces.org/primevue/) with [Sakai Admin Template](https://github.com/primefaces/sakai-vue)
<br>

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Editor Config](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Recommended Node Version

Node >= 16
<br>

## Learning Resources

[Cheatsheets](https://www.vuemastery.com/vue-cheat-sheet)<br>
[Tailwind CSS](https://tailwindcss.com/)<br>
[VueUse](https://vueuse.org/)<br>
[Vue Community](https://vue-community.org/)<br>
[Vue Newsletter](https://vuejsdevelopers.com/newsletter/)<br>
<br>

## Project setup

### Edit .env

```
VITE_ENV=local
VITE_ROOT_API=
VITE_I18N_FALLBACK_LOCALE=en
```

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Formats files

```
npm run format
```

### Login

```
username: superadmin
password: password
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/guide/).

<br>

### FieldLabel And Validation Component

```vue

<template>
  <div class="flex flex-col gap-1">
    <FieldLabel for-field="email" :invalid="v$.email.$invalid && submitted" required />
    <InputText id="email" v-model="v$.email.$model" :invalid="v$.email.$invalid && submitted"
               aria-describedby="email-error" />
    <div>
      <ClientValidation field="email" :model="v$.email" :submitted="submitted" />
      <ServerValidation field="email" />

      <!-- Adding Icon using slot-->
      <ServerValidation field="email">
        <template #icon>
          <SvgIcon name="svgname" class="">
        </template>
      </ServerValidation>
      <!-- Both Client and Server Validation component support icon slot.-->
    </div>
  </div>
</template>
<script setup>
  import FieldLabel from '@/components/FieldLabel.vue'
  import ClientValidation from '@/components/ClientValidation.vue'
  import ServerValidation from '@/components/ServerValidation.vue'
  import SvgIcon from '@/components/SvgIcon.vue'
</script>
```

### CASL

#### CASL Format

```json
[
  {
    "action": "read",
    "subject": "user"
  },
  {
    "action": "edit",
    "subject": "user"
  },
  {
    "action": "create",
    "subject": "user"
  },
  {
    "action": "delete",
    "subject": "user"
  }
]
```

#### How to use CASL in Vue Template

```vue
<template>
  <div>
    <div v-if="$can('read', 'user')">Can Read User</div>
    <div v-if="$can('edit', 'user')">Can Edit User</div>
    <div v-if="$can('create', 'user')">Can Create User</div>
    <div v-if="$can('delete', 'user')">Can Delete User</div>
  </div>
</template>
```

#### How to use CASL in Vue Router

```javascript
{
    path: "/user/list",
    name: "user",
    component: () => import("@/modules/user/list/User.vue"),
    meta:
    {
      subject: "user",
      action:"read",
    }
},
```

```javascript
if (!canNavigate(to)) {
  // Redirect to login if not logged in
  if (!isLoggedIn) return next({ name: 'login' })

  // If logged in => not authorized
  return next({ name: 'not-authorized' })
}
```

### Svg Icon

#### Add svg image under src/assets/icons folder

```vue
<template>
  <div>
    <SvgIcon name="svgname" class="">
  </div>
</template>
```

### Date Formatter

```vue
<template>
  <div>
    <h5>{{ $moment().format('MMMM Do YYYY, h:mm:ss a') }}</h5>
    <h5>{{ currentLong }}</h5>
    <h5>{{ currentShort }}</h5>
  </div>
</template>
<script setup>
import { dateLong, dateShort } from '@/utils/formatter'

const currentLong = dateLong(new Date())
const currentShort = dateShort(new Date())
</script>
```

### Blood Type Picker

```vue
<template>
  <div>
    <BloodType v-model="bloodType" />
  </div>
</template>
<script setup>
const bloodType = ref('')
</script>
```

### Gender Picker

```vue
<template>
  <div>
    <Gender v-model="gender" />
  </div>
</template>
<script setup>
const gender = ref('')
</script>
```

### NRC Picker

```vue
<template>
  <div>
    <NRC v-model="nrc" />
  </div>
</template>
<script setup>
const nrc = ref('6/HTAWANA(N)000000')
</script>
```

### Phone Number

```vue
<template>
  <div>
    <PhoneNumber id="phone-number" v-model:countryCode="countryCode" v-model:phoneNumber="phoneNumber"> </PhoneNumber>
  </div>
</template>
<script setup>
const countryCode = ref('+95')
const phoneNumber = ref('092423239')
</script>
```
