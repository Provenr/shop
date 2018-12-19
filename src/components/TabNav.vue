<template>
   <nav class="mui-bar mui-bar-tab">
      <a  :class="['mui-tab-item',active == 'home' ? 'mui-active' : '']">
        <span class="mui-icon iconfont icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a  :class="['mui-tab-item',active == 'cart' ? 'mui-active' : '']" @click.prevent="cart">
        <span class="mui-icon iconfont icon-xinyuandan"></span>
        <span class="mui-tab-label">心愿单</span>
      </a>
      <a  :class="['mui-tab-item',active == 'mine' ? 'mui-active' : '']" @click.prevent="userCenter">
        <span class="mui-icon iconfont icon-mine"></span>
        <span class="mui-tab-label">我的</span>
      </a>
  </nav>
</template>
<script>
export default {
  data(){
    return{
      toUrl: process.env.WAP_URL
    }
  },
  props: {
   active: {
      type: String,
    },
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  methods:{
    userCenter: function() {
      let rurl = this.toUrl + "/pages/mine/index.html";
      if (this.token) {
        location.href = rurl;
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    cart() {
      if (this.token) {
        this.$router.push({path: '/goods/balance/cart', query: {flag: 'tab'}})
      } else {
        this.$router.replace({
          path: "/login",
          query: { url: this.$router.history.current.fullPath }
        });
      }
    },
    home() {
       this.$router.push({
          path: "/home",
        });
    }
  }
}
</script>

<style lang="less" scoped>
.mui-bar {
  position: fixed;
  z-index: 10;
  right: 0;
  left: 0;
  height: 0.5rem;
  line-height: 1.2;
  background-color: #fff;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  //box-shadow: 0 0 1px rgba(0,0,0,.85);
}
.mui-bar .iconfont{
  font-size: 1.2rem;
}
.mui-bar-tab {
  bottom: 0;
  display: table;
  width: 100%;
  height: 50px;
  padding: 0;
  table-layout: fixed;
  border-top: 0;
  border-bottom: 0;
  -webkit-touch-callout: none;
}

.mui-bar-tab .mui-tab-item {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item.mui-active {
  color: #09B6F2;
}

.mui-bar-tab .mui-tab-item .iconfont{
  top: 3px;
  width: 24px;
  height: 24px;
}
.mui-bar-tab .mui-tab-item .mui-icon~.mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis
}

.mui-bar-tab .mui-tab-item .mui-icon:active {
    background: 0 0
}

.mui-focusin>.mui-bar-header-secondary,.mui-focusin>.mui-bar-nav {
    position: absolute
}
</style>

