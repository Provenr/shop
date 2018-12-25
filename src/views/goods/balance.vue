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
        <div class="ph-bal-taikang" @click="taikang">
          <img src="static/img/taikang-pay.png" alt="">
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-bal-adder">
          <div class="box-title">
            <span class="l">配送方式</span>
            <span class="rl">
              <a v-if="isAction" href="javascript:;" @click="showDistribution=true">{{distribution}}<i class="iconfont icon-youjiantou1"></i></a>
              <span v-if="!isAction">{{distribution}}</span>
            </span>
          </div>
          <div v-if="showAddr">
            <div class="ph-title-line"></div>
            <div class="adder_add" v-if="addrFlag==1" @click="selectAddr">
              <div class="con">
                <div class="c"><i class="iconfont icon-jiahao"></i>请添加收货地址</div>
                <div class="rl"><i class="iconfont icon-youjiantou1"></i></div>
              </div>
            </div>
            <div class="adder_dis" v-if="addrFlag==2" @click="selectAddr">
              <div class="con">
                <div class="c">
                  <p class="cl fz26 fw" style="padding-bottom: .3rem;">{{userAddr.name}}<span class="tel">{{userAddr.phone}}</span></p>
                  <p class="fz22">{{userAddr.addr}}</p>
                </div>
                <div class="rl" v-if="isAction"><i class="iconfont icon-youjiantou1"></i></div>
              </div>
            </div>
            <img src="static/img/address-line.png" alt="">
          </div>
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-bal-goods">
          <div class="goods-list">
            <div class="item">
              <img :src="goods.goods_images">
            </div>
            <div class="item-box">
              <div class="name">{{goods.goods_name}}</div>
              <div class="price">￥{{goods.ph_price}}</div>
            </div>
          </div>
          <div class="goods-list">
            <div class="item">
              <img :src="goods.goods_images">
            </div>
            <div class="item-box">
              <div class="name">{{goods.goods_name}}</div>
              <div class="price">￥{{goods.ph_price}}</div>
            </div>
          </div>
          <div class="ly">
            <textarea placeholder="给卖家留言" v-model="form.message"></textarea>
          </div>
        </div>
        <div class="ph-nav-gap"></div>
        <div class="ph-bal-pay">
          <!-- <div class="item">
            <span class="l"><i class="iconfont icon-jianhang jh"></i> 龙支付</span>
            <label><input class="aui-radio" type="radio" name="payBank" v-model="form.payid" value="10"></label>
          </div> -->
          <div class="item">
            <span class="l">满减优惠</span>
            <label>-￥200</label>
          </div>
          <!-- <div class="ph-line"></div>
          <div class="item">
            <span class="l"><i class="iconfont icon-weixinzhifu1 wx"></i> 微信支付</span>
            <label><input class="aui-radio" type="radio" name="payBank" v-model="form.payid" value="2"></label>
          </div> -->
        </div>
      </scroller>
    </div>
    

    <div v-transfer-dom>
      <popup v-model="showDistribution" position="bottom">
        <group>
          <radio :options="distributionList" @on-change="distributionChange" v-model="form.shipping_type"></radio>
        </group>
      </popup>
    </div>
    <div style="height: 2.5rem;"></div>
    <div class="ph-bal-bar">
      <div class="sum-price">应付：￥{{form.total}}</div>
      <a class="button" @click="submit">立即支付</a>
    </div>

    <form name="mbcpay_b2c">
      <input type="hidden" name="TXCODE" value="SP7010" />
      <input type="hidden" name="WAPVER" value="1.2" />
      <input type="hidden" name="MERCHANTID" value="105100000020361" />
      <input type="hidden" name="ORDERID" id="ORDERID_ID" value="" />
      <input type="hidden" name="PAYMENT" id="PAYMENT" value="0.01" />
      <input type="hidden" name="MAGIC" id="MAGIC" value="" />
      <input type="hidden" name="BRANCHID" value="110000000" />
      <input type="hidden" name="POSID" value="008181422" />
      <input type="hidden" name="CURCODE" value="01" />
      <input type="hidden" name="REMARK1" value="" />
      <input type="hidden" name="REMARK2" value="" />
      <input type="hidden" name="SUPPORTACCOUNTTYPE" value="3" />
		</form>

  </div>
