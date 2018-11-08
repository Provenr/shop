<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="back">
        <span class="iconfont icon-leftarrow"></span>
      </a>
      <div class="aui-title">{{$route.meta.title}}</div>
    </header>
    <div class="ph-bal-taikang">
      <img src="/static/img/taikang-pay.png" alt="">
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-bal-adder">
      <div class="box-title">
        <span class="l">配送方式</span>
        <span class="rl">
          <a href="javascript">快递到家<i class="iconfont icon-youjiantou1"></i></a>
        </span>
      </div>
      <div class="ph-title-line"></div>
      <div class="adder_add">
        <div class="con">
          <span class="c"><i class="iconfont icon-jiahao"></i>请添加收货地址</span>
          <span class="rl"><i class="iconfont icon-youjiantou1"></i></span>
        </div>
      </div>
      <img src="/static/img/address-line.png" alt="">
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-bal-goods">
      <div class="goods-list">
        <div class="item">
          <img src="https://img-ppcdn.ponhu.cn/Fr09uZEPaVVbxypQacKP8UIwILWv?imageView2/1/w/240/h/240">
        </div>
        <div class="item-box">
          <div class="name">百达翡丽 Patek Philippe-Calatrava系列男士系列男士...系列男士系列男士列男士...系列</div>
          <div class="price">￥8600</div>
        </div>
      </div>
      <div class="ly">
        <textarea placeholder="给卖家留言"></textarea>
      </div>
    </div>
    <div class="ph-nav-gap"></div>
    <div class="ph-bal-pay">
      <div class="item">
        <span class="l"><i class="iconfont icon-jianhang jh"></i> 龙支付</span>
        <label><input class="aui-radio" type="radio" name="demo1" checked></label>
      </div>
      <div class="ph-line"></div>
      <div class="item">
        <span class="l"><i class="iconfont icon-weixinzhifu1 wx"></i> 微信支付</span>
        <label><input class="aui-radio" type="radio" name="demo1" checked></label>
      </div>
    </div>
    <div class="ph-bal-bar">
      <div class="sum-price">应付：￥16122.00</div>
      <input type="button" class="button" value="立即支付">
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsBalance',
  data() {
    return {
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
    }
  }
  .adder_add {
    padding: .75rem;
    .con {
      line-height: 3rem;
      .c {
        color: #4C4C4C;
        font-size: .6rem;
        margin-left: 6.25rem;
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
    background-color: #09B6F2;
    color: #fff;
    height:2.5rem;
    font-size: .7rem;
    width: 7.5rem;
    float:right;
  }
}
</style>



