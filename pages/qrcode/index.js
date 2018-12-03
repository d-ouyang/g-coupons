const QR = require('../../utils/qrcode.js')
const util = require('../../utils/util.js')
import { CouponsModel } from '../../models/coupons.js'
const couponsModel = new CouponsModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    prevRandomNum: '',
    timer: null,
    qrShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.initFn(options)
  },

  initFn: function (options){
    let size = this.setCanvasSize();//动态设置画布大小
    let item = JSON.parse(options.item)
    this.setData({
      id: options.id,
      discountId: options.discountId,
      item: item,
      size: size
    },() => {
      this.setData({
        qrShow: true
      })
      this.getRandomNum()
    })
  },

  /**
   * 每次生成二维码之前都要走一遍随机字符串
   */
  getRandomNum: function() {
    couponsModel.getRandomNum({
      disGroupReleaseId: this.data.id,
      prevRandomNum: this.data.prevRandomNum
    }).then(res => {
      console.log(res)
      this.setData({
        prevRandomNum: res.qrCodeNum
      },() => {
        let url = util.returnQrcodeStr({
          groupId: couponsModel.returnGroupid(),
          disGroupReleaseId: this.data.id,
          discountId: this.data.discountId,
          qrRandomNum: this.data.prevRandomNum,
          timestamp: util.returnTimestamp()
        })
        console.log(url)
        this.createQrCode(url, "mycanvas", this.data.size.w, this.data.size.h)
        this.setInterval()
      })
    })
  },

  setInterval: function() {
    clearInterval(this.data.timer)
    let timer = setInterval(() => {
      this.getRandomNum()
    }, 10000)
    this.setData({
      timer: timer
    })
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 538;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  // 生成二维码
  createQrCode: function (url, canvasId, cavW, cavH) {
    QR.api.draw(url, canvasId, cavW, cavH);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onUnload: function() {
    console.log(this.data.timer)
    clearInterval(this.data.timer)
  },

  onHide: function() {
    console.log(this.data.timer)
    clearInterval(this.data.timer)
  }
})