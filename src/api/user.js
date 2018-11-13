import { post, get } from '@/utils/request'

// 登录
export function login(data) {
  return post('/User/quicklyLogin', data)
}
// 发送短信验证码
export function sendVCode(data) {
  return post('/User/Sendcode', data)
}
// 获取用户信息
export function getUserInfo() {
  return post('/Myhome/getUserInfo')
}
// 获取默认用户地址
export function getUserDefaultAddress() {
  return post('/Myaddress/getDefaultAddress')
}
// 获取地址信息
export function getAddress(aid) {
  return post('/Myaddress/getAddr', { aid: aid })
}

//  资金明细
export function myAccount(data) {
  return post('/Myaccount/moneyDetail', data)
}

