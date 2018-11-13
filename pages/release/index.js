// pages/release/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    placeholder: ''
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

  /**
   * bindfocus
   */
  bindfocus: function () {
    this.setData({
      placeholder: ''
    })
  },

  /**
   * bindblur
   */
  bindblur: function (e) {
    let currentValue = e.detail.value
    this.setData({
      placeholder: '输入用户手机号码',
      phone: currentValue
    })
  },

  /**
   * bindinput
   */
  bindinput: function (e) {
    let oldValue = this.data.phone
    let currentValue = e.detail.value
    if (currentValue.length > oldValue.length) { // 输入
      if (currentValue.length === 3 || currentValue.length === 8) {
        currentValue += ' '
      }
    } else { //删除
      if (currentValue.length === 3 || currentValue.length === 8) {
        currentValue = currentValue.slice(0, currentValue.length - 1)
      }
    }

    this.setData({
      phone: currentValue
    })

  },

  onNext: function () {
    let regPhoneNum = /^1[34578][0-9]{9}$/; //电话验证
    let phone = this.data.phone.replace(/\s/g, '');
    let checkBool = regPhoneNum.test(phone);
    if (phone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (!checkBool) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
    } else if (checkBool) {
      wx.navigateTo({
        url: '/pages/common/coupons/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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