import { post, get } from '@/utils/request'

// 获取专题
export function getTopicInfo(tid, page) {
  return post('/Index/showSpecail', { sid: tid, p: page })
}

// 获取商品详情
export function getGoodsInfo(gid) {
  return post('/Goods/goodsDetailtop', { goodsid: gid })
}
// 获取品牌列表
export function getBrandList(gid) {
  return post('/Homepage/getbrand', { })
}
// export function getBrandList(gid) {
//   return post('/Newhome/newcategory', { })
// }
// 一级分类
export function getFirstCate(gid) {
  return post('/Homepage/firstCate', { })
}

// 立即购买
export function getGoodsPay(gid) {
  return post('/Shoppingcart/goSettlementOne', { goodsid: gid })

}