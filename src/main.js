import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUser, faHeart, faBagShopping, faCheckCircle, faQrcode, faFileInvoiceDollar, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia';

library.add(faHome, faUser, faHeart, faBagShopping, faCheckCircle, faQrcode, faFileInvoiceDollar, faCreditCard)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
