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

Vue.directive('editable', (el, { value, arg }, vnode) => {
  el.contentEditable = value ? 'true' : 'false'
  el.addEventListener('keypress', event => {
    // allow line break via Shift + Enter
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      console.log('edit event on enter', el.innerText)
      if (!vnode.context) return
      vnode.context.$emit('edit', { param: arg, value: el.innerText })
    }
  })
  el.addEventListener('blur', () => {
    console.log('edit event on blur', el.innerText)
    if (!vnode.context) return
    vnode.context.$emit('edit', { param: arg, value: el.innerText })
  })
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
