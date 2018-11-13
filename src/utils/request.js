import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'

// 创建 axios 接口
const service = axios.create({
  baseURL: process.env.SERVICE_API,
  timeout: 5000, 
  responseType: "json",
  headers: {
    //'Content-Type': 'application/form-data'
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  // 请求头
  config.headers['os'] = '7'
  config.headers['token'] = store.getters.token || ''
  config.headers['version'] = 'ccby1.0'
  config.data = qs.stringify(config.data)

  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(res);
    if (res.code == 200) {
      return res
    }
    else if (res.code == 100) { // token超时跳转登陆
      if (res.msg == '您的用户信息已经过期，请重新登录') {
        router.replace({ path: "/login", query: { url: router.history.current.fullPath } })
      }
    }
    else { // 服务器异常
      console.log(res.msg)
      return Promise.reject('服务器忙，请稍后重试');
    }
    return Promise.reject(res.msg);
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 * get请求
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    })
    .then(response => {
      console.log(response);
      resolve(response);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * post请求
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}