import { login } from '@/api/user'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    uid: getUser()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_USERID: (state, uid) => {
      state.uid = uid
      setUser(uid)
    }
  },
  actions: {
    // 设置用户ID
    SetUser({ commit }, uid) {
      return new Promise(resolve => {
        commit('SET_USERID', uid)
        resolve()
      })
    },
    // 用户登录
    LoginByUser({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm).then(response => {
          commit('SET_TOKEN', response.list.token)
          commit('SET_USERID', response.list.user_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', null)
        commit('SET_USERID', null)
        removeToken()
        removeUser()
        resolve()
      })
    }
  }
}

export default user