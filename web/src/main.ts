import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import 'virtual:windi.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.mount('#app')
app.use(pinia)
