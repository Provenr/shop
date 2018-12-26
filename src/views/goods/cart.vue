<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" href="javascript:;" @click="back" v-if="!showTab">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{$route.meta.title}}</div>
    </header>
    <div class="ph-scroller" v-if="!empty">
      <scroller>
        <div class="cart_list">
          <div class="list_box" v-for="(item,index) in goodsList" :key="index" @click="toInfo(item.id)">
            <swipe-del :swipeData="item" @delItem="handleDelItem">
              <div class="goods-info">
                <label><input class="aui-radio icon_check" type="checkbox" v-model="item.checked" @click.stop="selectTap" /></label>
                <div class="img-box">
                  <img :src="item.goods_images + '?imageView2/1/w/300/h/300'" />
                </div>
                <div class="text-box">
                  <div class="goods-title">{{item.goods_name}}</div>
                  <div class="goods-price">￥{{item.ph_price}}</div>
                </div>
              </div>
            </swipe-del>
            <div class="item-line"></div>
          </div>
        </div>
        <div class="sold-list" v-if="soldGoodsList.length > 0">
          <div class="title">以下商品无法购买</div>
          <div class="cart_list">
            <div class="list_box" v-for="(item,index) in soldGoodsList" :key="index" @click="toInfo(item.id)">
              <swipe-del :swipeData="item" @delItem="handleDelItem">  
                <div class="goods-info">
                  <div class="img-box">
                    <img :src="item.goods_images + '?imageView2/1/w/300/h/300'" />
                    <div class="pos">已售罄</div>
                  </div>
                  <div class="text-box">
                    <div class="goods-title">{{item.goods_name}}</div>
                    <div class="goods-price">￥{{item.ph_price}}</div>
                  </div>
                </div>
              </swipe-del>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div :style="showTab?'height: 5rem;':'height: 2.5rem;'"></div>
    <div class="ph-goods-bar" :class="showTab?'bar-botton':'bar-botton-mr'" v-if="!empty">
      <div class="left-del">
        <div @click="selectAll" class="all_select_box">
          <label><input class="aui-radio icon_check" v-model="allChecked" type="checkbox"></label>
          <div class="all_select">全选</div>
        </div>
      </div>
      <a class="btn" @click="balance">去结算</a>
    </div>
    <div v-if="empty" class="empty">
      <div class="empty-box">
        <img src="static/img/empty-icon.png" alt="">
      </div>
      暂无心愿单商品~
    </div>
    <tab-nav :active="'cart'"></tab-nav>
  </div>
</template>

<style lang="less" scoped>
.empty{
  text-align: center;
  color: #888;
  .empty-box{
    margin-bottom: .5rem;
    img{
      width: 6rem;
      margin: 0 auto 1rem
    }
  }
}
.cart_list {
  .list_box {
    background: #ffffff;
    .goods-info {
      display:flex;
      padding: .75rem;
      position:relative;
      border-bottom: 1px solid #EEEEEE;
      .icon_check { 
        position: absolute;
      }
      .img-box {
        width: 3.5rem;
        margin-right: .75rem;
        background-color: #ffffff;
        margin-left: 1.7rem;
        position:relative;
        img {
          width: 3.5rem;
        }
        .pos {
          position: absolute;
          background: rgba(0, 0, 0, 0.2);
          display: block;
          left: 0;
          right: 0;
          bottom: 0;
          height: .75rem;
          color: #EEEEEE;
          font-size: .5rem;
          text-align: center;
        }
      }
      .text-box {
        width: 12rem;
        .goods-title {
          font-size: .6rem;
          color: #666666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: left;
          line-height: 1.3;
        }
        .goods-price {
          flex:1;
          position:absolute;
          bottom:.55rem;
          font-size:.65rem;
          font-weight:bold;
          color:#333;
          line-height:1rem;
        }
      }
    }
  }
  .item-line {
    border-bottom: 1px solid #E6E6EE;
  }
}
.sold-list {
  .title {
    color: #666666;
    font-size: .65rem;
    padding: .4rem .75rem;
  }
}
.bar-botton {
  bottom: 2.5rem;
}
.bar-botton-mr {
  bottom: 0;
}
.ph-goods-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2.4rem;
  position: fixed;
  left: 0;
  background: #fff;
  border-top: 1px solid #ebebeb;
  .left-del {
    width: 11.25rem;
    display: flex;
    justify-content: space-between;
    padding: 0 .75rem;
    font-size: .7rem;
    color: #333333;
    box-sizing: border-box;
    align-items: center;
    .all_select_box {
      width: 3.75rem;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .all_select {
      flex: 1;
      padding-left: .75rem;
    }
  }
  .btn {
    background-color: #09B6F2;
    border-radius:.375rem;
    color: #fff;
    font-size: .7rem;
    width: 4.5rem;
    margin: .325rem .75rem;
    display:block;
    text-align: center;
    height: 1.75rem;
    line-height: 1.75rem;
  }
}
.aui-radio, .aui-checkbox {
  width: 1rem;
  height: 1rem;
  top: 40%;
}
</style>

<script>
import { getShoppingCartList, delShoppingcart, getGoodsPays } from '@/api/goods'
import SwipeDel from '@/components/swipe_del'
import TabNav from "@/components/TabNav"

import tips from '@/utils/tip'

export default {
  name: 'shopingCart',
  components: { SwipeDel, TabNav },
  data() {
    return {
      empty: false,
      allChecked: false,
      goodsList: [],
      soldGoodsList: [],
      showTab: false,
      toUrl: process.env.WAP_URL
    }
  },
  created() {
    if(this.$route.query.flag == "tab") {
      this.showTab = true;
    } else {
      this.showTab = false;
    }
    this.getData()
  },
  methods: {
    back() {
      this.$router.push({ path: this.$route.query.url });
    },
    getData() {
      tips.loading();
      getShoppingCartList().then(res => {
        if(res.list) {
          this.goodsList = res.list.unsold;
          this.soldGoodsList = res.list.sold;
          this.empty = false;
        } else {
          this.empty = true;
        }
        tips.loaded();
      }).catch(error => {
        tips.loaded();
        tips.alert(error)
      });
    },
    toInfo(gid) {
      this.$router.push({name: 'goodsDetail', params: {id: gid}, query: { url: this.$router.history.current.fullPath } })
    },
    selectTap(i) {

    },
    selectAll() {
      for (var i = 0; i < this.goodsList.length; i++) {
        this.goodsList[i].checked = !this.allChecked;
      }
      this.allChecked = !this.allChecked;
    },
    handleDelItem(item) {
      delShoppingcart(item.cart_id).then(res => {
        this.getData()
      }).catch(error => {
        tips.loaded();
        tips.alert(error)
      });
    },
    balance() {
      let ids = "";
      for (var i = 0; i < this.goodsList.length; i++) {
        if(this.goodsList[i].checked) {
          ids += this.goodsList[i].id + ','
        }
      }
      if(ids == "") {
        tips.alert("请选择要结算的商品")
        return;
      }
      ids = ids.substr(0, ids.length-1);
      location.href = this.toUrl + '/pages/mine/shoplist/balance.html?flag=cart&gid=' + ids;
    }
  }
}
</script>

