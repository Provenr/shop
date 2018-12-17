<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="userCenter">
        <span class="iconfont icon-mine" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{$route.meta.title}}</div>
    </header>
    <div class="ph-scroller" style="margin-top:500px;">
      <scroller
        :on-infinite="infinite"
        :noDataText="noDataTxt"
        ref="my_scroller"
        style="padding-top:2.25rem"
      >
        <section class="banner">
          <swiper :options="swiperOption">
            <swiper-slide>
              <img src="static/img/home-bank.jpg">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </section>
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
            <img src="static/img/home-ziying.png" alt>
          </router-link>
          <div class="right">
            <router-link class="special_list" :to="'/topic/'+special_top.id+'?flag=topnew'">
              <img src="static/img/home-shagnxin.png" alt>
              <div class="title">{{special_top.title}}</div>
              <div class="num">{{special_top.count}}款</div>
            </router-link>
            <router-link class="special_list" :to="'/topic/'+special_button.id">
              <img src="static/img/home-jianlou.png" alt>
              <div class="title">{{special_button.title}}</div>
              <div class="num">{{special_button.zhe}}</div>
            </router-link>
          </div>
        </section>
        <section class="home-sale-tab-container">
          <div class="time-list" v-if="is_specia">
            <ul
              :class="item.isActive?'active':''"
              class="nav-item"
              v-for="(item, index) in special_list"
              :key="index"
              @click="clickTime(index, item)"
            >
              <li>
                <span class="time fz32 fw">{{item.time}}</span>
                <span class="fz24">{{item.day}}</span>
              </li>
            </ul>
          </div>
        </section>
        <section class="home-sale-wrapper">
          <!-- <div class="time-list" v-if="is_specia">
            <ul :class="item.isActive?'active':''" class="nav-item" v-for="(item, index) in special_list" :key="index" @click="clickTime(index, item)">
              <li>
                <span class="time fz32">{{item.time}}</span>
                <span class="fz24">{{item.day}}</span>
              </li>
            </ul>
          </div>-->
          <div class="img-title" v-if="is_specia">
            <img :src="special.img" alt>
            <div class="countdown-head-box">
              <strong class="shop-head-name fz34">{{special.stxt}}</strong>
              <div class="shop-head-time" v-if="special.state!='3'">
                <span>{{special.ttxt}}</span>
                <span>{{special.time.hour}}</span>
                <span>{{special.time.minute}}</span>
                <span>{{special.time.second}}</span>
              </div>
            </div>
          </div>
          <div class="img-title" v-if="!is_specia">
            <div class="countdown-head-box" style="margin-top:0">
              <strong class="shop-head-name fz34">猜你喜欢</strong>
            </div>
          </div>
          <column-list-item :List="goodsList" @userSetRemind="setRemind"></column-list-item>
        </section>
      </scroller>
    </div>
    <nav class="mui-bar mui-bar-tab">
      <a href="/bank" class="mui-tab-item mui-active">
        <span class="mui-icon iconfont icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a href class="mui-tab-item" @click.prevent="cart">
        <span class="mui-icon iconfont icon-xinyuandan"></span>
        <span class="mui-tab-label">心愿单</span>
      </a>
      <a href class="mui-tab-item" @click.prevent="userCenter">
        <span class="mui-icon iconfont icon-mine"></span>
        <span class="mui-tab-label">我的</span>
      </a>
    </nav>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {
  getSpecialSum,
  getSpecialList,
  getSpecialGoodsList,
  setSpecialRemind
} from "@/api/shop";
import { secTotime, getPlatform } from "@/utils";
import tips from "@/utils/tip";

import axios from "axios";
import qs from "qs";

import columnListItem from "@/components/ColumnListItem";

