import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vee-validate'
import App from './App.vue'
import router from './router/'
import store from './store/'
import './registerServiceWorker'
import '@/constants/prototypes'
import i18n from './i18n'
import './filters/date-format'
import './filters/currency-format'
import '@components/_globals'
// import { createProvider } from './vue-apollo'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  router,
  store,
  i18n,
  // apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app')
