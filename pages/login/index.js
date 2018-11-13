const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userNmaePlace: '商户账户名',
    userNameFocus: false,
    passWord: '',
    passWordPlace: '密码',
    passWordFocus: false,
    submitBool: false,
    forgetBool: false,
    maskBool: false
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
   * 用户名  聚焦
   */
  bindfocus: function(e) {
    this.setData({
      userNmaePlace: '',
      userNameFocus: true
    })
  },

  /**
   * 用户名  失焦
   */
  bindblur: function(e) {
    let value = e.detail.value
    this.setData({
      userNmaePlace: '商户账户名',
      userNameFocus: false,
      userName: value
    })
  },

  /**
   * 用户名  输入
   */
  bindinput: function(e) {
    let userValue = e.detail.value
    let passValue = this.data.passWord
    if (userValue != '' && passValue != '') {
      this.setData({
        submitBool: true
      })
    } else {
      this.setData({
        submitBool: false
      })
    }
  },

  /**
   * 密码  聚焦
   */
  bindfocuspass: function(e) {
    this.setData({
      passWordPlace: '',
      passWordFocus: true
    })
  },

  /**
   * 密码  失焦
   */
  bindblurpass: function(e) {
    let value = e.detail.value
    this.setData({
      passWordPlace: '密码',
      passWordFocus: false,
      passWord: value
    })
  },

  /**
   * 密码  输入
   */
  bindinputpass: function(e) {
    let passValue = e.detail.value
    let userValue = this.data.userName
    if (userValue != '' && passValue != '') {
      this.setData({
        submitBool: true
      })
    } else {
      this.setData({
        submitBool: false
      })
    }
  },

  /**
   * 表单提交事件
   */
  onLogin: function(e) {
    let submitBool = this.data.submitBool
    if (!submitBool) return
    let requestData = e.detail.value
    console.log(requestData)
  },

  /**
   * 忘记密码
   */
  onForget: function() {
    this.setData({
      maskBool: true
    }, () => {
      util.setModelTop('#modelBox', (res,h) => {
        const modelBoxTop = util.computedTop(res.height, h)
        console.log(modelBoxTop)
        this.setData({
          modelBoxTop
        })
      })
    })
  },

  /**
   * 确定
   */
  onConfirm: function(){
    this.setData({
      maskBool: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})