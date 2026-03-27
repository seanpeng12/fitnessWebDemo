import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(router)

// Industry Standard: Wait for router to be Ready before mounting, ensuring correct initial home page rendering
router.isReady().then(() => {
  app.mount('#app')
})
