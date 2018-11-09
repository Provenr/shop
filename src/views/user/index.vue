<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">个人中心</header>


  </div>
</template>

<script>
// import
export default {
  name: 'login',
  data() {
    return {
      title: '',
    }
  },
  mounted() {
    let _this = this;
    _this.title = this.$route.meta.title;
  },
  methods: {
    tabchange(name){
      let _this = this;
      _this.selected = name;
      _this.$router.push({ path: name });
    }
  },

}
</script>

<style scoped>

</style>


