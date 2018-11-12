import {config} from '../config'

class HTTP {
  request(params){
    // url, data, method
    if (!params.method) {
      params.method = 'GET'
    }
    if (!params.token) {
      params.token = ''
    } else {
      params.token = config.Authorization + params.token
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'Authorization': params.token
      },
      success: (res)=> {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}

export {HTTP}