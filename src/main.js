import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUser, faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia';

library.add(faHome, faUser, faHeart, faBagShopping)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.createApp(router)
app.mount('#app')
