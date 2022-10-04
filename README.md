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

### Date Formatter

```html,js
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

```html,js
<template>
  <div>
    <BloodType v-model="bloodType" />
  </div>
</template>

import BloodType from "@/components/BloodType"

setup() {
  const bloodType = ref("")

  return {
    bloodType
  }
}
```

### Gender Picker

```html,js
<template>
  <div>
    <Gender v-model="gender" />
  </div>
</template>

import Gender from "@/components/Gender"

setup() {
  const gender = ref("")

  return {
    gender
  }
}
```

### NRC Picker

```html,js
<template>
  <div>
    <NRC v-model="nrc" />
  </div>
</template>

import NRC from "@/components/NRC"

setup() {
  const nrc = ref("")

  return {
    nrc
  }
}
```

### Country Phone Code Picker

```html,js
<template>
  <div>
    <CountryPhoneCode v-model="countryCode" />
  </div>
</template>

import CountryPhoneCode from "@/components/CountryPhoneCode"

setup() {
  const countryCode = ref({})

  return {
    countryCode
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
