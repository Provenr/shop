import { post, get } from '@/utils/request'

// 创建订单
export function createOrder(data) {
  return post('/Createorder/createOrder', data)
}
// 订单列表
export function myOrder(data) {
  return post('/Myorder/getOrderList', data)
}
