// 封装一个类似于axios一样的东西

class Request {
  constructor(options) {
    this.baseURL = options.baseURL
    if (!this.baseURL) {
      throw new Error('请求基准地址必须传入')
    }
    this.beforeRequest = options.beforeRequest
    this.beforeResponse = options.beforeResponse
  }
  // 发起get请求
  // 业务==>get==>beforeRequest==> ajax  去后端获取请求
  get(url, data = {}, headers = {}) {
    // 执行请求拦截器
    if (this.beforeRequest) {
      let config = this.beforeRequest({
        method: 'get',
        url,
        data,
        headers,
      })
      if (config) {
        return this.ajax(config)
      } else {
        return null
      }
    } else {
      return this.ajax({
        method: 'get',
        url,
        data,
        headers,
      })
    }
  }
  // 发起post请求
  post(url, data = {}, headers = {}) {
    // 执行请求拦截器
    if (this.beforeRequest) {
      let config = this.beforeRequest({
        method: 'post',
        url,
        data,
        headers,
      })
      if (config) {
        return this.ajax(config)
      } else {
        return null
      }
    } else {
      return this.ajax({
        method: 'post',
        url,
        data,
        headers,
      })
    }
  }
  // 发起网络请求
  async ajax(config) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseURL + config.url,
        method: config.method || 'get',
        data: config.data || {},
        header: config.headers || {},
        success: res => {
          // 执行响应拦截器
          if (this.beforeResponse) {
            resolve(this.beforeResponse(res))
          } else {
            resolve(res)
          }
        },
        fail: error => {
          console.log(error)
          return reject(new Error('请求出错', error))
        },
      })
    })
  }
  // 发起网络请求 携带token
  async request(config) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseURL + config.url,
        method: config.method || 'get',
        data: config.data || {},
        header: {
          // todo 携带请求头token的问题
          'X-Nideshop-Token': uni.getStorageSync('token'),
          ...config.headers,
        },
        success: res => {
          // 执行响应拦截器
          if (this.beforeResponse) {
            resolve(this.beforeResponse(res))
          } else {
            resolve(res)
          }
        },
        fail: () => {
          console.log(error)
          return reject(new Error('请求出错', error))
        },
      })
    })
  }
}
/*
使用方式：
	1. 配置baseURL
	2. 暴露出去在app.js里面导入，挂载到wx对象上面，所有代码里面都可以使用他
	3. 如果发起请求不携带token的请求，请求使用 get(地址,提交的数据,请求头)  post(地址,提交的数据,请求头)  ajax(地址,提交的数据,请求头)
	4. 要携带token的话，请使用request方法
*/
//////////////修改下面和上面的request里面携带token的字段名称即可///////////////////////
let axios = new Request({
  baseURL: 'http://yg.llxx.cc/api', // 请求基准地址
  beforeRequest: function (config) {
    // 请求拦截器
    // 一定要有return config
    return config
  },
  beforeResponse: function (response) {
    // 响应拦截器
    // 一定要有return response
    const { errno, data, errmsg } = response.data
    if (errno) {
      uni.showToast({
        title: errmsg,
        icon: 'none',
      })
      return Promise.reject(errmsg)
    } else {
      return data
    }
  },
})

export default axios
