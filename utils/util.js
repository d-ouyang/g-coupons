import {
  config
} from '../config'

/**
 * 获取屏幕高度
 */
const getWindowHeight = ()=> {
  try {
    const res = wx.getSystemInfoSync()
    const windowHeight = res.windowHeight
    return windowHeight
  } catch (e) {
    const windowHeight = 603
    return windowHeight
  }
}

const setModelTop = (id, callback) => {
  wx.createSelectorQuery().select(id).boundingClientRect(res => {
    const windowHeight = getWindowHeight()
    callback(res, windowHeight)
  }).exec()
}

const computedTop = (h1, h2, h3) => {
  return parseInt((h3 - h2 - h1) * 3 / 7)
}

// const getDomSize = (id) => {
//   return new Promise((resolve, reject) => {
//     wx.createSelectorQuery().select(id).boundingClientRect(res => {
//       resolve(res)
//     }).exec()
//   })
// }

const initFunction = (homeModel) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.redirectTo({
        url: '/pages/login/index'
      })
    } else {
      const userInfo = wx.getStorageSync('userInfo')
      console.log(!userInfo)
      if (!userInfo) {
        return homeModel.getUserInfo({
          url: '/userinfo/userweb/currentUserInfo',
          method: "POST",
        }).then(res => {
          wx.setStorageSync('userInfo', res)
          resolve(res)
        }) 
      } else {
        resolve(userInfo)
      }
    }
  })
}

const returnQrcodeStr = (str) => {
  return config.html5_url + str
}

module.exports = {
  getWindowHeight,
  setModelTop,
  computedTop,
  initFunction,
  returnQrcodeStr
}
