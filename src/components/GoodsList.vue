<!-- 竖排商品列表组件 -->
<template>
<section class="good-list">
  <div class="good-item" target="_blank" v-for="item in list" :key="item.goodsId" @click="to(item.goodsId)">
     <div class="good-img">
        <img v-lazy="item.img" alt="">
        <div class="sold-out" v-if="item.shelevs_type==3">
          <img class="out_icon" src="static/img/goods_sq.png" alt="">
        </div>
      </div>
      <div class="good-info">
        <div class="aui-ellipsis-1 good-name fz26">{{item.name}}</div>
        <div class="good-price-wrapper">
          <div class="good-price-box" v-if="item.status==1">
            <span class="red fz32"><i class="fz18">特价 ¥</i>{{item.price}}</span>
            <del class="fz18">原价¥{{item.del}}</del>
          </div>
          <div class="good-price-box" v-else>
            <span class="fw"><i class="fz18">¥</i>{{item.price}}</span>
          </div>
        </div>
      </div>
  </div>
</section>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    to(gid) {
      this.$router.push({name: 'goodsDetail', params: {id: gid}, query: { url: this.$router.history.current.fullPath } })
    }
  }
}
</script>

<style lang="less" scoped>
.red{
  color: #FC2A3E;
  font-weight: 600;
}

i{
  font-style: normal;
  font-weight: 500;
}
.good-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .good-item {
    margin-bottom: 0.45rem;
    height: 12.05rem;
    width: calc((100% - 0.45rem) / 2);
    background: #fff;
    &:nth-child(2n+1){
      margin-right: 0.45rem;
    }
    .good-img {
      // width: 8.7rem;
      height: 8.7rem;
      position:relative;
      img {
        display: block;
        // width: 8.7rem;
        height: 8.7rem
      }
      .sold-out {
        height: 100%;
        width: 100%;
        background:transparent;
        background:rgba(0,0,0,0.2);
        position: absolute;
        top: 0;
        z-index: 12;
        .out_icon {
          position: absolute;
          top: 50%;
          left: 50%;
          -ms-transform: translate(-50%,-50%);
          -moz-transform: translate(-50%,-50%);
          -o-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
          color: #fff;
          width: 4rem;
          height: 4rem;
        }
      }
    }
    .good-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 .3rem;
      flex-grow: 1;
      .good-name {
        width: 100%;
        line-height: 1.5;
        color: #333;
        margin: .4rem 0;
      }
      .good-price-wrapper {
        // position: absolute;
        display: flex;
        justify-content: space-between;
        bottom: 0;
        left: 0;
        .good-price-box {
          font-size: 0.85rem;
          font-weight: 500;
          del {
            color: #999;
            margin-left: 0.35rem;
          }
        }
      }
    }
  }

}
</style>