const TestServe = axios.create({
  baseURL: "http://pre.apiv1-app2018.ponhu.cn/Brand/jh_test",
  timeout: 10000,
  responseType: "json",
  headers: {
    //'Content-Type': 'application/form-data'
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export default {
  name: "home",
  components: {
    swiper,
    swiperSlide,
    columnListItem
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          paginationType: "fraction"
          // dynamicBullets: true
        },
        loop: true
      },
      currentSid: 0, // 当前专场ID
      page: 1,
      noData: false,
      noDataTxt: "已全部加载",
      special: {
        time: {}
      },
      is_specia: true,
      special_top: {},
      special_button: {},
      special_list: [],
      setInter: "",
      goodsList: [],
      toUrl: process.env.WAP_URL
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  created() {
    this.getSum();
    this.getData();
  },
  mounted() {
    let _user_id = localStorage.getItem("");
    let remark1 = "";
    let _ccb = "CCBTIMESTAMP";
    let sign = "";
    axios
      .post(
        "http://pre.apiv1-app2018.ponhu.cn/Brand/jh_test",
        {
          user_id: _user_id,
          remark1: remark1,
          CCBTIMESTAMP: _ccb,
          CCBSIGN: sign
        },
        {
          //  对 data 进行任意转换处理
          transformRequest: [
            function(data) {
              return qs.stringify(data);
            }
          ],
          headers: {
            // "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
            // "token": localStorage.getItem('token'),
            // "os": localStorage.getItem('os'),
            // "version":'ccby1.0'
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  },
  methods: {
    getData() {
      tips.loading();
      // 获取专场数据
      getSpecialList()
        .then(res => {
          let that = this;
          let sList = res.list;
          if (res.msg == 1) {
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
          } else {
            this.is_specia = false;
            sList.forEach(function(item) {
              that.goodsList.push({
                goodsId: item.id,
                img: item.goods_images,
                name: item.goods_name,
                status: item.is_self == 0 ? 4 : 0,
                price:
                  item.is_discount == 0
                    ? item.goods_price
                    : item.discount_price,
                del: item.goods_price
              });
            });
          }
          tips.loaded();
        })
        .catch(error => {
          tips.loaded();
          tips.alert(error);
        });
    },
    getSum() {
      // 获取统计数据
      getSpecialSum()
        .then(res => {
          if (res.list.length > 1) {
            this.special_top = res.list[0];
            this.special_button = res.list[1];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    clickTime(index, item) {
      this.special_list.forEach(function(sp) {
        sp.isActive = false;
      });
      item.isActive = true;
      this.special_list.splice(index, 1, item);
      this.currentSid = item.id;
      this.page = 1;
      tips.loading();
      this.getSpecialGoods(true);
    },
    getSpecialGoods(refresh) {
      getSpecialGoodsList({ id: this.currentSid, p: this.page }).then(res => {
        if (res.code == 100) {
          this.noData = true;
          return;
        }
        let glist = res.list;
        let _glist = [];
        let that = this;

        if (glist.length > 0) {
          let state = res.flag.state;
          glist.forEach(function(item) {
            let astate = 0;
            if (item.shelevs_type == "1") {
              if (state == "2") {
                if (that.token) {
                  astate = item.is_set == "1" ? 3 : 2;
                } else {
                  astate = 2;
                }
              } else if (state == "3") {
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
            };
            clearInterval(that.setInter);
            if (res.flag.state != "3") {
              let s = parseInt(res.flag.ends);
              that.setInter = setInterval(function() {
                s--;
                if (s > 0) {
                  let s_time = secTotime(s);
                  let _s_time = s_time.split(":");
                  that.special.time = {
                    hour: _s_time[0],
                    minute: _s_time[1],
                    second: _s_time[2]
                  };
                } else {
                  clearInterval(that.setInter);
                }
              }, 1000);
            }

            that.goodsList = _glist;
            tips.loaded();
          } else {
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
        setSpecialRemind({ id: this.currentSid, goodsid: item.goodsId })
          .then(res => {
            if (res.code == 200) {
              tips.toast(res.msg);
              this.goodsList[index].status = 3;
            }
          })
          .catch(error => {
            tips.alert(error);
          });
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    infinite: function(done) {
      if (this.noData) {
        this.$refs.my_scroller.finishInfinite(true);
        return;
      }
      if (this.currentSid > 0) {
        var that = this;
        setTimeout(function() {
          that.page++;
          that.getSpecialGoods();
          done();
        }, 2000);
      }
    },
    userCenter: function() {
      let rurl = this.toUrl + "/pages/mine/index.html";
      if (this.token) {
        location.href = rurl;
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    recycle() {
      let rurl = this.toUrl + "/pages/recycle/index.html";
      if (this.token) {
        location.href = rurl;
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    repair() {
      let token = window.localStorage.getItem("token");
      let userid = window.localStorage.getItem("userid");
      let os = window.localStorage.getItem("os");
      let rurl =
        "https://apiv2-app.ponhu.cn/ccbyh/yanghu?userid=" +
        userid +
        "&token=" +
        token +
        "&os=" +
        os;
      if (this.token) {
        location.href = rurl;
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    identifyPic() {
      let rurl = this.toUrl + "/pages/identifyPic/index.html";
      if (this.token) {
        location.href = rurl;
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    identifyPhy() {
      let rurl = this.toUrl + "/pages/identifyPhy/index.html";
      if (this.token) {
        location.href = rurl;
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    cart() {
      // let rurl = this.toUrl + "/pages/identifyPhy/index.html";
      if (this.token) {
        // location.href = rurl;
         this.$router.push({
          path: "/cart",
        });
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #09b6f2 !important;
}
.aui-grid {
  padding: 0.5rem 0 !important;
}
.ph-home-nav-item {
  padding: 0;
}
.iconfont {
  font-size: 1.5rem;
}
.aui-grid .aui-grid-label {
  margin-top: 0 !important;
}
.home-topic-wrapper {
  display: flex;
  margin: 0.6rem 0;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  .left {
    width: 8.375rem;
    height: 7.2rem;
    img {
      display: block;
      width: 8.375rem;
      height: 7.2rem;
    }
  }
  .right {
    width: 8.375rem;
    margin-left: 0.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .special_list {
      position: relative;
      .num {
        top: 1.8rem;
        position: absolute;
        font-size: 0.65rem;
        color: #666666;
        left: 0.8rem;
      }
      .title {
        position: absolute;
        top: 0.8rem;
        left: 0.8rem;
        font-size: 0.85rem;
        font-weight: 500;
        color: #333333;
      }
    }
  }
}
.home-sale-tab-container {
  width: 100%;
  // height: 50px;
  white-space: nowrap;
  overflow: hidden;
  background: #fff;
  overflow-x: scroll !important;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch; /* 2 */
  text-align: justify; /* 3 */
  &::-webkit-scrollbar {
    display: none;
  }
  .time-list {
    background: #fff;
    box-sizing: border-box;
    // overflow-x: scroll !important;
    // overflow-y: hidden;
    // white-space: nowrap;
    // &::-webkit-scrollbar{
    //   display: none;
    // }
    .nav-item {
      width: 25%;
      height: 2.5rem;
      display: inline-block;
      &.active {
        color: #fc2a3e;
        border-bottom: 0.2rem solid;
      }
      li {
        height: 2.3rem;
        width: 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
      }
    }
  }
}
.home-sale-wrapper {
  margin: 0 0 0.6rem 0;
  box-sizing: border-box;

  .img-title {
    padding: 0.75rem;
    background: #fff;
    border-top: 1px solid #f7f7f7;
    .countdown-head-box {
      display: flex;
      justify-content: space-between;
      margin-top: 0.8rem;
      .shop-head-time {
        display: flex;
        align-items: center;
        font-size: 0.65rem;
        color: #666666;
        span {
          display: inline-block;
          height: 0.9rem;
          line-height: 0.9rem;
        }
        span:not(:first-child) {
          background: #333;
          width: 0.85rem;
          color: #fff;
          margin-left: 0.375rem;
          border-radius: 0.125rem;
          text-align: center;
        }
      }
    }
  }
}

.mui-bar {
  position: fixed;
  z-index: 10;
  right: 0;
  left: 0;
  height: 0.5rem;
  line-height: 1.2;
  background-color: #fff;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow: 0 0 1px rgba(0,0,0,.85);
}
.mui-bar .iconfont{
  font-size: 1.2rem;
}
.mui-bar-tab {
  bottom: 0;
  display: table;
  width: 100%;
  height: 50px;
  padding: 0;
  table-layout: fixed;
  border-top: 0;
  border-bottom: 0;
  -webkit-touch-callout: none;
}

.mui-bar-tab .mui-tab-item {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item.mui-active {
  color: #09B6F2;
}

.mui-bar-tab .mui-tab-item .iconfont{
  top: 3px;
  width: 24px;
  height: 24px;
  // padding-top: 0;
  // padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item .mui-icon~.mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis
}

.mui-bar-tab .mui-tab-item .mui-icon:active {
    background: 0 0
}

.mui-focusin>.mui-bar-header-secondary,.mui-focusin>.mui-bar-nav {
    position: absolute
}

</style>
