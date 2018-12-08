import {
  config
} from '../config'

const tips = {
  1: '抱歉，出错了',
  200:'TOKEN失效',
  201:'TOKEN无效',
  300:'参数异常',
  400:'系统异常',
  401:'无访问权限',
  500:'服务访问不通',
  600:'用户名密码错误',
  610:'该用户已锁定请联系管理员',
  404:'资源不存在',
  701:'接口调用返回失败信息',
  702:'接口调用异常',
  600: '用户名或密码错误',
  1001: '车位锁编号重复',
  1002: '车位名称重复',
  1003: '车位编号不存在',
  1004: '车位信息不存在',
  2001: '订单未能找到',
  2002: '订单已支付',
  2108: '用户ID不存在',
  2109: '免密支付失败',
  3001: '剩余金额不足',
  4001: '会员不存在',
  1021: '已经绑定了3个车牌',
  1006: '车牌已被绑定',
  1010: '该会员没有绑定车牌信息',
  1007: '绑定失败,请先注册会员',
  2107: '产品不存在',
  5001: '控制异常',
  6001: '卖家信息不存在',
  6002: '卖家信息已存在',
  6003: '收费规则不存在',
  1025: '此活动只针对新用户有效',
  1014: '手机号码有误',
  1015: '验证码错误',
  1016: '用户名或密码错误',
  1017: '密码错误',
  1101: '用户领券记录不存在',
  1102: '商户领券记录不存在',
  1103: '优惠券不可用',
  1104: '优惠券不在有效期',
  1105: '优惠券数量不足',
  1106: '优惠券未激活',
  1107: '产品类型不符',
  1108: '停车场不可用',
  1109: '已领取过该优惠券',
  1110: '优惠券已激活',
  1111: '优惠券已被领取',
  1615: '领用失败--超过领取上限',
  1601: '长租产品不存在',
  1602: '产品数量不足',
  1603: '订单已存在',
  1604: '余额不足',
  1605: '该会员不存在',
  1606: '时间范围超过产品有效期',
  1607: '开始时间不能超过结束时间',
  1301: '错峰产品不存在',
  1302: '日期不正确',
  1304: '订单已存在',
  1305: '产品数量不足',
  1306: '该会员不存在',
  1307: '余额不足',
  1308: '调取大数据服务异常',
  1012: '发票正在开具中',
  1013: '对不起,未找到对应发票订单',
  1022: '查不到抬头信息',
  1011: '未接收到用户信息',
  1401: '停车场不存在',
  1402: '已产生停车记录删除失败',
  1411: '固定车该时段已存在',
  1412: '导入失败',
  2105: '产品已经购买过'
}

class HTTP {
  request(params) {
    return new Promise((resolve, reject) => {
      // url, data, method
      if (!params.method) {
        params.method = 'GET'
      }

      if (!params.token) {
        params.token = ''
      } else {
        params.token = config.Authorization + params.token
      }

      let options = {
        url: config.api_base_url + params.url,
        method: params.method,
        header: {
          'content-type': 'application/json',
          'Authorization': params.token
        },
        success: (res) => {
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            let errCode = res.data.code
            if (errCode == config.ERR_OK) {
              resolve(res.data.data)
            } else {
              this._showError(errCode)
              reject
            }
          } else {
            let errCode = res.data.code
            this._showError(errCode)
            reject(errCode)
          }
        },
        fail: (err) => {
          this._showError()
          reject
        }
      }

      if (params.data == undefined) {
        options = Object.assign({}, options)
      } else {
        options = Object.assign({ data: params.data}, options)
      }

      console.log(options)
      wx.request(options)
    })
  }

  _showError(errCode) {
    if (!errCode) {
      errCode = 1
    }
    wx.showToast({
      title: tips[errCode],
      icon: 'none',
      duration: 2000
    })

    if (errCode == 200 || errCode == 201) {
      wx.redirectTo({
        url: '/pages/login/index',
      })
    }
  }

  getToken() {
    const token = wx.getStorageSync('token')
    return token
  }

}

export {
  HTTP
}