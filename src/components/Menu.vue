<template>
  <div>
   <footer class="aui-bar aui-bar-tab" id="footer" >
      <div class="aui-bar-tab-item" tapmode @click="tabchange('/home')">
        <i class="iconfont icon-home"></i>
        <div class="aui-bar-tab-label">首页</div>
      </div>
      <div class="aui-bar-tab-item aui-active"  tapmode @click="tabchange('/cart')">
        <div class="aui-badge">99</div>
        <i class="iconfont icon-xinyuandan"></i>
        <div class="aui-bar-tab-label">心愿单</div>
      </div>
      <div class="aui-bar-tab-item"  tapmode @click="tabchange('/mine')">
        <div class="aui-dot"></div>
        <i class="iconfont icon-mine"></i>
        <div class="aui-bar-tab-label">我的</div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    methods:{
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
    }
  }
</script>

<style scoped>

</style>