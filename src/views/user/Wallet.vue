<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="$router.back(-1)">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{title}}</div>
    </header>

    <div class="content">
      <scroller :on-infinite="infinite" :noDataText="noDataTxt" ref="my_scroller" style="padding-top:2.25rem">
        <div class="wallet-info">
          <div class="wallet-info-wrapper">
            <div class="wallet-wrapper">
              <div class="balance fz80">{{balance}}</div>
              <div class="my-wallet f28" style="color:#fff">账户余额(元)</div>
            </div>
            <div class="wallet-exchange f28" @click="exchange()">
              <i class="iconfont icon-qiandai"></i>
              提现
            </div>
          </div>
        </div>

        <div class="title fb f30" ref="tit">资金明细</div>

        <div class="consume-list-wrapper">
          <div class="consume-item" v-for="(list,index) in lists" :key="index">
            <div class="item-top">
              <div class="name fb">{{list.remark}}</div>
              <div class="num fz30">{{list.symbol}}{{list.trand_amt}}</div>
            </div>
            <div class="item-date">
              {{list.datetime}}
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import tips from '@/utils/tip'
import { myAccount } from '@/api/user'
export default {
//   components: {
//     Header,
//     Menu`
//   },
  data() {
    return {
      title: "我的钱包",
      balance: 0,// 余额
      userinfo: {
        nickname: "",
        head: "http://7xl1gc.com2.z0.glb.qiniucdn.com/1526613328789.304932"
      },
      wrapperHeight: 0,
      lists: [],
      page:1,
      noDataTxt: '已全部加载',
    };
  },
  methods: {
    makecall: function() {
      location.href='tel:400-086-5285'
    },
    exchange: function(){
      tips.confirm('下载胖虎奢侈品APP进行提现').then(() => {
        window.location.href = "https://www.ponhu.cn/shouji.html?plg_nld=1&plg_uin=1&plg_auth=1&plg_usr=1&plg_vkey=1&plg_dev=1";
      }).catch(() => {})
    },
    getData(refresh) {
      let _this = this;
      myAccount(_this.page).then(res => {
        _this.balance = res.account

        // 商品
        let glist = res.list;
        let _glist = [];
        if(glist) {
          // glist.forEach(function (item) {
          //   _glist.push({
          //     goodsId: item.id,
          //     img: item.goods_images,
          //     name: item.goods_name,
          //     status: item.is_discount,
          //     price: item.ph_price,
          //     del: item.original_price
          //   });
          // });
          if (refresh) {
            _this.lists = glist;
          } else {
            _this.lists = [..._this.lists, ...glist];
          }
          this.noData = false;
        }
        else {
          this.noData = true;
        }
        tips.loaded()
      });
    },
    infinite: function (done) {
      if(this.noData) {
        this.$refs.my_scroller.finishInfinite(true);
        return;
      }
      let _this = this
      setTimeout(function () {
        _this.page++;
        _this.getData();
        done();
      }, 1000)
    }
  },


  mounted(){
    let _this = this;
    _this.title = this.$route.meta.title;
    tips.loading();
    _this.getData(true)
  }
}
</script>
<style lang="less" scoped>
  .wallet-info{
    background: #fff;
    padding: 1.75rem 0.8rem 1.25rem;
    .wallet-info-wrapper{
      margin: 0 auto;
      background: url('/static/img//me_wallet_bg.png') no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      // width: 17.125rem;
      height: 8.7rem;
      position: relative;
      color: #ffffff;
      .wallet-wrapper{
        position: absolute;
        top: 4rem;
        left: 0.75rem;
        margin-bottom: .3rem
      }
      .wallet-exchange{
        position: absolute;
        top: 5.5rem;
        right: 0.75rem;
        width: 4.4rem;
        height: 1.25rem;
        line-height: 1.25rem;
        text-align: center;
        border: 1px solid #ffffff;
        border-radius: 0.625rem;
      }
    }
  }
.consume-list{
  background: #ffffff;
  margin-top: 0.6rem;
  width: 100%;
  min-height: 7.6rem;
  height: auto;
}
.page-loadmore{
  overflow: scroll;
  margin-top: 1rem;
}
.title{
  height: 2.45rem;
  line-height: 2.45rem;
  padding-left: 0.75rem;
  background: #fff;
}
.consume-list-wrapper{
  overflow-y: scroll;
  // min-height: 40vh;
  // height: 100vh;
  background: #fff;
  // position: relative;
  .consume-item{
    font-size: 0.6rem;
    padding: 0 .75rem;
    height: 3.25rem;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    // align-items: center
    justify-content: space-around;
    .item-top{
      display: flex;
      justify-content: space-between;
      .num{
        color: #00b7f7;
      }
    }
  }
}
</style>



