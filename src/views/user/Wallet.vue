<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="$router.back(-1)">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{title}}</div>
    </header>
    <div class="content">
      <div class="wallet-info">
        <div class="wallet-info-wrapper">
          <div class="wallet-wrapper">
            <div class="balance f60">{{balance}}</div>
            <div class="my-wallet f28" style="color:#fff">账户余额(元)</div>
          </div>
          <div class="wallet-exchange f28" @click="exchange()">
            提现
          </div>
        </div>
      </div>

      <div class="consume-list" >
        <div class="title fb f30" ref="tit">资金明细</div>
         <!-- <div class="consume-list-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check	= 'false' :style="{ height : wrapperHeight + 'px' }">
            <div class="consume-item" v-for="(list,index) in lists" :key="index">
              <div class="item-top">
                <div class="name fb">{{list.remark}}</div>
                <div class="num">{{list.sign}}{{list.trand_amt}}</div>
              </div>
              <div class="item-date">
                {{list.datetime}}
              </div>
            </div>
            <div class="loading f28" v-if='!loading'><mt-spinner type="fading-circle"></mt-spinner><span>加载中...</span></div>
            <div class="loadend" v-if='allLoaded'>已加载全部</div>
         </div> -->
      </div>
    </div> 
  </div>
</template>
<script>
// import Header from "@/components/Header";
// import Menu from "@/components/Menu";
// import qs from 'qs';
// // import {getServiceTime} from '@/utils/index'
// import axios from "axios";
// import { MessageBox } from 'mint-ui';

export default {
//   components: {
//     Header,
//     Menu
//   },
  data() {
    return {
      title: "我的钱包",
      balance: 0,// 余额
      userinfo: {
        nickname: "风度翩翩的少年",
        head: "http://7xl1gc.com2.z0.glb.qiniucdn.com/1526613328789.304932"
      },
      wrapperHeight: 0,
      lists: [],
      loading:true,
      isalldata:false,
      pageNo:0,
      totalpage:0,
      pageSize:10,
      allLoaded:false,
    };
  },
//   methods: {
//     makecall: function() {
//       location.href='tel:400-086-5285'
//     },
//     myWallet: function() {
//       this.$router.push({ path: "/wallet" });
//     },
//     exchange: function(){
//       //this.$confirm('下载胖虎奢侈品APP进行提现');
//        MessageBox.confirm('', {
//         message: '下载胖虎奢侈品APP进行提现',
//         title: '提示',
//         confirmButtonText: '确定',
//         cancelButtonText: '退出'
//         }).then(action => {
//         if (action == 'confirm') {     //确认的回调
//           console.log(1);
//           window.location.href = "http://www.52panghu.com/shouji.html";
//         }
//         }).catch(err => {
//         if (err == 'cancel') {     //取消的回调
//           return;
//         }
//       })
//       // this.$confirm('下载胖虎奢侈品APP进行提现').then(()=>{
//       //   location.href = 'http://www.52panghu.com/shouji.html'
//       // }).catch()
//     },

//     loadPageList:function(pageNo,fn){
//       // 初次 查询数据
//       let that = this;
//       let params={
//         token:that.$Auth.getToken(),
//         p:pageNo
//       }
//         axios.post(that.PHPAPI + "/Myaccount/moneyDetail",params,
//         {
//           transformRequest:[(data) => {
//             return qs.stringify(data)
//           }],
//           headers: {
//             "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
//           }
//       })
//         .then(function (response) {
//           let rsp = response.data;
//          // console.log(rsp);
//           if(rsp.stat == "200"){
//             console.log(rsp.message);
//             that.isalldata = false;

//             for(let i=0;i<rsp.message.length;i++){
//               let type = rsp.message[i].type*1;
//               switch (type) {
//                 case 1:
//                 case 4:
//                 case 5:
//                 case 7:
//                 case 8:
//                 case 9:
//                 case 12:
//                 case 14:
//                 case 16:
//                   that.$set(rsp.message[i], "sign", "+");
//                   break;
//                 case 2:
//                 case 3:
//                 case 6:
//                 case 10:
//                 case 11:
//                 case 13:
//                 case 15:
//                 case 17:
//                   that.$set(rsp.message[i], "sign", "-");
//                   break;
//                 default:
//                   break;
//               }

//             }
//             fn(rsp.message);
//             that.$toast("加载完成")

//           }else if(rsp.stat == "201"){
//              that.allLoaded = true;
//              that.loading = true;
//              that.isalldata = true;
//              //fn(rsp.message);
//           }
//         })
//         .catch(function (error) {
//           that.$toast("网络连接错误,稍后重试")
//           // that.loadingShow = false;
//         });

//     },
//     loadMore: function() {

//       var that = this;

//       that.loading = true;
//       setTimeout(() => {

//         that.pageNo++;
//         that.loadPageList(that.pageNo,(rsp) => {
//           that.lists = [...that.lists , ...rsp]
//           that.loading = false
//         });
//       }, 2500);
//     },
//     isHaveMore:function(){
//       // 是否还有下一页，如果没有就禁止上拉刷新
//       if(this.pageNo == this.totalpage){
//         this.allLoaded = true;
//       }
//     },
//     handleBottomChange(status) {
//       this.topStatus = status;
//     },
//     getAccountBalance:function(){
//     // 初次 查询数据
//       let that = this;
//       let params={
//         token:that.$Auth.getToken()
//       }
//       axios.post(that.PHPAPI + "/Myaccount/getAccountBalance",params,
//         {
//           transformRequest:[(data) => {
//             return qs.stringify(data)
//           }],
//           headers: {
//             "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
//           }
//       })
//         .then(function (response) {
//           let rsp = response.data;
//          // console.log(rsp);
//           if(rsp.stat == "200"){
//             that.balance = rsp.message.balance;
//           }
//         })
//         .catch(function (error) {
//           that.$toast("网络连接错误,稍后重试")
//           // that.loadingShow = false;
//         });

//     }
//   },

//   mounted(){
//     var that = this;
//     that.getAccountBalance();
//     //let pageNo = this.pageNo;
//     // let pageSize = this.pageSize;
//     that.loadPageList(that.pageNo,(rsp) => {
//       that.lists = [...that.lists , ...rsp]
//       if(that.lists.length < that.pageSize){
//         that.loading = true;
//       }
//       // that.loading = false;
//     });  //初次访问查询列表
//     //this.loadMore();
//     // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.walletInfo.offsetHeight - this.$refs.tit.offsetHeight;
//     this.wrapperHeight = document.documentElement.clientHeight - this.$refs.tit.getBoundingClientRect().top;
//     // console.log(this.wrapperHeight)
//     // console.log(document.documentElement.clientHeight)
//     // console.log(this.$refs.tit.getBoundingClientRect().top)
//   }
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
    }
  }
</style>



