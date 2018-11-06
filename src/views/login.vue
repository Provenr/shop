<template>
  <div class="aui-row">
    <header class="aui-bar aui-bar-nav">登录</header>
    <div class="login-content">
      <div class="login-logo">
        <img src="/static/img/LOGO.png" alt="胖虎奢侈品">
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
                    <input type="tel" placeholder="请输入手机号" id="tel" maxlength="11" v-model="phone">
                  </div>
                </div>
                <div class="item-clear" style="margin-right: 0.5rem" id="clearTel" @click="clearTel">
                  <i class="iconfont icon-clear"></i>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <input type="tel" placeholder="验证码" id="vcode" maxlength="6" style="padding: 0;"  v-model="vcode">
                  </div>
                  <div class="item-clear hide" id="clearVcode" style="margin-right: 0.2rem;">
                    <i class="iconfont icon-clear"></i>
                  </div>
                </div>
                <input class="get-vcode"  type="button" id="get_vcode" value="获取验证码" @click="get_vcode();">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="login-button" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
//获取 验证码
var times = 60, // 时间设置60秒
timer = null;
export default {
  name: 'login',
  data() {
    return {
      titlemsg: "登录",
      value:[1],
      phone:'',
      password:'',
      captcha:'',
      vcode:''
    }
  },
  methods: {
    clearTel(){
      this.phone = "";
    },
    get_vcode(){
      var that = this;
      if(!that.checkPhone()) {
        document.getElementById("get_vcode").readOnly=false;
        document.getElementById("get_vcode").disabled=false;
        return;
      }
      document.getElementById("get_vcode").readOnly=true;
      document.getElementById("get_vcode").disabled=true;
      // axios.post(that.PHPAPI + "User/qloginSendcode", {
      //   mobile: that.phone
      // }, {
      //     transformRequest:[(data) => {
      //       return qs.stringify(data)
      //     }],
      //     headers: {
      //       "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
      //     }
      // })
      //   .then(
      //     function(res) {
      //       console.log(res);
      //     },
      //     function(error) {
      //       console.log(error);
      //     }
      //   );

      //   timer = setInterval(function() {
      //     times--;
      //     if(times <= 0) {
      //       document.getElementById("get_vcode").value="获取验证码";
      //       clearInterval(timer);
      //       document.getElementById("get_vcode").readOnly=false;
      //       document.getElementById("get_vcode").disabled=false;
      //       times = 60;
      //     } else {
      //       document.getElementById("get_vcode").value = times + '秒后重试';
      //       document.getElementById("get_vcode").readOnly=true;
      //       document.getElementById("get_vcode").disabled=true;
      //     }
      //   }, 1000);
    },
    // 手机验证
    checkPhone(){
      var that = this;
      var reg = /^1[34578]\d{9}$/;
      if(that.phone == "") {
        that.$toast("手机号码不能为空");
        return false;
      } else if(that.phone.length < 11) {
        that.$toast("手机号码长度有误");
        return false;
      } else if(!reg.test(that.phone)) {
        that.$toast("手机号格式错误");
        return false;
      } else {
        return true;
      }
    },
    // 验证码验证
    checkVcode() {
      var that = this;
      var reg = /^\d{6}$/;
      if(that.vcode == "") {
        that.$toast("验证码不能为空");
        return false;
      } else if(that.vcode.length < 6) {
        that.$toast("验证码长度有误");
        return false;
      } else if(!reg.test(that.vcode)) {
        that.$toast("验证码格式错误");
        return false;
      } else {
        return true;
      }
    },
    login() {
      var that = this;
      // // 1,判断手机号码是否有效
      // if(!that.checkPhone()){
      //   return;
      // }

      // // 2,判断验证码是发有效
      // if(!that.checkVcode()){
      //   return;
      // }
      // 3,判断是否同意注册协议，原型中没有这项

      that.$router.push({ path: "/home" });
    }
  },
  mounted() {

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
	font-size: 0.28rem;
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
	line-height: 0.4rem;
	width: 90%;
	font-size: 0.28rem;
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


</style>


