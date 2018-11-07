<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">{{title}}</header>
    <section class="banner">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="https://img-zscdn.ponhu.cn/FsrUhU8lFrpki6bk1spi2ffuW0K5" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://img-zscdn.ponhu.cn/Fq8RQIk2pINFDmBAG7O7-em_HUsw" />
        </swiper-slide>
        <swiper-slide>
          <img src="https://img-zscdn.ponhu.cn/Fg00e_HsKjUWVjUcMG5yE6rv5_mv" />
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </section>
    <!-- 导航 -->
    <section class="aui-grid">
      <div class="aui-row">
        <div class="aui-col-xs-3 ph-home-nav-item">
            <i class="iconfont icon-shepinhuishou"></i>
            <div class="aui-grid-label">奢品回收</div>
        </div>
        <div class="aui-col-xs-3 ph-home-nav-item">
            <i class="iconfont icon-yanghuweixiu"></i>
            <div class="aui-grid-label">养护保养</div>
        </div>
        <div class="aui-col-xs-3 ph-home-nav-item">
            <i class="iconfont icon-zhaopianjianding"></i>
            <div class="aui-grid-label">图片鉴定</div>
        </div>
        <div class="aui-col-xs-3 ph-home-nav-item">
            <i class="iconfont icon-shiwujianding"></i>
            <div class="aui-grid-label">实物鉴定</div>
        </div>
      </div>
    </section>
    <section class="container home-topic-wrapper">
      <div class="left">
        <img src="/static/img/home-ziying.png" alt="">
      </div>
      <div class="right">
        <div>
          <img src="/static/img/home-shagnxin.png" alt="">
        </div>
        <div>
          <img src="/static/img/home-jianlou.png" alt="">
        </div>
      </div>
    </section>
    <!-- 限时抢购 -->
    <section class="home-sale-wrapper">
      <div class="time-list">
        <!-- <ul> -->
          <div :class="{active: index==1}" v-for="(item, index) in navlist" :key="index">
            <div>
              <span class="time fz32">{{item.time}}</span>
              <span class="status fz20">{{item.status}}</span>
            </div>
          </div>

        <!-- </ul> -->
      </div>
      <div class="img-title">
        <img src="/static/img/home-temai.png" alt="" srcset="">
        <div class="countdown-head-box">
          <strong class="shop-head-name fz34">
            限时抢购中
          </strong>
          <div class="shop-head-time">
            <span>{{xh_list.flag.day}}</span>
            <span>{{hour}}</span>
            <span>{{minute}}</span>
            <span>{{second}}</span>
          </div>
        </div>
      </div>
      <div class="good-list">
        <div v-for="item in goodsList" :key="item.goodsId" class="good-item" @click.stop='toGoodDetail(item.goodsId)'>
          <div class="good-img">
            <img :src="item.img" alt="">
          </div>
          <div class="good-info">
            <div class="aui-ellipsis-2 good-name fz26">{{item.name}}</div>
            <div class="good-price-wrapper">
              <div class="good-price-box">
                <span>¥{{item.price}}</span>
                <del>¥{{item.del}}</del>
              </div>
              <div class="btn defaut-btn fz26" v-if='item.status == 1' @click.self="toGoodDetail(item.goodsId)">马上抢</div>
              <div class="btn end-btn fz26" v-if='item.status == 2' @click.self="toGoodDetail(item.goodsId)">已售罄</div>
              <div class="btn defaut-btn fz26" v-if='item.status == 3' @click.self="toGoodDetail(item.goodsId)">购买</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name:'home',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      title:'胖虎商城',
      swiperOption: {
        pagination: {
          el:'.swiper-pagination',
          dynamicBullets: true
        },
        loop:true
      },
      navlist:[
        {time:'80:00',status:'浅沟中'},
        {time:'80:00',status:'浅沟中'},
        {time:'80:00',status:'浅沟中'},
        {time:'80:00',status:'浅沟中'},
        {time:'80:00',status:'浅沟中'},
        {time:'80:00',status:'浅沟中'},
      ],
      xh_list:{
        flag:{
          day:'距结束'
        }
      },
      hour: '00',
      minute: '50',
      second: '38',
      goodsList: [
        {
          goodsId: 453069,
          price: "7288",
          del: "13999",
          status:1,
          img: "https://img-ppcdn.ponhu.cn/Fr09uZEPaVVbxypQacKP8UIwILWv?imageView2/1/w/640/h/540",
          name: "98新香奈儿方胖子链条包98新香奈儿方胖子链条包98新香奈儿方胖子链条包9"
        },
        {
          goodsId: 290764,
          price: "6888",
          del: "10999",
          status:2,
          img: "https://img-ppcdn.ponhu.cn/Fr_Y0bqEcOsND9TUIAW1AV3ajAni?imageView2/1/w/640/h/540",
          name: "95新 LV老花邮差包LV老花邮差包LV老花邮差包L"
        },
        {
          goodsId: 456746,
          price: "8666",
          del: "11599",
          status:3,
          img: "https://img-ppcdn.ponhu.cn/Fj2dxeWanYPaDKDqbtksVMzem5oK?imageView2/1/w/640/h/540",
          name: "95新古驰Padlock两用包"
        }
      ]
    }
  },
  created () {
    document.addEventListener('click', this.handleClick)
  },
  mounted() {
    let _this = this;
    _this.title = this.$route.meta.title;
    console.log(this.$route)
    console.log(this.$route.title)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClick)
  },
   methods: {
    tabchange(name){
      let _this = this;
      _this.$router.push({ path: name });
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../node_modules/swiper/dist/css/swiper.css';

.aui-row{
  line-height: 1
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #09B6F2 !important
}
.aui-grid{
  padding: .3rem 0 !important;
}
.ph-home-nav-item{
  padding: 0;
}
.iconfont{
  font-size: 1.5rem;
}

.home-topic-wrapper{
  display: flex;
  margin: .6rem 0;
  padding-top: .8rem;
  padding-bottom: .8rem;
  .left{
    width: 8.375rem;
    height: 7.2rem;
    img{
      display: block;
      width: 8.375rem;
      height: 7.2rem;
    }
  }
  .right{
    width: 8.375rem;
    margin-left: .4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.home-sale-wrapper{
  margin: .6rem 0;
  box-sizing: border-box;
  .time-list{
    background: #fff;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    // ul{

      // height: 2.5rem;
    box-sizing: border-box;
    div{
      width: 3.6rem;
      height: 2.5rem;
      display: inline-block;
      z-index: 1111;
      padding:0.3rem;
      // div{
      //   // height: 2.5rem;

      //   width: 1.6rem;
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: center;
      //   align-items: center;
      //   margin: 0 auto;
      //   .time{

      //   }
      // }

      &.active {
        color: #FC2A3E;
        border-bottom: .1rem solid;
        // &::after{
        //   content: '';
        //   display: block;
        // }
      }
    }
    // }
  }
  .img-title{
    padding: .75rem;
    background: #fff;
    border-top: 1px solid #F7F7F7;
    .countdown-head-box{
      display: flex;
      justify-content: space-between;
      margin-top: .8rem;
      .shop-head-time{
        display: flex;
        align-items: center;
        font-size: 0.65rem;
        color: #666666;
        span{
          display: inline-block;
          height: .9rem;
          line-height: 0.9rem;
        }
        span:not(:first-child){
          background: #333;
          width: .85rem;
          color: #fff;
          margin-left: .375rem;
          border-radius: .125rem;
          text-align: center;
        }
      }
    }

  }
  .good-list{
    background: #fff;
    .good-item{
      border-top: 1px solid #eee;
      height: 6.85rem;
      display: flex;
      align-items: center;
      padding: 0 .75rem;
      .good-img{
        width: 5.25rem;
        height: 5.25rem;
        margin-right: 1.15rem;
        img{
          display: block;
          width: 5.25rem;
          height: 5.25rem;
        }
      }
      .good-info{
        height: 5.25rem;
        flex-grow: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .good-name{
          width:10.525rem;
          line-height: 1.5;
        }
        .good-price-wrapper{
          // position: absolute;
          display: flex;
          justify-content: space-between;
          bottom: 0;
          left: 0;
          .good-price-box{
            font-size: .85rem;
            color: #FC2A3E;
            font-weight: 500;
            del{
              font-size: .65rem;
              color: #999;
              margin-left: .75rem
            }
          }
          .btn{
            // position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>