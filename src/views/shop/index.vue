<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left aui-btn" @click="$router.back(-1)">
        <span class="iconfont icon-leftarrow" style="font-size: 1rem"></span>
      </a>
      <div class="aui-title">{{title}}</div>
    </header>
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
            <div v-for="item in secondCategoryList" :key="item.id" class="right-item" @click="secondCategory(item.id)">{{item.name}}</div>
          </div>
      </popup>
      </div>
      <div  v-transfer-dom>
        <popup v-model="show_brand" position="left"  width="100%" should-scroll-top-on-show >
          <div class="brand">
          <group>
            <brand-list :Alphabetic="index_list" @jump='anchor'></brand-list>
            <div class="brand-box vux-scrollable" v-for="(value, key) in brandlist" :key="key">
              <div class="brand-title" :id="key">{{key}}</div>
              <div v-for="item in value" :key='item.id' @click="chooseBrand(item.id)" class="brand-item line">
                <span class="logo">
                  <!-- <img :src="item.logo" alt="" srcset=""> -->
                </span>
                <span class="brand-name">{{item.name}}</span>
              </div>
            </div>
          </group>
          </div>
      </popup>
      </div>
      <div class="sort"  v-transfer-dom>
        <popup v-model="show_sort" position="bottom" max-height="50%">
          <group>
            <div class="sort-item" @click="toSort(1)">发布时间</div>
            <div class="sort-item" @click="toSort(2)">价格升序</div>
            <div class="sort-item" @click="toSort(3)">价格降序</div>
          </group>
        </popup>
      </div>
      <div class="filter"  v-transfer-dom>
        <popup v-model="show_filter" position="right" max-height="100%" width="80%" :hide-on-blur=false>
          <group>
            <div class="filter-wrapper">
              <div class="filter-tit">价格</div>
              <div class="filter-box">
                <div class="filter-btn price-btn" v-for="(val,key) in filterParam.price" :key="key" :class="where.filterPrice == key ? 'filtercheck': ''">{{val}} 
                  <input type='radio' :value='key' v-model="where.filterPrice" style="opcility:0;">
                </div>
              </div>
              <div class="filter-tit">适用人群</div>
              <div class="filter-box">
                <div class="filter-btn gender-btn" v-for="(val,key) in filterParam.gender" :key="key" :class="where.filterGender == key ? 'filtercheck': ''">{{val}}
                   <input type='radio' :value='key' v-model="where.filterGender" style="opcility:0;">
                </div>
              </div>
              <div class="filter-tit">成色</div>
              <div class="filter-box">
                <div class="filter-btn gender-btn" v-for="(val,key) in filterParam.fineness" :key="key" :class="where.filterFineness == key ? 'filtercheck': ''">{{val}}
                   <input type='radio' :value='key' v-model="where.filterFineness" style="opcility:0;">
                </div>
              </div>
            </div>
          </group>
          <div class="filter-btn-wrapper">
            <button @click="filterCancel"  class="cancel">取消</button>
            <button @click="filterConfirm" >确定</button>
          </div>
        </popup>
      </div>

    </div>
    <vue-scroll :ops="ops" @load-before-deactivate="handleLBD" @load-start="handleLoadStart">
      <section class="topic-head-img">
        <img :src="headimg" alt="altText"/>
      </section>

      <div class="content">
        <div class="count-total fz22">
          共为你找到{{ph_goods_total}}个商品
        </div>
          <goods-list :list='goodsList'></goods-list>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList'
import BrandList from '@/components/BrandList'

import { getBrandList, getFirstCate, getOptimalGoods} from '@/api/goods'
import tips from '@/utils/tip'

import { TransferDom, Popup, Group} from 'vux'

