import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/assets/custom.css'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: './static/img/back_loading.png',
  loading: './static/img/back_loading.png'
})

//import './permission'


Vue.config.productionTip = false

new Vue({
  el: '#root',
  router,
  store,
  components: { App },
  template: '<App/>'
})
