<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="back">
        <span class="iconfont icon-leftarrow"></span>
      </a>
      <div class="aui-title">{{$route.meta.title}}</div>
    </header>
    <div class="ph-detail">
      <swiper :options="swiperOption" style="height:100%;">
        <swiper-slide v-for="(banner, index) in banners" :key="index">
          <img :src="banner" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="detail_price">
        <span class="price">￥7500</span>
        <span class="yuanjia">原价:￥35000</span>
        <span class="market">市场价:￥35000</span>
        <span>4.7折</span>
      </div>
      <div class="ph-detail-item-line"></div>
      <div class="goods_name">FENDI/芬迪【2018新款】男士女士小牛皮小怪兽手拿包手包男士女士小牛皮小怪兽手拿包</div>
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-servie">
      <span class="title">服务</span>
      <span class="item_list">
        <span class="item"><i>•</i>低价保证</span>
        <span class="item"><i>•</i>100%正品</span>
        <span class="item"><i>•</i>专业鉴定</span>
        <span class="item"><i>•</i>5天包退</span>
      </span>
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-goods_info">
      <div class="ph-goods-box-title">商品参数</div>
      <div class="info">
        <div class="item">
          <span class="l">商品编码</span>
          <span>ZHGODCKJVDLLD 087490</span>
        </div>
        <div class="item">
          <span class="l">商品品牌</span>
          <span>CELINE 塞林</span>
        </div>
        <div class="item">
          <span class="l">适用人群</span>
          <span>女士</span>
        </div>
        <div class="item">
          <span class="l">成色</span>
          <span>9新</span>
        </div>
        <div class="item">
          <span class="l">材质</span>
          <span>皮质</span>
        </div>
        <div class="item">
          <span class="l">购买日期</span>
          <span>2018-11-11</span>
        </div>
      </div>
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-goods_brand">
      <div class="ph-goods-box-title ph-mr30">品牌故事</div>
      <div class="s_img">
        <img src="https://m.ponhu.cn/Uploads/./goods/logo/2016-06-12/575d33e55e8be.jpg">
      </div>
      <p class="s_con">
        香奈儿品牌,秉承创始人嘉柏丽尔•香奈儿女士划时代的创新理念与前瞻创意,成为现代女性美学的风向标。无论时尚精品、香水与美容品、腕表与高级珠宝,都致力于为女性塑造自由、优雅、与众不同的风格。
      </p>
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-goods_tp">
      <div class="ph-goods-box-title ph-mr30">交易流程</div>
      <img src="/static/img/goods-jylc.png" alt="">
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-goods_detail">
      <div class="ph-goods-box-title">商品详情</div>
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-goods_live">猜你喜欢</div>

    <div class="ph-goods-bar">
      <div class="button-box">
        <input type="button" class="button" value="咨询">
        <input type="button" class="button" value="立即支付">
      </div>
    </div>
  </div>
  
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'goodsDetail',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      banners: [ 'https://img-ppcdn.ponhu.cn/Fm3uj4YHAGNz4EKozA8XkSmFXOd3?imageView2/1/w/750/h/625', 'https://img-ppcdn.ponhu.cn/FnNTGLkdlUurI8wOG5vbdwPmF4B8?imageView2/1/w/750/h/625', 'https://img-ppcdn.ponhu.cn/Frc5_POEscU1Ot6TPcBpbNkKOaw6?imageView2/1/w/750/h/625'],
      swiperOption: {
        pagination: {
          el:'.swiper-pagination'
        },
        loop:true
      }
    }
  },
  mounted() {
  },
  methods: {
    // 返回
    back() {

    }
  },

}
</script>

<style lang="less" scoped>
.ph-detail {
  position: relative;
  padding: 0;
  background-color: #fff;
  .detail_price {
    padding: 1.25rem .75rem .75rem;
    color: #959595;
    font-size: .45rem;
    .price {
      font-weight: 700;
      font-size: .85rem;
      color: #F05859;
      padding-right: 5%;
    }
    .yuanjia {
      text-decoration: line-through;
      padding-right: 3%;
    }
    .market {
      padding-right: 3%;

    }
  }
  .goods_name {
    padding: .875rem .75rem 1rem;
    font-weight: 500;
    color: #4C4C4C;
    font-size: .65rem;
    line-height: 1rem;
  }
}
.ph-servie {
  padding: .5rem .75rem .45rem;
  background-color: #fff;
  font-size: .6rem;
  vertical-align: middle;
  line-height: 1rem;
  .title {
    color: #888888;
    font-weight:500;
    vertical-align: middle;
    padding-right: 0.3rem;
  }
  .item_list {
    color: #1B1B1B;
    font-weight:500;
    .item {
      padding-right: .5rem;
      vertical-align: middle;
      i {
        color: #F8B947;
        font-size: 1rem;
        vertical-align: sub;
        padding-right: .3rem;
      }
    }
  }
}
.ph-goods_info {
  padding-left: .75rem;
  background-color: #fff;
  .info {
    color: #394043;
    font-size: .65rem;
    padding-top: 1rem;
    .item {
      padding-bottom: .8rem;
      .l {
        text-align: -webkit-left;
        width: 4rem;
        display:-moz-inline-box;
        display:inline-block; 
      }
    }
  }
}
.ph-goods_brand {
  background-color: #fff;
  .s_img {
    display: flex;    
    justify-content:center;
    align-items:Center;
    padding: 1rem 0;
    img {
      height: 3.75rem;
      width: 3.75rem;
    }
  }
  .s_con {
    padding: 0 .75rem .75rem;
    color: #1B1B1B;
    font-size: .55rem;
    line-height: .8rem;
  }
}
.ph-goods_tp {
  background-color: #fff;
}

.ph-goods_detail {
  background-color: #fff;
  padding-left: .75rem;
}

.ph-goods_live {
  background-color: #fff;
  font-size: .7rem;
  text-align: -webkit-left;
  font-weight:bold;
  line-height:1rem;
  padding: .75rem .75rem .7rem;
}

.ph-goods-bar {
  width: 100%;
  height: 3rem;
  position: fixed;
  bottom: 0;
  background: #fff;
  margin:0px;
  z-index: 1001;
  .button-box{
    display: flex;
    height: 3rem;
    align-items: center;
    justify-content: flex-end;
    margin-right: 1.2rem;
  }
  .button {
    background-color: #fff;
    height:2rem;
    border:2px solid #09B6F2;
    border-radius:1rem;
    color: #09B6F2;
    font-size: .75rem;
    width: 5.75rem;
    margin-left: .75rem;
  }
}

.ph-detail-item-line {
  border-bottom: 1px solid #E8E8E8;
  margin: 0 .75rem;
}
.ph-goods-box-title {
  border-bottom: 1px solid #E8E8E8;
  font-size: .7rem;
  text-align: -webkit-left;
  font-weight:bold;
  line-height:1rem;
  padding: .75rem 0 .7rem;
}
</style>

