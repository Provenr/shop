<template>
  <div class="ph-topic-rule">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" href="javascript:;" @click="back">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{$route.meta.title}}</div>
    </header>
    <div class="wrapper" style="padding-bottom:1.0rem;">
      <div class="yuanpang">
        <h2>手机银行胖虎奢侈品促销活动规则</h2>
        <h3>一、活动时间</h3>
        <p>2019年1月——2019年3月（暂定）</p>
        <h3>二、活动对象</h3>
        <p>建行个人客户</p>
        <h3>三、活动内容</h3>
        <p>活动期间，客户进入建行手机银行-悦享生活-更多服务—胖虎奢侈品鉴定养护页面，可参与以下两个活动：</p>
        <p>活动一：客户参与养护保养项目可享五折优惠，优惠订单共计300份。</p>
        <p>活动二：客户在胖虎商城购买活动商品，可享满2000元立减200元优惠，优惠订单共计700份。优惠数量有限，先到先得。</p>
        <h3>四、活动细则</h3>
        <p>1. 每位客户（同一手机号、同一客户ID视为同一客户）在活动期内活动一和活动二各可享受一次优惠。</p>
        <p>2. 客户需先登录建行APP才能享受活动优惠</p>
        <p>3. 活动以客户下单时间为准进行排序，下单后20分钟内需完成支付，否则订单自动取消，名额释放。</p>
        <p>4. 客户下单养护保养项目，成功付款后请在7天内寄出需维修保养的货物。如客户未能在7天内寄出，胖虎将为客户取消订单并在7天内退款。</p>
        <p>5. 客户购买活动商品，成功付款后1-3天发货。购买客户可享受48h换货（运费自理）。如需申请退款，请收到商品后第一时间致电胖虎客服，满足退货标准的，需1-2天内将商品退回，胖虎收到退回商品确认无误后7天内为客户退款。</p>
        <p>6. 所有下单购买商品客户在付款页面填写被保险人姓名、证件号码、电话后均可免费获得一份正品保障险。保险生效时间、保障范围、理赔流程等详见保单填写页面。</p>
        <p>7. 春节等特殊节假日发货时间、养护周期、退款时间等以活动页面公告为准。</p>
        <p>8. 本次活动由胖虎奢侈品负责处理、解决客户对活动相关事宜的争议，若服务中出现任何问题，可致电胖虎奢侈品客服热线4000865285咨询，中国建设银行仅提供支付结算服务，不提供任何形式的担保和承诺。</p>
        <p>9. 中国建设银行、胖虎奢侈品，在法律允许的范围内保留对本次活动的变更权，包括但不限于参与资格、对恶意刷单行为处理、暂停或取消本活动等，并经相关途径(如网站、短信、手机银行客户端内活动页面等)公告后生效。</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ph-topic-rule {
  background-color: #FFF;
  .wrapper {
    margin: 0 auto;
    max-width: 640px;
    overflow: hidden;
    padding-bottom: 1.25rem;
    clear: both;
    display: block;
    .yuanpang {
      margin-top: 0.25rem;
      padding: .75rem;
      color: #4c4c4c;
      h2 {
        font-size: .75rem;
        text-align: center;
      }
      h3 {
        margin-top: .75rem;
        font-size: .7rem;
      }
      p {
        font-size: .65rem;
        line-height: 1.2rem;
        color: #4c4c4c;
      }
    }
  }
}
</style>

