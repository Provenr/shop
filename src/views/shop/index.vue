<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">{{title}}</header>

    <section class="topic-head-img">
      <img :src="headimg" alt="altText"/>
    </section>

    <div class="content">
      <goods-list :List='goodsList'></goods-list>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList'
export default {
  name: 'shop',
   components: {
    GoodsList
  },
  data() {
    return {
      title: '',
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
      _this.$router.push({ path: name });
    }
  },
  mounted() {
    let _this = this;
    _this.title = this.$route.meta.title;
  }
}
</script>

<style lang="less" scoped>
.topic-head-img{
  height: 10.5rem;
  img{
    display: block;
    width: 100%;
    height: 10.5rem;
  }
}
.content{
  padding: .45rem;
}
</style>


