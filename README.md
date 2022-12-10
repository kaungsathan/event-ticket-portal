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

## UI

[PrimeVue](http://www.primefaces.org/primevue/) with [Sakai Admin Template](https://github.com/primefaces/sakai-vue)
<br>

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Editor Config](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Recommended Node Version

Node >= 16
<br>

## Project setup

### Edit .env

```
VUE_APP_ENV=local
VUE_APP_ROOT_API=https://yla-api.dev.onenex.dev/api/
VUE_APP_I18N_FALLBACK_LOCALE=en
```

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
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

See [Configuration Reference](https://cli.vuejs.org/config/).

<br>

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

```html
<template>
  <div>
    <div v-if="$can('read', 'user')">Can Read User<div>
    <div v-if="$can('edit', 'user')">Can Edit User<div>
    <div v-if="$can('create', 'user')">Can Create User<div>
    <div v-if="$can('delete', 'user')">Can Delete User<div>
  </div>
</template>
```

#### How to use CASL in Vue Router

```json
{
  path: "/user/list",
  name: "user",
  component: () => import("@/modules/user/list/User.vue"),
  meta: {
    subject: "user",
    action: "read",
  }
},
```

### Date Formatter

```html,javascript
<template>
  <div>
    <h5>{{ $moment().format("MMMM Do YYYY, h:mm:ss a") }}</h5>
    <h5>{{ currentLong }}</h5>
    <h5>{{ currentShort }}</h5>
  </div>
</template>

import { dateLong, dateShort } from "@/utils/formatter"

setup() {
  const currentLong = dateLong(new Date())
  const currentShort = dateShort(new Date())

  return {
    currentLong,
    currentShort
  }
}
```

### Blood Type Picker

```html,javascript
<template>
  <div>
    <BloodType v-model="bloodType" />
  </div>
</template>

import BloodType from "@/components/BloodType"

components: { BloodType },
setup() {
  const bloodType = ref("")

  return {
    bloodType
  }
}
```

### Gender Picker

```html,javascript
<template>
  <div>
    <Gender v-model="gender" />
  </div>
</template>

import Gender from "@/components/Gender"

components: { Gender },
setup() {
  const gender = ref("")

  return {
    gender
  }
}
```

### NRC Picker

```html,javascript
<template>
  <div>
    <NRC v-model="nrc" />
  </div>
</template>

import NRC from "@/components/NRC"

components: { NRC },
setup() {
  const nrc = ref("6/HTAWANA(N)000000")

  return {
    nrc
  }
}
```

### Phone Number

```html,javascript
<template>
  <div>
    <PhoneNumber
      id="nrc"
      v-model:countryCode="countryCode"
      v-model:phoneNumber="phoneNumber"
    >
    </PhoneNumber>
  </div>
</template>

import PhoneNumber from "@/components/PhoneNumber.vue"

components: { PhoneNumber },
setup() {
  const countryCode = ref("+95")
  const phoneNumber = ref("092423239")

  return {
    phoneNumber,
    countryCode,
  }
}
```

## SASS Variables

In case you'd like to customize the layout variables, open **\_variables.scss** file under src/assets/styles folder. The list is pretty short as majority of the variables are derived from the PrimeVue theme being used.

**src/assets/styles/\_variables.scss**

```css
$fontSize: 1rem;
$borderRadius: 12px;
$transitionDuration: 0.2s;
```
