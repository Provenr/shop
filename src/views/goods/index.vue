<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" href="javascript:;" @click="back">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{$route.meta.title}}</div>
    </header>
    <div class="ph-scroller">
      <scroller style="padding-top:2.25rem;">
        <div class="img-lb">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(banner, index) in banners" :key="index">
              <img :src="banner" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="swiper-cart" @click="goCart">
            <img src="static/img/cart.png" alt="">
          </div>
        </div>
        <div class="ph-goods-detail">
          <div class="down_con" v-if="isdown">限时特卖 {{down_time}}</div>
          <div class="detail_price">
            <span class="price">￥{{isdown?goods.discount_price:goods.ph_price}}</span>
            <span class="yuanjia" v-if="isdown">原价:￥{{goods.ph_price}}</span>
            <span class="market" v-if="goods.original_price">市场价:￥{{goods.original_price}}</span>
            <span v-if="goods.zhekou>0">{{goods.zhekou}}折</span>
          </div>
          <div class="ph-detail-item-line"></div>
          <div class="goods_name">{{goods.goods_name}}</div>
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-goods-servie">
          <span class="title">服务</span>
          <span class="item_list">
            <span class="item"><i>•</i>低价保证</span>
            <span class="item"><i>•</i>100%正品</span>
            <span class="item"><i>•</i>专业鉴定</span>
            <span class="item"><i>•</i>5天包退</span>
          </span>
          <span class="ck-service" @click="showService=true"><i class="iconfont icon-select"></i></span>
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-goods_info">
          <div class="ph-goods-box-title">商品参数</div>
          <div class="info">
            <div class="item" v-for="(item, index) in goodsAttrs" :key="index">
              <span class="l">{{item.pname}}</span>
              <span>{{item.pval}}</span>
            </div>
          </div>
        </div>
        <div class="ph-nav-gap" v-if="goods.brand_desc!=''"></div>
        <div class="ph-goods_brand" v-if="goods.brand_desc!=''">
          <div class="ph-goods-box-title ph-mr30">品牌故事</div>
          <div class="s_img">
            <img :src="goods.brand_img">
          </div>
          <p class="s_con">{{goods.brand_desc}}</p>
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-goods_tp">
          <div class="ph-goods-box-title ph-mr30">交易流程</div>
          <img src="static/img/goods-jylc.png" alt="">
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-goods_detail">
          <div class="ph-goods-box-title">商品详情</div>
          <div class="img-list">
            <img v-lazy="item" v-for="(item, index) in goods.img_src" :key="index" alt="">
          </div>
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-goods_live">猜你喜欢</div>
        <div class="ph-goods_list">
          <goods-list :list="goodsList"></goods-list>
        </div>
      </scroller>
    </div>

    <div v-transfer-dom>
      <popup v-model="showService" position="bottom">
        <div class="ph-service-popup">
          <div class="title">服务说明</div>
          <div class="content">
            <h5>泰康保真</h5>
            <p>在胖虎线上购买并经胖虎奢侈品鉴定发到用户手中的商品，经第三方或中检国检鉴定不是正品的，（胖虎防伪标签，鉴定证书，都在的情况下）胖虎会给您办理退款并赔偿商品价格20%的赔偿款。</p>
            <h5>专业鉴定</h5>
            <p>胖虎拥有强大的资深鉴定师团队，中国二手奢侈品行业协会专业鉴定委员会授权中心，中检集团奢侈品鉴定中心战略合作协议，《时尚芭莎》官方鉴定和售后服务合作伙伴。</p>
            <h5>5天包退</h5>
            <p>收到胖虎奢侈品公司发给您的商品后，如对商品有真假质疑，请不要拆卸胖虎奢侈品正品保证防伪标签，可联系客服进行第三方检验中心检验。</p>
            <a type="button" class="button" @click="showService=false">确认</a>
          </div>
        </div>
      </popup>
    </div>
    <div style="height: 2.5rem;"></div>
    <div class="ph-goods-bar">
      <div class="button-box">
        <!-- <a href="tel:4000865285" class="item">
          <i class="iconfont icon-message"></i>
          <div class="doc">咨询</div>
        </a> -->
        <router-link :to="'/onlineservice?url='+$router.history.current.fullPath" class="item">
          <i class="iconfont icon-message"></i>
          <div class="doc">咨询</div>
        </router-link>
        <a class="button" @click="addcart" v-if="goods.goods_status==1">加入心愿单</a>
        <a class="button" @click="tobalance" v-if="goods.goods_status==1">立即购买</a>
        <a href="javascript:;" class="onbutton" v-if="goods.goods_status==2||goods.goods_status==4">已售罄</a>
      </div>
    </div>

  </div>

