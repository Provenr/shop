<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <div class="aui-title">支付成功</div>
    </header>
    <div class="ph-notice-bg">
      <div class="hed"></div>
      <div class="icon">
        <img src="static/img/buy_paymentsuccess.png" />
        <p>支付成功</p>
      </div>
      <div class="button-box">
        <a class="button h" @click="home">返回首页</a>
        <a class="button l" @click="order">查看订单</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'payNotice',
  data() {
    return {
      pageType: 1,

    }
  },
  methods: {
    home() {

    },
    order() {

    }
  }
}
</script>


<style lang="less" scoped>
.ph-notice-bg {
  height:100vh;
  overflow:hidden;
  background: #fff;
  .hed {
    position:relative;
    height: 3.25rem;
    width: 100%;
    background-color: #09B6F2;
  }
  .icon {
    position: absolute;
    top: 3rem;
    z-index: 10;
    left:50%;
    -webkit-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    p {
      font-size:1.3rem;
      font-weight:500;
      color:#333333;
      margin-top: 1rem;
    }
    img {
      width: 5rem;
      height: 5rem;
      text-align:center;
    }
  }
  .button-box {
    margin-top: 9.2rem;
    padding: 0 1.125rem;
    text-align:center;
    .button {
      height:2rem;
      border-radius:1rem;
      font-size: .75rem;
      padding: .5rem 1.8rem;
      margin:0 auto;
      font-weight:500;
      background-color: #fff;
    }
    .h {
      border:1px solid #959595;
      color: #959595;
      margin-right: .75rem;
    }
    .l {
      border:1px solid #09B6F2;
      color: #09B6F2;
    }
  }
}

</style>


