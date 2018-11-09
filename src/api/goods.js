import { post, get } from '@/utils/request'

// 获取商品详情
export function getGoodsInfo(gid) {
  return post('/Goods/goodsDetailtop', { goodsid: gid })
}