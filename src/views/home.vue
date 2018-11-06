<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">{{title}}</header>
    <footer class="aui-bar aui-bar-tab" id="footer" >
      <div class="aui-bar-tab-item aui-active" tapmode @click="tabchange('/home')">
        <i class="iconfont icon-home"></i>
        <div class="aui-bar-tab-label">首页</div>
      </div>
      <div class="aui-bar-tab-item" tapmode @click="tabchange('/cart')">
        <div class="aui-badge">99</div>
        <i class="iconfont icon-xinyuandan"></i>
        <div class="aui-bar-tab-label">心愿单</div>
      </div>
      <div class="aui-bar-tab-item" tapmode @click="tabchange('/mine')">
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
      title:'胖虎商城'
    }
  },
  methods: {
    tabchange(name){
      let _this = this;
      _this.$router.push({ path: name });
    }
  },
  mounted() {
    console.log(this.$route)
    console.log(this.$route.matched.title)
  }
}
</script>

<style scoped>

</style>


