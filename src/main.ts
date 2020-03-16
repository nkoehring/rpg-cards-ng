import './class-component-hooks'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './registerServiceWorker'

import StorageHandler from './storage'

declare module 'vue/types/vue' {
  interface Vue {
    $storage: StorageHandler;
  }
}

Vue.config.productionTip = false
Vue.prototype.$storage = new StorageHandler()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
