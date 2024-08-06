import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import 'virtual:windi.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
