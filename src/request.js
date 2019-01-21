/**
 * @file http request 配置
 * @author likaixuan <1375502718@qq.com>
 */

import axios from 'axios'

import qs from 'qs'

let request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000,
  transformRequest: [function (data) {
    if (data instanceof FormData) {
      return data
    }
    // 过滤空字符串
    for (let key in data) {
      if (data[key] === null) {
        delete data[key]
      }
    }
    return qs.stringify(data, {
      allowDots: true
    })
  }]
})

// 拦截请求
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 拦截响应
request.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default request
