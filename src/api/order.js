import { post, get } from '@/utils/request'

// 创建订单
export function createOrder(data) {
  return post('/Createorder/createOrder', data)
}

// 订单列表
export function myOrder(data) {
  return post('/Myorder/getOrderList', data)
}

// 获取订单详情
export function getOrder(oid) {
  return post('/Myorder/orderDetail', { order_id: oid })
}

// 立即支付
export function orderPay(data) {
  return post('/Createorder/nowGopay', data)
}




