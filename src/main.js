import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import VConsole from 'vconsole'
// const vConsole = new VConsole()

import '@/assets/custom.css'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: './static/img/back_loading.png',
  loading: './static/img/back_loading.png'
})

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

//import './permission'

Vue.config.productionTip = false

new Vue({
  el: '#root',
  router,
  store,
  components: { App },
  template: '<App/>'
})
