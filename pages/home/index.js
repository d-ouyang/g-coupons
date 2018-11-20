import {HomeModel} from '../../models/home.js'
const homeModel = new HomeModel()

const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initFunction(homeModel).then(res => {
      this.setData({
        userInfo: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 跳转页面
   */
  bindNavigation: function (e) {
    const color = e.currentTarget.dataset.color;
    console.log(color)
    if (color == 'blue') {
      var nav = 'release'
    } else if (color == 'yellow') {
      var nav = 'qrcode'
    }
    wx.navigateTo({
      url: `/pages/common/coupons/index?nav=${nav}`
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})