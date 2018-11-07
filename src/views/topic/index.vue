<template>
  <div class="aui-content-padded">
    <div class="aui-btn aui-btn-block aui-btn-warning" @click="dialoga()">dialog1</div>
    <div class="aui-btn aui-btn-block aui-btn-warning" @click="dialogb()">dialog2</div>
    <div class="aui-btn aui-btn-block aui-btn-warning" @click="login()">登陆请求</div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import tips from '@/utils/tip'

export default {
  name: 'login',
  data() {
    return {}
  },
  methods: {
    toasta() {
      tips.success("保存成功")
    },
    toastb() {
      tips.error("失败")
    },
    toastc() {
      tips.loading();
      setTimeout(function () {
        tips.loaded();
      }, 3000)
    },
    dialoga() {
      tips.alert("保存成功", "温馨提示")
    },
    dialogb() {
      tips.confirm('确认删除选择的代理商家？').then(() => {
        console.log('then方法');
      }).catch((error) => console.log(error));
    },
    login() {
      login({ mobile: 18627316306, password: '123456' }).then(data => {
        console.log(data);
      });
    }
  }
}
</script>

<style lang="less" scoped>
.home-sale-wrapper{
  margin: .6rem 0;
  box-sizing: border-box;
  .time-list{
    background: #fff;
    ul{
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      // height: 2.5rem;
      box-sizing: border-box;
      li{
        width: 3.6rem;
        height: 2.5rem;
        display: inline-block;
        z-index: 1111;
        padding:0.3rem;
        div{
          // height: 2.5rem;

          width: 1.6rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          .time{

          }
        }

        &.active {
          color: #FC2A3E;
          border-bottom: .1rem solid;
          // &::after{
          //   content: '';
          //   display: block;
          // }
        }
      }
    }
  }
}
</style>
