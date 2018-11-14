import { post, get } from '@/utils/request'

// 获取首页专场合计数据
export function getSpecialSum() {
  return post('/Ccbshop/brand_zt')
}

// 获取首页专场集合
export function getSpecialList() {
  return post('/Ccbshop/index_xhlist')
}

// 获取首页专场商品
export function getSpecialGoodsList(data) {
  return post('/Ccbshop/xhlisht_goods', data)
}

// 设置专场提醒
export function setSpecialRemind(data) {
  return post('Ccbshop/remind', data)
}
