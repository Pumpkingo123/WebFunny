import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'amfe-flexible/index.js'
import './assets/css/tailwind.css'
import './assets/css/style.css'

const app = createApp(App)

app.use(router).mount('#app')
