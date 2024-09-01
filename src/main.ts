import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import App from './App.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en: {
      guesser: {
        submit_button_text: 'Try guess',
        found: 'Found words'
      }
    },
    ru: {
      guesser: {
        submit_button_text: 'Пробуем угадать',
        found: 'Найдено слов'
      }
    }
  }
})
const app = createApp(App)
app.use(createPinia())
app.use(i18n)

app.mount('#app')
