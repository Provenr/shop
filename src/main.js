import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/assets/custom.css'
// import './permission'

Vue.config.productionTip = false

new Vue({
  el: '#root',
  router,
  store,
  components: { App },
  template: '<App/>'
})
