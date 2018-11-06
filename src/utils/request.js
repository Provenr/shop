import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import tips from '@/utils/tip'

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
    if (res.code == 200) {
      return res.list
    }
    else if (res.code == 100) {
      this.$router.push({ path: '/login', replace: true })
    }
    else { // 服务器异常
      tips.error('服务器忙，请稍后重试');
      console.log(res)
    }
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
      resolve(response.data);
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
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}