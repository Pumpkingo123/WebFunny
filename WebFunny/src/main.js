import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router/index.js'
import 'amfe-flexible/index.js'
import './assets/css/tailwind.css'
import './assets/css/style.css'

const app = createApp(App)
const pinia = createPinia();

app.use(router).use(pinia).mount('#app')
