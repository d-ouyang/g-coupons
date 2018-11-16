// pages/personal/index.js
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
   * 跳转页面
   */
  navToPage: function(e) {
    console.log(e)
    wx.navigateTo({
      url:  `/pages/common/${e.detail.router}/index`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 退出登录
   */
  bindExit: function() {
    wx.redirectTo({
      url: '/pages/login/index'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})