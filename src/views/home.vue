<template>
  <div>
    <header class="aui-bar aui-bar-nav">{{$route.meta.title}}</header>
    <div class="ph-scroller">
      <scroller :on-infinite="infinite" :noDataText="noDataTxt" ref="my_scroller" style="padding-top:2.25rem">
        <section class="banner">
          <swiper :options="swiperOption">
            <swiper-slide>
              <img src="/static/img/home-bank.png"/>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </section>
        <!-- 导航 -->
        <section class="aui-grid">
          <div class="aui-col-xs-3 ph-home-nav-item" @click="recycle">
            <i class="iconfont icon-shepinhuishou"></i>
            <div class="aui-grid-label">奢品回收</div>
          </div>
          <div class="aui-col-xs-3 ph-home-nav-item" @click="repair">
            <i class="iconfont icon-yanghuweixiu"></i>
            <div class="aui-grid-label">维护保养</div>
          </div>
          <div class="aui-col-xs-3 ph-home-nav-item" @click="identifyPic">
            <i class="iconfont icon-zhaopianjianding"></i>
            <div class="aui-grid-label">图片鉴定</div>
          </div>
          <div class="aui-col-xs-3 ph-home-nav-item" @click="identifyPhy">
            <i class="iconfont icon-shiwujianding"></i>
            <div class="aui-grid-label">实物鉴定</div>
          </div>
        </section>
        <section class="container home-topic-wrapper">
          <router-link class="left" :to="'/shop'">
            <img src="/static/img/home-ziying.png" alt="">
          </router-link>
          <div class="right">
            <router-link class="special_list" :to="'/topic/'+special_top.id">
              <img src="/static/img/home-shagnxin.png" alt="">
              <div class="title">{{special_top.title}}</div>
              <div class="num">{{special_top.count}}款</div>
            </router-link>
            <router-link class="special_list" :to="'/topic/'+special_button.id">
              <img src="/static/img/home-jianlou.png" alt="">
              <div class="title">{{special_button.title}}</div>
              <div class="num">{{special_button.zhe}}</div>
            </router-link>
          </div>
        </section>
        <!-- 限时抢购 -->
        <section class="home-sale-wrapper">
          <div class="time-list">
            <ul :class="item.isActive?'active':''" class="nav-item" v-for="(item, index) in special_list" :key="index" @click="clickTime(index, item)">
              <li>
                <span class="time fz32">{{item.time}}</span>
                <span class="fz24">{{item.day}}</span>
              </li>
            </ul>
          </div>
          <div class="img-title">
            <img :src="special.img" alt="">
            <div class="countdown-head-box">
              <strong class="shop-head-name fz34">
                {{special.stxt}}
              </strong>
              <div class="shop-head-time" v-if="special.state!='3'">
                <span>{{special.ttxt}}</span>
                <span>{{special.time.hour}}</span>
                <span>{{special.time.minute}}</span>
                <span>{{special.time.second}}</span>
              </div>
            </div>
          </div>
          <column-list-item :List='goodsList' @userSetRemind="setRemind"></column-list-item>
        </section>
      </scroller>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getSpecialSum, getSpecialList, getSpecialGoodsList, setSpecialRemind } from '@/api/shop'
import { secTotime } from '@/utils'
import tips from '@/utils/tip'

import columnListItem from '@/components/ColumnListItem'