</template>

<script>


function getCCBY_PaySign() {
  return "TXCODE=" + mbcpay_b2c.TXCODE.value + "," +
		"WAPVER=" + mbcpay_b2c.WAPVER.value + "," +
		"MERCHANTID=" + mbcpay_b2c.MERCHANTID.value + "," +
		"ORDERID=" + mbcpay_b2c.ORDERID.value + "," +
		"PAYMENT=" + mbcpay_b2c.PAYMENT.value + "," +
		"MAGIC=" + mbcpay_b2c.MAGIC.value + "," +
		"BRANCHID=" + mbcpay_b2c.BRANCHID.value + "," +
		"POSID=" + mbcpay_b2c.POSID.value + "," +
		"CURCODE=" + mbcpay_b2c.CURCODE.value + "," +
		"REMARK1=" + mbcpay_b2c.REMARK1.value + "," +
		"REMARK2=" + mbcpay_b2c.REMARK2.value + "," +
    "SUPPORTACCOUNTTYPE=" + mbcpay_b2c.SUPPORTACCOUNTTYPE.value;
}

import { getGoodsPay } from '@/api/goods'
import { getUserInfo, getUserDefaultAddress, getAddress } from '@/api/user'
import { createOrder, getOrder, orderPay } from '@/api/order'
import tips from '@/utils/tip'
import { getPlatform } from '@/utils'



import { TransferDom, Popup, Radio, Group } from 'vux'

