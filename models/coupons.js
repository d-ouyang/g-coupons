import { HTTP } from '../utils/http.js'

class CouponsModel extends HTTP {
  getCoupons(params) {
    params.token = this.getToken()
    return this.request(params)
  }

  returnGroupid() {
    const userInfo = wx.getStorageSync('userInfo')
    return userInfo.id
  }

  getRandomNum(requestData) {
    return this.request({
      url: '/discount/fetchMiniQrRandom',
      method: 'POST',
      token: this.getToken(),
      data: Object.assign(requestData, {
        groupId: this.returnGroupid()
      })
    })
  }

  releaseCoupon(requestData) {
    return this.request({
      url: '/discount/manualReleaseDiscount',
      method: 'POST',
      token: this.getToken(),
      data: requestData
    })
  }
}

export { CouponsModel }