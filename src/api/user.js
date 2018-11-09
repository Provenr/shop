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
//  资金明细
export function myAccount(data) {
  return post('/Myaccount/moneyDetail', data)
}
//  商品详情
export function goodsDetail(data) {
  return post('/Goods/goodsDetailtop', data)
}