export default {
  name: 'goodsBalance',
  directives: { TransferDom },
  components: { Popup, Radio, Group },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    userId() {
      return this.$store.getters.userId;
    }
  },
  data() {
    return {
      goods: {},
      userAddr: {
        name: '', phone:'', addr:''
      },
      addrFlag: 1,
      showAddr: true,
      showDistribution: false,
      distribution: '快递到家',
      distributionList: [{
        key: '1',
        value: '快递到家'
      }, {
        key: '2',
        value: '到店自提（仅支持北京自提）'
      }],
      orderId: '',
      isAction: true,
      thoUrl: process.env.WAP_URL,
      form: {
        goodsid_str: '',
        payid: '10',
        youhui_type: '3',
        shipping_type: '1',
        total: 0,
        message: '',
        prid: '',
        addrid: ''
      }
    }
  },
  created() {
    this.orderId = this.$route.query.oid;
    this.form.addrid = this.$route.query.addrid || '';

    if (this.orderId) {
      this.isAction = false;
      this.getOrderInfo();
    }
    else {
      this.getData()
    }
  },
  methods: {
    back() {
      this.$router.push({ name: 'goodsDetail', params: { id: this.$route.params.id } });
    },
    // 获取数据
    getData() {
      let that = this;
      tips.loading();
      getGoodsPay(this.$route.params.id).then(res => {
        this.goods = res.list[0];
        this.form.goodsid_str = this.goods.id;
        this.form.total = res.total;
        if (this.form.addrid) { // 获取地址信息
          this.addrFlag = 2;
          getAddress(this.form.addrid).then(addr => {
            if(addr.list) {
              this.userAddr.name = addr.list.conta;
              this.userAddr.phone = addr.list.tel;
              this.userAddr.addr = addr.list.citystr+' '+addr.list.adss_x;
              this.form.addrid = addr.list.id;
            } else {
              this.addrFlag = 1;
            }
          }).catch(error => {
            tips.loaded();
            tips.alert(error)
          });
        } else {
          this.addrFlag = 2;
          // 获取用户默认地址
          getUserDefaultAddress().then(addr => {
            if(addr.list) {
              this.userAddr.name = addr.list.conta;
              this.userAddr.phone = addr.list.tel;
              this.userAddr.addr = addr.list.citystr+' '+addr.list.adss_x;
              this.form.addrid = addr.list.id;
            } else {
              this.addrFlag = 1;
            }
          }).catch(error => {
            tips.loaded();
            tips.alert(error)
          });
        }
        tips.loaded();
      }).catch(error => {
        tips.loaded()
        tips.alert(error)
      });
    },
    getOrderInfo () {
      let that = this;
      tips.loading();
      getOrder(this.orderId).then(res => {
        let data = res.list;
        this.goods = data.goods;
        this.distribution = data.address.shipping_type=='2'?'到店自提（仅支持北京自提）':'快递到家';
        this.form.shipping_type = data.address.shipping_type;
        this.addrFlag = data.address.shipping_type=="2"?2:1;
        this.form.payid = data.pay_id;
        this.form.total = data.jh_price;
        this.form.message = data.message;
        if(data.address.shipping_type == "1") {
          this.userAddr.name = data.address.conta;
          this.userAddr.phone = data.address.tel;
          this.userAddr.addr = data.address.citystr+data.address.adss_x;
        }
        tips.loaded()
      }).catch(error => {
        tips.loaded()
        tips.alert(error)
      });
    },
    distributionChange (value, label) {
      this.form.shipping_type = value;
      this.distribution = label;
      this.showDistribution = false;
      if (value == "1") {
        this.showAddr = true;
      }
      else {
        this.showAddr = false;
        this.form.addrid = '';
      }
    },
    selectAddr() {
      location.href = this.thoUrl + "/pages/mine/address/chooseAdd.html?refid=2&gid=" + this.$route.params.id;
    },
    taikang() {
      location.href = "http://pre.m.ponhu.cn/taikang/ccb/gid/"+this.$route.params.id+"/id/"+this.userId+"/os/2";
    },
    // 支付提交
    submit() {
      if(this.form.shipping_type == "1") {
        if(!this.form.addrid) {
          tips.toast("请添加收货地址");
          return;
        }
      }
      tips.loading("支付中...");
      if(!this.orderId) {
        createOrder(this.form).then(res => {
          if(this.form.payid == "10") { // 建行支付
            $("#ORDERID_ID").val(res.order_sn);
            $("#PAYMENT").val(res.total_fee);
            $("#MAGIC").val(res.message);
            // 判断平台
            let os = getPlatform();
            if(os == "android") {
              window.mbcpay.b2c(getCCBY_PaySign());
            } else if (os == "ios")  {
              iospay(getCCBY_PaySign())
              location = "/mbcpay.b2c";
            }
          } else { // 微信支付
            location.href = res.mweb_url + "&redirect_url=" + process.env.RESOURC_URL + "/goods/pay/paynotice?oid=" + this.orderId;
          }
          tips.loaded()
        }).catch(error => {
          tips.loaded()
          tips.alert(error)
        });
      }
      else {  //立即支付
        orderPay({ orderid: this.orderId, pay_id: this.form.payid, total: this.form.total }).then(res => {
          if(this.form.payid == "10") { // 建行支付
            // 判断平台
            let os = getPlatform();
            if(os == "android") {
              window.mbcpay.b2c(getCCBY_PaySign());
            } else if (os == "ios")  {
              window.location = "/mbcpay.b2c";
            }
          } else { // 微信支付
            location.href = res.mweb_url + "&redirect_url=" + process.env.RESOURC_URL + "/goods/pay/paynotice?oid=" + this.orderId;
          }
          tips.loaded()
        }).catch(error => {
          tips.loaded()
          tips.alert(error)
        });
      }
    }
  },
}
</script>

<style lang="less" scoped>

@radio-checked-icon-color:#09B6F2;

