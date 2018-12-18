import CryptoJS from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import md5 from 'crypto-js/md5'

/*
  DESC：对Date的扩展，将 Date 转化为指定格式的String。
      月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
      (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
window.Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

//MD5加密
export function encryptMD5(str) {
  str = sha256(str).toString()
  str = md5(str).toString()
  return str;
}

// 获取移动端平台
export function getPlatform() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1) {
    return 'android'
  }
  if (!!ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/)) {
    return 'ios'
  }
  return 'pc'
}

export function secTotime(s) {
  var t;
  if(s > -1){
      var hour = Math.floor(s/3600);
      var min = Math.floor(s/60) % 60;
      var sec = s % 60;
      if(hour < 10) {
          t = '0'+ hour + ":";
      } else {
          t = hour + ":";
      }

      if(min < 10){t += "0";}
      t += min + ":";
      if(sec < 10){t += "0";}
      t += sec.toFixed();
  }
  return t;
}

/* -----------------------------加密解密------------------------------------ Start */
const ivs = 'pH!@#_7', keys = 'Ph201812'
//AES加密
export function encryptAES(data) { //加密
  var key = CryptoJS.enc.Utf8.parse(keys);
  var iv = CryptoJS.enc.Utf8.parse(ivs);
  var encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();
}
//AES解密
export function decryptAES(data) {//解密
  var key = CryptoJS.enc.Utf8.parse(keys);
  var iv = CryptoJS.enc.Utf8.parse(ivs);
  var decrypted = CryptoJS.AES.decrypt(data, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/* -----------------------------加密解密------------------------------------ End */

/* -----------------------------localStorage------------------------------------ Start */
export function setLocalStorage(key, content) {
  if (!key) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(key, encryptAES(content))
}

export function getLocalStorage(key) {
  if (!key) return
  let content = window.localStorage.getItem(key)
  if (!content) return
  //return JSON.parse(decryptAES(content))
  return decryptAES(content)
}

export function removeLocalStorage(key) {
  if (!key) return
  window.localStorage.removeItem(key)
}
/* -----------------------------localStorage------------------------------------ End */

export function getQuery (pa) {
  var url = window.location.href.replace(/#+.*$/, ''),
      params = url.substring(url.indexOf("?") + 1, url.length).split("&"),
      param = {};
  for (var i = 0; i < params.length; i++) {
      var pos = params[i].indexOf('='),//查找name=value
          key = params[i].substring(0, pos),
          val = params[i].substring(pos + 1);//提取value
      param[key] = val;
  }
  return (typeof(param[pa]) == "undefined") ? "" : param[pa];
}