// pages/common/coupons/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: true, // 默认定额券
    currentType: "1", // 默认定额券
    coupons:[],
    noMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bindtab: function (e) {
    const data = e.currentTarget.dataset
    console.log(data)
    let currentType = this.data.currentType
    if (currentType == data.type) {
      return
    }
    this.setData({
      currentType: data.type
    },() => {
      if (data.type == '1') {
        console.log('定额券')
        this.setData({
          active: true
        })
      } else if (data.type == '2') {
        console.log('时长券')
        this.setData({
          active: false
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})