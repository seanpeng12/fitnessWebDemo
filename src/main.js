import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(router)

// 業界標準：等待路由 Ready 後再 mount，確保初始載入首頁即渲染
router.isReady().then(() => {
  app.mount('#app')
})
