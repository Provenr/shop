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
        <popup v-model="show_category" position="left" max-height="100%" width='60%'>
          <div class="left">
            <div v-for="(item, index) in firstCategoryList" :key="index" class="left-item" :class="['left-item', firstCategoryId == item.id ? 'activeColor' : '']"  @click="firstCategory(item.id)">{{item.name}}</div>
          </div>
          <div class="right">
            <div v-for="(item, index) in secondCategoryList" :key="item.id" class="right-item" @click="secondCategory(item.id)">{{item.name}} {{index}}</div>
          </div>
      </popup>
      </div>
      <div class="brand"  v-transfer-dom>
        <popup v-model="show_brand" position="left"  width="100%">
        <group>
          <brand-list></brand-list>
         <div class="brand-item" @click="chooseBrand()">发布时间</div>
        </group>
      </popup>
      </div>
      <div class="sort"  v-transfer-dom>
        <popup v-model="show_sort" position="bottom" max-height="50%">
          <group>
            <div class="sort-item" @click="toSort('time')">发布时间</div>
            <div class="sort-item" @click="toSort('up')">价格升序</div>
            <div class="sort-item" @click="toSort('dowm')">价格降序</div>
          </group>
        </popup>
      </div>
      <div class="filter"  v-transfer-dom>
        <popup v-model="show_filter" position="right" max-height="100%" width="60%">
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
      <goods-list :list='goodsList'></goods-list>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList'
import BrandList from '@/components/BrandList'

import { getBrandList, getFirstCate } from '@/api/goods'
import tips from '@/utils/tip'

import { TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData } from 'vux'

export default {
  name: 'shop',
  directives: {
    TransferDom
  },
  components: {
    GoodsList,
    BrandList,
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
      activeCateItem: 1,

      firstCategoryId: '',
      secondCategoryId: '',
      brandid: '',
      sortType: '', // 排序

      secondCate: new Map(),

      filterList: [],
      firstCategoryList: [],
      secondCategoryList: [],
      brandlist:[],
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
        getBrandList().then(res => {
          let brandlist = res.BrandList;
          this.brandlist = dealBrandList(brandlist);
        });
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
      this.firstCategoryId = id;
      this.activeCateItem = id;

      // 设置 二级分类
      this.secondCategoryList = this.secondCate.get(id);
      console.log("一级分类id" + id)
    },
    secondCategory(id) {
      this.secondCategoryId = id;
      console.log("二级分类id" + id)
      this.show_category = false
    },
    toSort(param) {
      console.log("排序方法" + param)
      this.show_sort= false
    },
    chooseBrand(id) {

      console.log("品牌id" + id)
      this.show_brand = false
    },
    chooseFilter(id) {
       console.log("品牌id" + id)
      this.show_brand = false
    }
  },
  mounted() {
    let _this = this;
    _this.title = this.$route.meta.title;
    getFirstCate().then(res =>{
      // console.log(res)
      let firstCate = [];
      let Category_list = res.list;

      // this.activeCateItem = Category_list[0].id; // 默认 第一个一级分类id 为选中状态
      this.firstCategoryId = Category_list[0].id; // 默认 第一个一级分类id 为选中状态

      for (let item of Category_list){
        // console.log(item)
        let id = item.id;
        let name = item.name;
        firstCate.push({id, name}); // 一级分类

        this.secondCate.set(id, item.chilids);
      }

      this.firstCategoryList = firstCate;

      let _firstCategoryId = this.firstCategoryId
      console.log(this.secondCate)

      this.secondCategoryList = this.secondCate.get(_firstCategoryId);

      console.log(_firstCategoryId)
      console.log(this.secondCate.get())
      console.log(this.secondCategoryList)
    })
  }
}

function dealBrandList(arr) {
  let all = [];
  let baseArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
  for(let i of baseArr){
    let tmp = $.Enumerable.From(arr)
      .Where("x => x.first_letter==i")
      .Select()
      .ToArray();
      all[i] = tmp;
  }


  let B = $.Enumerable.From(arr)
  .Where("x => x.first_letter=='A'")
  .Select()
  .ToArray();
  console.log(all)

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
    // top: 4.25rem;
    top: 0;
    height: 100%;
    overflow-y: scroll;
    // background: #F7F7F7;
    .left-item{

      border-bottom: 1px solid #ccc;
      line-height: 2rem;
      // padding: 0 0.3rem;
      padding: 0.3rem 0;
      text-align: center;
    }
  }
  .right{
    flex-grow: 1;
    background: #fff;
    overflow-y: auto;
    box-sizing: border-box;
    margin-left: 4rem;
    height: 100%;

    .right-item{
      background: #fff;
      border-bottom: 1px solid #f7f7f7;
      line-height: 2rem;
      padding: 0 0.3rem;
    }
  }
}
.vux-popup-dialog.vux-popup-top{
  top: 4.25rem !important;
}
.sort-item{
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.sort-item:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 0;
}
.weui-cell{
  text-align: left;
}
.activeColor{
  background: #fff;
}
</style>


