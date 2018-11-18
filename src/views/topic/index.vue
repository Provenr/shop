<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="$router.back(-1)">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{topic.title}}</div>
    </header>
    <div class="ph-scroller">
      <scroller :on-infinite="infinite" :noDataText="noDataTxt" ref="my_scroller" style="padding-top:2.25rem">
        <div class="ph-topic-title">
          <img :src="topic.image" />
        </div>
        <div class="ph-topic-goods">
          <goods-list :list="goodsList"></goods-list>
        </div>
      </scroller>
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
      sid: this.$route.params.id,
      topic: {},
      goodsList: [],
      page: 0,
      noData: false,
      noDataTxt: '已全部加载'
    }
  },
  created() {
    //this.getData(true)
  },
  methods: {
    // 获取数据
    getData(refresh) {
      let that = this;
      getTopicInfo(this.sid, this.page).then(res => {
        this.topic = res.special;
        // 商品
        let glist = res.list;
        let _glist = [];
        if(glist) {
          glist.forEach(function (item) {
            _glist.push({
              goodsId: item.id,
              img: item.goods_images,
              name: item.goods_name,
              status: item.is_discount,
              price: item.is_discount==0?item.goods_price:item.discount_price,
              del: item.goods_price
            });
          });

          if (refresh) {
            that.goodsList = _glist;
          }
          else {
            that.goodsList = [...that.goodsList, ..._glist];
          }
          this.noData = false;
        }
        else {
          this.noData = true;
        }
      }).catch(error => {
        tips.alert(error)
      });
    },
    infinite: function (done) {
      if(this.noData) {
        this.$refs.my_scroller.finishInfinite(true);
        return;
      }
      var that = this
      setTimeout(function () {
        that.page++;
        that.getData();
        done();
      }, 2000)
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
