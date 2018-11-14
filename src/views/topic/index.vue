<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="$router.back(-1)">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{topic.title}}</div>
    </header>
    <div style="height:100vh;overflow:auto;">
      <vue-scroll :ops="ops" @load-before-deactivate="handleLBD" @load-start="handleLoadStart">
        <div class="ph-topic-title">
          <img :src="topic.image" />
        </div>
        <div class="ph-topic-goods">
          <goods-list :list="goodsList"></goods-list>
        </div>
      </vue-scroll>
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
      ops: {
        vuescroll: {
          mode: 'slide',
          pullRefresh: {
            enable: true
          },
          pushLoad: {
            enable: true,
            tips: {
              deactive: '',
              active: '',
              start: '加载中...',
              beforeDeactive: '已全部加载'
            },
            auto: false,
            autoLoadDistance: 10
          }
        }
      },
      page: 1,
      noData: false
    }
  },
  created() {
    this.getData(true)
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
      });
    },
    handleLoadStart(vm, dom, done) {
      let that = this;
      if (!that.noData) {
        that.page++;
        that.getData();
      }
      setTimeout(function(){
        done();
      }, 2000)
    },
    handleLBD(vm, refreshDom, done) {
      setTimeout(function(){
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
