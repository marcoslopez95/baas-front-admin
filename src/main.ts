/* eslint-disable import/order */
import '@/@iconify/icons-bundle';
import App from '@/App.vue';
import messages from '@/lang';
import vuetify from '@/plugins/vuetify';
import { loadFonts } from '@/plugins/webfontloader';
import router from '@/router';
import '@/styles/styles.scss';
import '@core/scss/index.scss';
import axios from 'axios';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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

const i18n = createI18n({
  locale: localStorage.getItem('lang') ?? 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})
app.use(i18n)

app.mount('#app')
