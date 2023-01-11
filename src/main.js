import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
// import router from './router'

import './assets/base.css'

const app = createApp(App);

const i18n = createI18n({
    locale: 'ru', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: [],
})

app.use(i18n);
app.use(VueSvgInlinePlugin);
//app.use(router);

app.mount('#app');
