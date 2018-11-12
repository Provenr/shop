<!-- 竖排商品列表组件 -->
<template>
  <div class="good-list">
    <div v-for="item in List" :key="item.goodsId" class="good-item" @click='toGoodDetail(item.goodsId)'>
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
          <div class="btn defaut-btn fz26" v-if='item.status == 1' @click.stop="toGoodDetail(item.goodsId)">马上抢</div>
          <div class="btn end-btn fz26" v-if='item.status == 2' @click.stop="toGoodDetail(item.goodsId)">已售罄</div>
          <div class="btn defaut-btn fz26" v-if='item.status == 3' @click.stop="toGoodDetail(item.goodsId)">购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    List: {
      type: Array
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
.good-list {
  background: #fff;
  .good-item {
    border-top: 1px solid #eee;
    height: 6.85rem;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    .good-img {
      width: 5.25rem;
      height: 5.25rem;
      margin-right: 1.15rem;
      img {
        display: block;
        width: 5.25rem;
        height: 5.25rem;
      }
    }
    .good-info {
      height: 5.25rem;
      flex-grow: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .good-name {
        width: 10.525rem;
        line-height: 1.5;
      }
      .good-price-wrapper {
        // position: absolute;
        display: flex;
        justify-content: space-between;
        bottom: 0;
        left: 0;
        .good-price-box {
          font-size: 0.85rem;
          color: #fc2a3e;
          font-weight: 500;
          del {
            font-size: 0.65rem;
            color: #999;
            margin-left: 0.75rem;
          }
        }
        .btn {
          // position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
}
</style>
