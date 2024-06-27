import { app } from './main-app'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      color: 'rgb(var(--primary-500))',
      inverseColor: '#ffffff',
      hoverColor: 'rgb(var(--primary-400))',
      activeColor: 'rgb(var(--primary-300))',
      50: 'rgb(var(--primary-50))',
      100: 'rgb(var(--primary-100))',
      200: 'rgb(var(--primary-200))',
      300: 'rgb(var(--primary-300))',
      400: 'rgb(var(--primary-400))',
      500: 'rgb(var(--primary-500))',
      600: 'rgb(var(--primary-600))',
      700: 'rgb(var(--primary-700))',
      800: 'rgb(var(--primary-800))',
      900: 'rgb(var(--primary-900))',
      950: 'rgb(var(--primary-950))'
    },
    surface: {
      0: 'rgb(var(--surface-0))',
      50: 'rgb(var(--surface-50))',
      100: 'rgb(var(--surface-100))',
      200: 'rgb(var(--surface-200))',
      300: 'rgb(var(--surface-300))',
      400: 'rgb(var(--surface-400))',
      500: 'rgb(var(--surface-500))',
      600: 'rgb(var(--surface-600))',
      700: 'rgb(var(--surface-700))',
      800: 'rgb(var(--surface-800))',
      900: 'rgb(var(--surface-900))',
      950: 'rgb(var(--surface-950))'
    },
    highlight: {
      background: 'rgb(var(--primary-500))',
      focusBackground: 'rgb(var(--primary-200))',
      color: '#ffffff',
      focusColor: '#ffffff'
    }
  }
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      },
      darkModeSelector: 'class'
    }
  }
})
