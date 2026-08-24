import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(i18n)

// Industry Standard: Wait for router to be Ready before mounting, ensuring correct initial home page rendering
router.isReady().then(() => {
  const callbackParams = new URLSearchParams(window.location.search)
  if (callbackParams.has('code') || callbackParams.has('error')) {
    router.replace('/auth/callback')
  }
  app.mount('#app')
})
