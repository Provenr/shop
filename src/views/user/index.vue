<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">个人中心</header>

    <div class="content">



    </div>

    <footer class="aui-bar aui-bar-tab" id="footer" >
      <div class="aui-bar-tab-item" tapmode @click="tabchange('/home')">
        <i class="iconfont icon-home"></i>
        <div class="aui-bar-tab-label">首页</div>
      </div>
      <div class="aui-bar-tab-item"  tapmode @click="tabchange('/cart')">
        <div class="aui-badge">99</div>
        <i class="iconfont icon-xinyuandan"></i>
        <div class="aui-bar-tab-label">心愿单</div>
      </div>
      <div class="aui-bar-tab-item aui-active"  tapmode @click="tabchange('/mine')">
        <div class="aui-dot"></div>
        <i class="iconfont icon-mine"></i>
        <div class="aui-bar-tab-label">我的</div>
      </div>
    </footer>
  </div>
</template>

<script>
// import
export default {
  name: 'login',
  data() {
    return {
      selected: '/mine'
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
    console.log($route)
  }
}
</script>

<style scoped>

</style>