</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { TransferDom, Popup } from 'vux'

import { getGoodsInfo, addShoppingCart } from '@/api/goods'
import { verIdentical } from '@/api/order'
import { secTotime } from '@/utils'
import tips from '@/utils/tip'

import GoodsList from '@/components/GoodsList'

export default {
  name: 'goodsDetail',
  directives: { TransferDom },
  components: {
    swiper,
    swiperSlide,
    Popup,
    GoodsList
  },
  data() {
    return {
      banners: [],  //'static/img/back_loading.png'
      swiperOption: {
        pagination: {
          el:'.swiper-pagination'
        },
        loop:true
        //autoHeight: true
      },
      goodsid: this.$route.params.id,
      goods: {},
      goodsAttrs: [],
      goodsList: [],
      isdown: false,
      down_time: '',
      toUrl: process.env.WAP_URL,
      showService: false
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  created() {
    this.getData()
  },
  methods: {
    back() {
      this.$router.push({ path: this.$route.query.url });
    },
    // 获取数据
    getData() {
      let that = this;
      tips.loading();
      getGoodsInfo(this.goodsid).then(res => {
        this.goods = res.list;
        this.goodsid = res.list.id;
        this.banners = this.goods.img_src;
        this.goodsAttrs = res.canshu;
        // 猜你喜欢
        let lives = res.recommend;
        lives.forEach(function (item) {
          that.goodsList.push({
            goodsId: item.id,
            img: item.goods_images,
            name: item.goods_name,
            status: item.is_discount,
            price: item.is_discount==0?item.goods_price:item.discount_price,
            del: item.goods_price,
            shelevs_type: item.shelevs_type
          });
        });

        if(this.goods.down_time) { // 处理倒计时
          this.isdown = true;
          let s = parseInt(this.goods.down_time);
          var timer = setInterval(function () {
            s--
            if (s > 0) {
              that.down_time = secTotime(s)
            } else {
              that.isdown = false;
              clearInterval(timer)
            }
          }, 1000);
        }
        tips.loaded();
      });
    },
    // 结算
    tobalance() {
      if(this.goods.goods_status == "4") {
        tips.alert("该商品已被别人拍下，如果买家20分钟内未付款，您就可以购买该商品了")
      } else {
        if (this.token) {
          //this.$router.push({ path: "/goods/"+this.$route.params.id+"/balance" })
          // 验证签名
          
          let that = this;
          let jh_obj = window.localStorage.getItem('CCBSINGNMODEL');
          verIdentical(JSON.parse(jh_obj)).then(res => {
            if (res.is_fromjh == 1) {
              location.href = this.toUrl + '/pages/mine/shoplist/balance.html?flag=info&gid=' + this.goodsid;
            } else {
              var dialog = new auiDialog({})
              dialog.alert({
                title: '温馨提示',
                msg: '建行登录失效，需先登录建行APP才能享受活动优惠',
                buttons: ['去登录', '原价购买']
              }, function (ret) {
                if (ret.buttonIndex == 2) {
                  location.href = that.toUrl + '/pages/mine/shoplist/balance.html?flag=info&gid=' + that.goodsid;
                }
              })
            }
          }).catch(error => {
            tips.alert(error)
          });
          
        }else{
          this.$router.replace({ path: "/login" })
        }
      }
    },
    // 加入心愿单
    addcart() {
      if (this.token) {
        tips.loading();
        addShoppingCart(this.$route.params.id).then(res => {
          tips.loaded();
          tips.toast("添加成功！");
        }).catch(error => {
          tips.loaded();
          tips.alert(error)
        });
      }
      else {
        this.$router.replace({ path: "/login" })
      }
    },
    goCart() {
      this.$router.push({path: '/goods/balance/cart', query: {url: this.$router.history.current.fullPath , flag:'info'}})
    }
  },
  watch: {
    '$route' (to, from) {
      this.goods = {};
      this.goodsList.splice(0, this.goodsList.length);
      this.banners.splice(0, this.banners.length);
      this.getData();
    }
  }
}
</script>

<style lang="less" scoped>
.ph-goods-detail {
  margin: 0 auto;
  background-color: #fff;
  .detail_price {
    padding: 1.25rem .75rem .75rem;
    color: #959595;
    font-size: .55rem;
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
  .img-lb {
    position:relative;
  }
}
.swiper-cart {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  img {
    position: absolute;
    color: #fff;
  }
}
.down_con {
  height: 1.5rem;
  line-height: 1.5rem;
  width: 100%;
  background-color: #09B6F2;
  text-align: center;
  color: #fff;
  font-size: .6rem;
}
.ph-goods-servie {
  padding: .5rem .75rem .45rem;
  background-color: #fff;
  font-size: .6rem;
  line-height: 1rem;
  .title {
    color: #888888;
    font-weight:500;
    padding-right: 0.3rem;
  }
  .item_list {
    color: #1B1B1B;
    font-weight:500;
    .item {
      padding-right: .3rem;
      i {
        color: #F8B947;
        font-size: 1rem;
        vertical-align: sub;
        padding-right: .3rem;
      }
    }
  }
  .ck-service {
    float: right;
    i {
      font-size: .8rem;
      color: #888888;
    }
  }
}
.ph-service-popup {
  padding: 0 .75rem;
  background-color: #fff;
  .title {
    text-align: center;
    height:2.5rem;
    font-size:.85rem;
    font-weight:bold;
    color:#333333;
    line-height:2.5rem;
  }
  .content {
    color: #333333;
    font-size: .7rem;
    padding-bottom: 1rem;
    h5 { font-weight:bold; padding-bottom: .4rem; }
    p { padding-bottom: 1rem; }
    .button {
      background-color: #fff;
      border:1px solid #09B6F2;
      border-radius:1rem;
      color: #09B6F2;
      font-size: .75rem;
      width: 13rem;
      margin-left: .75rem;
      display:block;
      margin:0 auto;
      text-align: center;
      padding: 0.4rem 0;
    }
  }
}
.vux-popup-dialog {
  z-index: 1002;
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
    font-size: .6rem;
    line-height: .8rem;
  }
}
.ph-goods_tp {
  background-color: #fff;
}

.ph-goods_detail {
  background-color: #fff;
  padding-left: .75rem;
  .img-list {
    padding-top: .75rem;
    padding-right: .75rem;
    padding-bottom: .75rem;
    img {
      margin-bottom: .25rem;
    }
  }
}

.ph-goods_live {
  background-color: #fff;
  font-size: .7rem;
  text-align: -webkit-left;
  font-weight:bold;
  line-height:1rem;
  padding: .75rem .75rem .7rem;
}
.bar-bottom {
  bottom: 2.5rem;
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
    margin-right: .8rem;
    .item {
      flex: 1;
      text-align: left;
      color: #333333;
      padding-left: .6rem;
      line-height: 1rem;
      i {
        font-size: 1rem;
        padding-left: .2rem;
      }
      .doc {
        font-size: .4rem;
      }
    }
  }
  .button {
    background-color: #fff;
    height:2rem;
    border:1px solid #09B6F2;
    border-radius:1rem;
    color: #09B6F2;
    font-size: .75rem;
    width: 5.75rem;
    margin-left: .75rem;
  }
  .onbutton {
    background-color: #fff;
    height:2rem;
    border:1px solid #666666;
    border-radius:1rem;
    color: #666666;
    font-size: .75rem;
    width: 5.75rem;
    margin-left: .75rem;
  }
  a {
    line-height:1.8rem;
    text-align: center;
  }
}
.ph-goods_list {
  padding: 0 .45rem 6rem;
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

