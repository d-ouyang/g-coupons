const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

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

const getDomSize = (id) => {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().select(id).boundingClientRect(res => {
      resolve(res)
    }).exec()
  })
  // wx.createSelectorQuery().select(id).boundingClientRect(res => {
  //   callback(res)
  // }).exec()
}

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

module.exports = {
  formatTime,
  getWindowHeight,
  setModelTop,
  computedTop,
  getDomSize,
  initFunction
}
