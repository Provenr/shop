<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">登录</header>
    <div class="login-content">
      <div class="login-logo">
        <img src="static/img/LOGO.png" alt="胖虎奢侈品">
      </div>
      <div class="login-content">
        <div class="list-block">
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media">
                  <i class="iconfont icon-tel"></i>
                </div>
                <div class="item-inner">
                  <div class="item-input">
                    <input type="number" placeholder="请输入手机号" oninput="if(value.length > 11) value = value.slice(0, 11)" v-model="loginForm.mobile">
                  </div>
                </div>
                <div class="item-clear" style="margin-right: 0.5rem" @click="clearTel">
                  <i class="iconfont icon-clear"></i>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <input type="number" placeholder="验证码" oninput="if(value.length > 6) value = value.slice(0, 6)" style="padding: 0;" v-model="loginForm.mobilecode">
                  </div>
                  <div class="item-clear hide" id="clearVcode" style="margin-right: 0.2rem;">
                    <i class="iconfont icon-clear"></i>
                  </div>
                </div>
                <input class="get-vcode" type="button" :disabled="disabled" :value="ttext" @click="getVCode">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="login-button" @click="submitLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { sendVCode, getUserInfo } from '@/api/user'
import { OldSetUserInfo } from '@/utils/auth'
import { validatMobile } from '@/utils/validate'
import tips from '@/utils/tip'

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        mobile: "",
        mobilecode: ""
      },
      disabled: false,
      ttext: '获取验证码'
    }
  },
  methods: {
    clearTel() {
      this.loginForm.mobile = ''
    },
    getVCode() {
      if(!validatMobile(this.loginForm.mobile)) {
        tips.toast('请输入正确的手机号')
        return
      }
      let that = this;
      let t = 60
      var timer = setInterval(function () {
        t--
        if (t > 0) {
            that.ttext = t + '秒后重试'
            that.disabled = true;
        } else {
            that.disabled = false;
            that.ttext = '获取验证码'
            clearInterval(timer)
        }
      }, 1000);
      sendVCode({ mobile: this.loginForm.mobile, type: 3 }).then(response => {}).catch(error => {
        console.log(error)
      })
    },
    submitLogin() {
      if(!validatMobile(this.loginForm.mobile)) {
        tips.toast('请输入正确的手机号')
        return
      }
      if(!this.loginForm.mobilecode) {
        tips.toast('请输入短信验证码')
        return
      }
      tips.loading('登陆中')
      this.$store.dispatch('LoginByUser', this.loginForm).then(() => {
        getUserInfo().then(user => {
          OldSetUserInfo(user.list)
        });
        tips.loaded()
        this.$router.push({ path: this.$route.query.url || '/' })
      }).catch(error => {
        tips.loaded()
        tips.toast(error)
      })
    }
  }
}
</script>

<style scoped>
.aui-row {
  overflow: hidden;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.login{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #fff
}
.login-btn{
  width: 80%;
  height: 2.5rem;
  border-radius: 0.45rem;
  text-align: center;
  line-height: 2.5rem;
  margin: 0 auto;
  border: 1px solidd #09B6F2;
}
.login-content {
	width: 100%;
	padding-top: 1rem;
}

.login-logo {
	margin: 0 auto;
	width: 4.4rem;
	height: 4.4rem;
}

.login-logo img {
  width: 4.4rem;
	height: 4.4rem;
}

.login-content .list-block {
	padding: 0 1.05rem;
	font-size: .7rem;
  margin-top: 0.93rem;
}

.list-block .item-content {
	box-sizing: border-box;
	padding-left: 0.75rem;
	min-height: 0.88rem;
	display: flex;
  justify-content: space-between;
	align-items: center;
}

.list-block .item-media {
	display: flex;
	flex-shrink: 0;
	flex-wrap: nowrap;
	box-sizing: border-box;
	align-items: center;
}

.list-block .item-inner {
	position: relative;
	width: 100%;
	min-height: 0.9rem;
	overflow: hidden;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.icon {
	font-family: "iconfont-sm" !important;
	font-style: normal;
	display: inline-block;
	vertical-align: middle;
	background-size: 100% auto;
	background-position: center;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}

.list-block .item-input {
	width: 100%;
	flex-shrink: 1;
}

.list-block .item-input input {
	margin: 0;
	line-height: 2.2rem;
	width: 90%;
	font-size: .7rem;
	padding: 0 0 0 15px;
	-webkit-user-select: text;
	border: none;
	border-radius: 3px;
	outline: 0;
	background-color: #fff;
  -webkit-appearance: none;
}
.iconfont{
	color: #C4C4C4;
}
.icon-clear {
	font-size: 1rem;
	color: #C4C4C4;
}
.icon-tel {
	color: #959595;
	font-size: 1rem;
}
.list-block li {
	border: 1px solid #c4c4c4;
	border-radius: 2rem;
}
.list-block li:first-child{
	margin-bottom: 0.5rem;
}
.get-vcode {
  background: #fff;
  width: 8.15rem;
  border:none;
  border-top-left-radius:0px;
  border-bottom-left-radius:0px;
  border-top-right-radius:0.4rem
  ;border-bottom-right-radius:0.4rem;
  border-left:1px solid #C4C4C5;
  color: #868686;
  outline: none;
  margin-right: .5rem
}
.btnWrapper {
	width: 100%;
	position: relative;
	bottom: 1rem;
}
.login-button {
	margin: 0.92rem 1.05rem 0;
  border: 1px solid;
  color:  #09B6F2;
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	border-radius: 1rem;
  font-size: .75rem;
  letter-spacing: 4px
}
.hide{
	display: none;
}
input[type=button], input[type=reset], input[type=submit] {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42;
  position: relative;
  display: inline-block;
  margin-bottom: 0;
  padding: 6px 12px;
  cursor: pointer;
  -webkit-transition: all;
  transition: all;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
  -webkit-transition-duration: .2s;
  transition-duration: .2s;
  text-align: center;
  vertical-align: top;
  white-space: nowrap;
  border-radius: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #fff;
  background-clip: padding-box;
}

</style>


