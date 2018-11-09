import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: _import('home'),
    name: 'home',
    meta: { title: '胖虎商城' }
  },
  {
    path: '/login',
    component: _import('login'),
    name: 'login',
    meta: { title: '登录' }
  },
  {
    path: '/topic',
    component: _import('topic/index'),
    name: 'topic',
    meta: { title: '专题' }
  },
  {
    path: '/goods/:id',
    component: _import('goods/index'),
    name: 'goodsDetail',
    meta: { title: '商品详情' }
  },
  {
    path: '/goods/:id/balance',
    component: _import('goods/balance'),
    name: 'goodsBalance',
    meta: { title: '付款' }
  },
  {
    path: '/shop',
    component: _import('shop/index'),
    name: 'shop',
    meta: { title: '胖虎优选' }
  },
  {
    path: '/mine',
    component: _import('user/index'),
    name: 'mine',
    meta: { title: '个人中心' }
  },
]

export default new Router({
  //mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})