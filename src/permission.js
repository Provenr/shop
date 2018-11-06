import router from './router'
import store from './store'

import { getUser, removeUser } from '@/utils/auth'

//白名单
const whiteList = ['/login']

// 路由钩子
router.beforeEach((to, from, next) => {
  //检查是否有token授权
  if (store.getters.token) {
    if (to.path === '/login') {
      next()
    }
    else {
      // 获取用户ID
      let uid = getUser()
      if (uid) {
        if (store.getters.userId) {
          next()
        }
        else {
          store.dispatch('SetUser', uid).then(() => { // 设置用户信息
            next()
          }).catch(() => {
            store.dispatch('LogOut').then(() => {
              next({ path: '/login' })
            })
          })
        }
      }
      else {
        next({ path: '/login' })
      }
    }
  }
  else {
    removeUser() // 移除用户缓存
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
    }
  }
})