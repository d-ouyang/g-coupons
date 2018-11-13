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
  wx.createSelectorQuery().select('#modelBox').boundingClientRect(res => {
    
    const windowHeight = getWindowHeight()
    callback(res, windowHeight)
    // console.log(res.height);
    // const modelBoxTop = parseInt((windowHeight - res.height) * 3 / 7)
    // console.log(modelBoxTop);
    // wx.nextTick(() => {
    //   this.setData({
    //     modelBoxTop
    //   })
    // })
  }).exec()
}

const computedTop = (h1, h2) => {
  return parseInt((h2 - h1) * 3 / 7)
}

module.exports = {
  formatTime,
  getWindowHeight,
  setModelTop,
  computedTop
}
