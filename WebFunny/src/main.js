import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router/index.js'
import 'amfe-flexible/index.js'
import './assets/css/tailwind.css'
import './assets/css/style.css'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router).use(pinia).mount('#app')
