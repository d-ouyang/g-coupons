// pages/home/index.js
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
      var nav = 'receive'
    }
    wx.navigateTo({
      url: `/pages/${nav}/index`
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})