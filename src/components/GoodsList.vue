<!-- 竖排商品列表组件 -->
<template>
<section class="good-list">
  <div class="good-item"  v-for="item in List" :key="item.goodsId">
     <div class="good-img">
          <img :src="item.img" alt="">
      </div>
      <div class="good-info">
        <div class="aui-ellipsis-1 good-name fz26">{{item.name}}</div>
        <div class="good-price-wrapper">
          <div class="good-price-box" v-if="item.status=='1'">
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
    List: {
      type: Array,
      default: ""
    }
  },
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit("input", event.target.value)
      }
    },

  },
  methods: {
    toGoodDetail(id) {
      console.log(id)
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
  .good-item {
    margin-bottom: 0.45rem;
    height: 12.05rem;
    width: 8.7rem;
    // display: flex;
    // align-items: center;
    background: #fff;
    &:nth-child(2n+1){
      margin-right: 0.45rem;
    }
    .good-img {
      width: 8.7rem;
      height: 8.7rem;
      img {
        display: block;
        width: 8.7rem;
        height: 8.7rem
      }
    }
    .good-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 .3rem;
      flex-grow: 1;
      .good-name {
        width: 8.675rem;
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
