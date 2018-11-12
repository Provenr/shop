<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="$router.back(-1)">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{topic.title}}</div>
    </header>
    <div class="ph-topic-title">
      <img :src="topic.image" />
    </div>
    <div class="ph-topic-goods">
      <goods-list :list="goodsList"></goods-list>
    </div>
  </div>
</template>

<script>
import { getTopicInfo } from '@/api/goods'
import tips from '@/utils/tip'

import GoodsList from '@/components/GoodsList'

export default {
  name: 'topics',
  components: { GoodsList },
  data() {
    return {
      topic: {},
      goodsList: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      let that = this;
      tips.loading();
      getTopicInfo(this.$route.params.id).then(res => {
        this.topic = res.special;
        // 商品
        let glist = res.list;
        glist.forEach(function (item) {
          that.goodsList.push({
            goodsId: item.id,
            img: item.goods_images,
            name: item.goods_name,
            status: item.is_discount,
            price: item.is_discount==0?item.goods_price:item.discount_price,
            del: item.goods_price
          });
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.ph-topic-title {
  margin: 0 auto;
}
.ph-topic-goods {
  padding: .45rem;
}
</style>
