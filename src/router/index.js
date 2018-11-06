import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login'),
    name: 'login',
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: _import('home'),
    name: 'home',
    meta: { title: '胖虎商城' }
  },
  {
    path: '/cart',
    component: _import('shop/index'),
    name: 'cart',
    meta: { title: '心愿单' }
  },
  {
    path: '/mine',
    component: _import('user/index'),
    name: 'mine',
    meta: { title: '个人中心' }
  },
  {
    path: '/topic',
    component: _import('topic/index'),
    name: 'topic',
    meta: { title: '专题' }
  },
]

export default new Router({
  //mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})