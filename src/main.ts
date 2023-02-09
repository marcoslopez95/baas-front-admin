/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueSelect from "vue-select"
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import "vue-select/dist/vue-select.css"
import 'vue3-toastify/dist/index.css'

loadFonts()

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
   .component("v-select-c", VueSelect)
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'colored',
} as ToastContainerOptions);
app.mount('#app')