.ph-bal-taikang {
  position: relative;
  display: block;
  height: auto;
  padding: 0;
  width: 100%;
}
.ph-bal-adder {
  position: relative;
  padding: 0;
  background-color: #fff;
  .box-title {
    text-align: -webkit-left;
    line-height:.9rem;
    padding: .875rem .75rem;
    color: #4C4C4C;
    .l {
      color: #1B1B1B;
      font-size: .75rem;
      font-weight:bold;
    }
    .rl {
      float: right;
      flex:1;
      a {
        color: #4C4C4C;
        font-size: .7rem;
        i {
          color: #C4C4C4;
          font-size: .9rem;
          vertical-align: text-bottom;
          padding-left: 0.5rem;
        }
      }
      span {
        color: #4C4C4C;
        font-size: .7rem;
      }
    }
  }
  .adder_add {
    padding: .75rem;
    .con {
      line-height: 3rem;
      .c {
        color: #4C4C4C;
        font-size: .6rem;
        float: left;
        width: 90%;
        text-align: center;
        i {
          margin-right: .45rem;
          margin-top: .1rem;
        }
      }
      .rl {
        float: right;
        i {
          color: #C4C4C4;
          font-size: .9rem;
          vertical-align: text-bottom;
          padding-left: 0.5rem;
        }
      }
    }
  }
  .adder_dis {
    padding: .75rem;
    .con {
      line-height: 3rem;
      .c {
        float: left;
        width: 90%;
        font-size: .6rem;
        line-height: 1rem;
        .cl {
          color: #4C4C4C;
        }
        .tel {
          margin-left: .5rem;
        }
      }
      .rl {
        float: right;
        i {
          color: #C4C4C4;
          font-size: .9rem;
          vertical-align: text-bottom;
          padding-left: 0.5rem;
        }
      }
    }
  }
}
.ph-bal-goods {
  position: relative;
  padding: 0;
  background-color: #fff;
  padding: 0 .75rem;
  .goods-list {
    display:flex;
    padding: .75rem 0;
    position:relative;
    border-bottom: 1px solid #E8E8E8;
    .item {
      margin-right: .5rem;
      width: 3rem;
      height: 3rem;
      text-align:center;
    }
    .item-box {
      -webkit-box-flex:1;
      -webkit-flex:1;
      flex:1;
      min-width:0;
      .name {
        font-weight:500;
        font-size: .6rem;
        color: #4C4C4C;
        overflow:hidden;
        text-align: left;
        line-height: .8rem;
        margin-bottom: .6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        flex:1;
        position:absolute;
        right:0;
        font-size:.65rem;
        font-weight:bold;
        color:#1B1B1B;
        line-height:1rem;
      }
    }
  }
  .ly {
    padding: .8rem 0;
    textarea {
      font-size: .7rem;
    }
  }
}
.ph-bal-pay {
  position: relative;
  padding: 0;
  background-color: #fff;
  padding: 0 .75rem;
  .item {
    padding: .825rem 0;
    color: #4C4C4C;
    .l {
      font-size: .7rem;
      i {
        font-size: 1rem;
        margin-right: 0.5rem;
      }
      .jh { color: #003b8f}
      .wx { color: #09bb07}
    }
    label {
      float: right;
    }
  }
}
.ph-bal-bar {
  width: 100%;
  height: 2.5rem;
  position: fixed;
  bottom: 0;
  background: #fff;
  margin:0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1001;
  .sum-price {
    float: left;
    margin-left: .75rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #1B1B1B;
    font-size: .7rem;
  }
  .button {
    background-color: #fff;
    height: 2rem;
    border: 1px solid #09B6F2;
    border-radius: 1rem;
    color: #09B6F2;
    font-size: .75rem;
    width: 6.5rem;
    margin-right: 0.75rem;
    text-align: center;
    line-height: 1.8rem;
  }
}
.vux-popup-dialog {
  z-index: 1002;
}

</style>



