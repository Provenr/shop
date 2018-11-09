<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">{{title}}</header>
    <div class="ph-shop-filter">
      <div class="aui-col-xs-3" :class="selected == 'category' ? 'selectedClass' : ''" @click="tabchange('category')">
        <span>类别</span>
        <i :class="[selected == 'brand' ? 'icon-arrow-up' : 'icon-arrow-down','iconfont']"></i>
      </div>
      <div class="aui-col-xs-3" :class="selected == 'brand' ? 'selectedClass' : ''" @click="tabchange('brand')">
        <span>品牌</span>
        <i :class="[selected == 'brand' ? 'icon-arrow-up' : 'icon-arrow-down','iconfont']"></i>
      </div>
      <div class="aui-col-xs-3" :class="selected == 'sort' ? 'selectedClass' : ''" @click="tabchange('sort')">
        <span>排序</span>
        <i :class="[selected == 'brand' ? 'icon-arrow-up' : 'icon-arrow-down','iconfont']"></i>
      </div>
      <div class="aui-col-xs-3" :class="selected == 'filter' ? 'selectedClass' : ''" @click="tabchange('filter')">
        <span>筛选</span>
        <i class="iconfont icon-filter"></i>
      </div>
    </div>
    <div class="ph-shop-filter-content">
      <div class="category"  v-transfer-dom>
        <popup v-model="show_category" position="top" max-height="100%">
          <div class="left">
              <div v-for="i in 20" :key="i" class="left-item" @click="firstCategory(i)">{{i}}+'left'</div>
          </div>
          <div class="right">
            <div v-for="i in 20" :key="i" class="right-item" @click="secondCategory(i)">{{i}}+'right'</div>
          </div>
      </popup>
      </div>
      <div class="brand"  v-transfer-dom>
        <popup v-model="show_brand" position="left"  width="100%">
        <group>
          <cell v-for="i in 20" :key="i" :title="i"></cell>
        </group>
        <div style="padding: 15px;">
          <x-button  plain type="primary"  @click.native="show_brand = false"> Close Me </x-button>
        </div>
      </popup>
      </div>
      <div class="sort"  v-transfer-dom>
        <popup v-model="show_sort" position="bottom" max-height="50%">
        <group>
          <cell>发布时间</cell>
          <cell>价格升序</cell>
          <cell>价格降序</cell>
        </group>
      </popup>
      </div>
      <div class="filter"  v-transfer-dom>
        <popup v-model="show_filter" position="right" max-height="50%">
          <group>
            <cell v-for="i in 20" :key="i" :title="i"></cell>
          </group>
          <div style="padding: 15px;">
            <x-button @click.native="show_filter = false" plain type="primary"> Close Me </x-button>
          </div>
        </popup>
      </div>

    </div>

    <section class="topic-head-img">
      <img :src="headimg" alt="altText"/>
    </section>

    <div class="content">
      <div class="count-total fz22">
        共为你找到{{ph_goods_total}}个商品
      </div>
      <goods-list :List='goodsList'></goods-list>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList'
import { TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData } from 'vux'
export default {
  name: 'shop',
  directives: {
    TransferDom
  },
  components: {
    GoodsList,
    Popup,
    TransferDom,
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      title: '',
      selected: '',
      show_category: false,
      show_brand: false,
      show_sort: false,
      show_filter: false,
      ph_goods_total:'123456',
      headimg:'https://img-zscdn.ponhu.cn/FsrUhU8lFrpki6bk1spi2ffuW0K5',
      goodsList: [
        {
          goodsId: 453069,
          price: "7288",
          del: "13999",
          status:1,
          img: "https://img-ppcdn.ponhu.cn/Fr09uZEPaVVbxypQacKP8UIwILWv?imageView2/1/w/640/h/540",
          name: "98新香奈儿方胖子链条包98新香奈儿方胖子链条包98新香奈儿方胖子链条包9"
        },
        {
          goodsId: 290764,
          price: "6888",
          del: "10999",
          status:2,
          img: "https://img-ppcdn.ponhu.cn/Fr_Y0bqEcOsND9TUIAW1AV3ajAni?imageView2/1/w/640/h/540",
          name: "95新 LV老花邮差包LV老花邮差包LV老花邮差包L"
        },
        {
          goodsId: 456746,
          price: "8666",
          del: "11599",
          status:3,
          img: "https://img-ppcdn.ponhu.cn/Fj2dxeWanYPaDKDqbtksVMzem5oK?imageView2/1/w/640/h/540",
          name: "95新古驰Padlock两用包"
        }
      ]
    }
  },

  methods: {
    tabchange(name){
      let _this = this;
      _this.selected = name;
      if(name == 'category') {
        this.show_category = true;
        return
      }
      if(name == 'brand') {
        this.show_brand = true;
        return
      }
      if(name == 'filter') {
        this.show_filter = true;
        return
      }
      if(name == 'sort') {
        this.show_sort = true;
        return
      }

    },
    firstCategory(id) {

    },
    secondCategory(id) {
      this.show_category = false
    }
  },
  mounted() {
    let _this = this;
    _this.title = this.$route.meta.title;
  }
}
</script>

<style lang="less" scoped>
.selectedClass{
  color: #09B6F2;
}

.topic-head-img{
  height: 10.5rem;
  img{
    display: block;
    width: 100%;
    height: 10.5rem;
  }
}
.ph-shop-filter{
  height: 2rem;
  padding: 0 0.3rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: fixed;
  width: 100%;
}
.content{
  padding: 0 .45rem 0.45rem;
  background: #F7F7F7
}
.count-total{
  height: 2.2rem;
  line-height: 2.2rem;
}
.category{
  display: flex;
  flex-grow: 1;
  .left{
    width: 4rem;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    overflow-y: scroll;
    background: #F7F7F7;
    .left-item{
      background: #fff;
      margin-bottom: 1px;
      line-height: 2rem;
      padding: 0 0.3rem;
      text-align: center;
    }
  }
  .right{
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    margin-left: 4.2rem;

    .right-item{
      background: #fff;
      margin-bottom: 1px;
      line-height: 2rem;
      padding: 0 0.3rem;
    }
  }
}
</style>