export default {
  name:'home',
  components: {
    swiper,
    swiperSlide,
    columnListItem
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el:'.swiper-pagination',
          paginationType:'fraction',
          // dynamicBullets: true
        },
        loop:true
      },
      currentSid: 0, // 当前专场ID
      page: 1,
      noData: false,
      noDataTxt: '已全部加载',
      special: {
        time: {}
      },
      special_top: {},
      special_button: {},
      special_list: [],
      setInter: '',
      goodsList: [],
      toUrl: process.env.WAP_URL
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData() {
      tips.loading();
      // 获取统计数据
      getSpecialSum().then(res => {
        if (res.list.length > 1) {
          this.special_top = res.list[0];
          this.special_button = res.list[1];
        }
      });
      // 获取专场数据
      getSpecialList().then(res => {
        let sList = res.list;
        if(res.msg == 1) {
          // 获取当前专场ID
          for (let i = 0; i < sList.length; i++) {
            if (sList[i].state == "1") {
              sList[i].isActive = true;
              this.currentSid = sList[i].id;
              break;
            }
          }
          this.special_list = sList;
          // 获取特卖专场商品
          this.getSpecialGoods(true);
        }
        else {

        }
      });
    },
    clickTime(index, item) {
      this.special_list.forEach(function (sp) {
        sp.isActive = false;
      });
      item.isActive = true;
      this.special_list.splice(index, 1, item);
      this.currentSid = item.id;
      tips.loading();
      this.getSpecialGoods(true);
    },
    getSpecialGoods(refresh) {
      getSpecialGoodsList({ id: this.currentSid, p: this.page }).then(res => {
        let glist = res.list;
        let _glist = [];
        let that = this;

        if(glist.length > 0) {
          let state = res.flag.state;
          glist.forEach(function (item) {
            let astate = 0;
            if (item.shelevs_type=='1') {
              if (state == '2') {
                if (that.token) {
                  astate = item.is_set=='1'?3:2;
                } else {
                  astate = 2;
                }
              } else if (state == '3') {
                astate = 4;
              } else {
                astate = 1;
              }
            }

            _glist.push({
              goodsId: item.id,
              img: item.goods_images,
              name: item.goods_name,
              status: astate,
              price: item.sale_price,
              del: item.ph_price
            });
          });

          if (refresh) {
            this.special = {
              stxt: res.flag.title,
              ttxt: res.flag.time,
              img: res.flag.img,
              state: res.flag.state,
              time: {}
            }
            clearInterval(that.setInter);
            if(res.flag.state != '3') {
              let s = parseInt(res.flag.ends);
              that.setInter = setInterval(function () {
                s--
                if (s > 0) {
                  let s_time = secTotime(s);
                  let _s_time = s_time.split(':');
                  that.special.time = {
                    hour: _s_time[0],
                    minute: _s_time[1],
                    second: _s_time[2]
                  }
                } else {
                  clearInterval(that.setInter)
                }
              }, 1000);
            }

            that.goodsList = _glist;
            tips.loaded();
          }
          else {
            that.goodsList = [...that.goodsList, ..._glist];
          }
          that.noData = false;
        } else {
          that.noData = true;
        }
      });
    },
    setRemind(index) {
      if (this.token) {
        let item = this.goodsList[index];
        setSpecialRemind({ id: this.currentSid, goodsid: item.goodsId }).then(res => {
          if(res.code == 200) {
            tips.toast(res.msg);
            this.goodsList[index].status = 3;
          }
        }).catch(error => {
          tips.alert(error)
        });
      }
      else {
        this.$router.replace({ path: "/login", query: { url: this.$router.history.current.fullPath } })
      }
    },
    infinite: function (done) {
      if(this.noData) {
        this.$refs.my_scroller.finishInfinite(true);
        return;
      }
      var that = this
      setTimeout(function () {
        that.page++;
        that.getSpecialGoods();
        done();
      }, 1500)
    },
    recycle() {
			if (this.token) {
				location.href = this.toUrl + '/pages/recycle/index.html'
			}else{
        this.$router.replace({ path: "/login", query: { url: this.$router.history.current.fullPath } })
			}
    },
    repair() {
      if (this.token) {
        let token = window.localStorage.getItem('token');	
        let userid = window.localStorage.getItem('userid');	
				let os = window.localStorage.getItem('os');	
				windows.location.href = 'https://apiv2-app.ponhu.cn/ccbyh/yanghu?userid='+userid+'&token='+token+'&os='+os;
			}else{
        this.$router.replace({ path: "/login", query: { url: this.$router.history.current.fullPath } })
			}
    },
    identifyPic() {
      if (this.token) {
				windows.location.href = process.env.WAP_URL + '/pages/identifyPic/index.html'
			}else{
        this.$router.replace({ path: "/login", query: { url: this.$router.history.current.fullPath } })
			}
    },
    identifyPhy() {
      if (this.token) {
				windows.location.href = process.env.WAP_URL + '/pages/identifyPhy/index.html'
			}else{
        this.$router.replace({ path: "/login", query: { url: this.$router.history.current.fullPath } })
			}
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #09B6F2 !important
}
.aui-grid{
  padding: .5rem 0 !important;
}
.ph-home-nav-item{
  padding: 0;
}
.iconfont{
  font-size: 1.5rem;
}
.aui-grid .aui-grid-label {
  margin-top: 0  !important;
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
    .special_list {
      position:relative;
      .num {
        top: 1.8rem;
        position: absolute;
        font-size: .65rem;
        color: #666666;
        left: .8rem;
      }
      .title {
        position: absolute;
        top: .8rem;
        left: .8rem;
        font-size:.85rem;
        font-weight:500;
        color: #333333;
      }
    }
  }
}
.home-sale-wrapper{
  margin: .6rem 0;
  box-sizing: border-box;
  .time-list{
    background: #fff;
    box-sizing: border-box;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    &::-webkit-scrollbar{
      display: none;
    }
    .nav-item{
      width: 3.6rem;
      height: 2.5rem;
      display: inline-block;
      &.active {
        color: #FC2A3E;
        border-bottom: .1rem solid;
      }
      li{
        height: 2.5rem;
        width: 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
      }
    }
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
}
</style>