export default {
  name: 'shop',
  directives: {
    TransferDom
  },
  components: {
    GoodsList,
    BrandList,
    Popup,

    Group
  },
  data() {
    return {
      title: '',
      selected: '', // tab切换 选择状态

      show_category: false, // popup 显隐状态
      show_brand: false,
      show_sort: false,
      show_filter: false,
      nodata: false,

      ph_goods_total:'123456', //总商品数量

      page: 1, // 页码
      // 过滤条件
      filterParam:{
        'price':{
          1:"¥1000以下",
          2:"¥1000-5000",
          3:"¥5000-1万",
          4:"¥1万-10万",
          5:"¥10万以上",
        },
        'gender':{
          1:'所有人',
          2:'男士',
          3:'女士'
        },
        'fineness':{
          1:'全新',
          2:'98新',
          3:'95新',
          4:'9新',
          5:'85新',
        }
      }, 

      ops: {
        vuescroll: {
          mode: 'slide',
          pullRefresh: {
            enable: false
          },
          pushLoad: {
            enable: true,
            tips: {
              deactive: '',
              active: '',
              start: '加载中...',
              beforeDeactive: '加载完成'
            },
            auto: false,
            autoLoadDistance: 10
          }
        }
      },

      firstCategoryId: '',
      // secondCategoryId: '',
      // brandId: '',
      // sortType: '', // 排序

      // filterPrice:null,  
      // filterGender:null,      
      // filterFineness:null,      

      secondCate: new Map(),


      // filterList: [],
      where: { 
        storeid: 110,
        secondCategoryId: '', 
        brandId: '', 
        sortType: '', 
        filterPrice: '',
        filterGender: '',
        filterFineness: ''
      },
      
      firstCategoryList: [], // 一级分类列表
      secondCategoryList: [], // 二级分类列表
      brandlist:[], // 品牌列表
      index_list:[], // 字母索引
      headimg:'https://img-zscdn.ponhu.cn/FsrUhU8lFrpki6bk1spi2ffuW0K5', // banner图
      goodsList: []
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
          let brandlist = res.list;
          this.brandlist = dealBrandList(brandlist).brand_list;
          this.index_list = dealBrandList(brandlist).index_list;
          // console.log(this.brandlist)
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
      // 设置 二级分类
      this.secondCategoryList = this.secondCate.get(id);
    },
    secondCategory(id) {
      this.where.secondCategoryId = id;
      this.show_category = false
      this.getData(true)
    },
    toSort(param) {
      this.where.sortType = param;
      this.show_sort = false
      this.getData(true)
    },
    chooseBrand(id) {
      this.where.brandId = id;
      this.show_brand = false
      this.getData(true)
    },
    chooseFilter(id) {
      this.show_brand = false
    },
    anchor(anchorId) {
      console.log(anchorId)
      let el = '#' + anchorId;
      let node = document.querySelector(el);
      let node_wrapper = document.querySelector('.brand');
      let _Top = node.offsetTop;
        node.scrollIntoView()

        // node_wrapper.scrollTop = _Top;  // todo 滚动 兼容
    },
    filterCancel() {
      this.show_filter = false;
      this.where.filterPrice = '';
      this.where.filterGender = '';
      this.where.filterFineness = '';
    },
    filterConfirm(){
      this.show_filter = false;
      this.getData(true)
    },
    //  获取数据
    getData(refresh) {
      let _this = this;
      getOptimalGoods(this.where, this.page).then(res => {
        console.log(res)
        _this.ph_goods_total = res.goodsnum
        
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
              price: item.ph_price,
              del: item.original_price
            });
          });
          if (refresh) {
            _this.goodsList = _glist;
          } else {
            _this.goodsList = [..._this.goodsList, ..._glist];
          }
          this.noData = false;
        }
        else {
          this.noData = true;
        }
        tips.loaded()
      });
    },
    handleLoadStart(vm, dom, done) {
      let _this = this;
      if (!_this.noData) {
        _this.page++;
        _this.getData();
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
  },
  mounted() {
    let _this = this;
    _this.title = this.$route.meta.title;

    //  商品数据
    tips.loading();
    _this.getData(true)
    // 分类列表
    getFirstCate().then(res =>{
      // console.log(res)
      let firstCate = [];
      let Category_list = res.list;

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
      // console.log(this.secondCate)

      this.secondCategoryList = this.secondCate.get(_firstCategoryId);

    })
  }
}

function dealBrandList(arr) {
  let all = {};
  all['brand_list'] = {}; //  品牌列表
  all['index_list'] = []; //  字母索引表
  let baseArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
  let _index = []; 
  for(let i of baseArr){
    let tmp = $.Enumerable.From(arr)
      .Where("val => val.first_letter=='" + i + "'")
      .Select()
      .ToArray();
      if(tmp.length > 0) {
        all['brand_list'][i] = tmp;
        all['index_list'].push(i)
      }else{
        
      }
  }
  return all
}

</script>

<style lang="less" scoped>
.filtercheck{
  background: #09B6F2 !important;
  color: #fff;
}
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
  border-bottom:1px solid #f7f7f7;
  height: 2rem;
  padding: 0 0.3rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: fixed;
  width: 100%;
  z-index: 10;
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
}

.weui-cell{
  text-align: left;
}
.activeColor{
  background: #fff;
}

.brand-title{
  background: #f7f7f7;
  padding: 0 0.8rem;
  line-height: 1.5rem;
}
.brand-item{
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
  line-height: 2.5rem;
  .logo{
    width: 3rem;
    // height: 2rem;
    img{
      display: block;
      width: 3rem;
      // height: 2rem;
    }
  }
  .brand-name{
    margin-left: .4rem;
    font-size: 0.44rem;
  }
}
.brand{
  height: 100%;
  overflow: auto;
}
.sort{
  .sort-item{
    font-size:.65rem;
  }
}
.filter-box{
  display: flex;
  flex-wrap: wrap;
  padding: 0 .5rem;
  // justify-content: space-between;
}
.filter-tit{
  padding: .5rem;
  font-size: .7rem;
}
.filter-btn{
  width: 30%;
  font-size: .5rem;
  margin-right: .3rem;
  background: #f7f7f7;
  margin-bottom: .5rem;
  text-align: center;
  line-height: 1.5rem;
  position: relative;
  input{
    width: 100%;
    height: 1.5rem;
    display: block;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    opacity:0;    
  }
}
.filter-box{

}
.filter-btn-wrapper{
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  button{
    margin: 0;
    padding: 0;
    border: 1px solid transparent;  //自定义边框
    outline: none;
    width: 3rem;
    height: 1.5rem;
    background: #09B6F2;
    color: #fff;
  }
  .cancel{
    background: #eee;
    color: #333;
    border: 1px solid #09B6F2;
  }
}
</style>


