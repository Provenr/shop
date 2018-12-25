import { post, get } from '@/utils/request'

// 获取专题
export function getTopicInfo(tid, page) {
  return post('/Index/showSpecail', { sid: tid, p: page })
}
// 获取首页专题
export function getHomeTopicInfo(tid, page, row='') {
  return post('/Homepage/showSpecail', { sid: tid, p: page, row: row })
}

// 获取商品详情
export function getGoodsInfo(gid) {
  return post('/Goods/ccbgoodsDetailtop', { goodsid: gid })
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

// 添加购物车
export function addShoppingCart(gid) {
  return post('/Shoppingcart/addShoppingCart', { goodsid: gid })
}
// 购物车列表
export function getShoppingCartList() {
  return post('/Shoppingcart/ShoppingCartLists')
}
// 删除购物车
export function delShoppingcart(ids) {
  return post('/Shoppingcart/delOneGoods', { cart_id: ids })
}
// 去结算
export function getGoodsPays(ids) {
  return post('/Shoppingcart/goSettlement', { goodsid: ids })
}
// 立即购买
export function getGoodsPay(gid) {
  return post('/Shoppingcart/goSettlementOne', { goodsid: gid })
}

//  胖虎优选
export function getOptimalGoods(option, page) {
  return post('/Goods/zyindex', 
  { 
    storeid: option.storeid,
    cateid: option.secondCategoryId, 
    brandid: option.brandId, 
    order: option.sortType, 
    priceflag: option.filterPrice,
    people: option.filterGender,
    colour: option.filterFineness,
    p: page
  })
}