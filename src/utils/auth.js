import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils'

const TokenKey = 'PH_ACCOUNT_TOKEN'
const UserKey = 'PH_ACCOUNT_USERCODE'

export function getToken() {
  return getLocalStorage(TokenKey)
}

export function setToken(token) {
  return setLocalStorage(TokenKey, token)
}

export function removeToken() {
  return removeLocalStorage(TokenKey)
}

export function getUser() {
  return getLocalStorage(UserKey)
}

export function setUser(uid) {
  return setLocalStorage(UserKey, uid)
}

export function removeUser() {
  return removeLocalStorage(UserKey)
}

// 适应旧版本页面
export function OldSetUserInfo(user) {
  
}