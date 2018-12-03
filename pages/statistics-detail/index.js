import { StatisticsModel} from '../../models/statistics.js'

const statisticsModel = new StatisticsModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestData: {
      startDate: '',
      endDate: ''
    },
    statistics: {
      durationDisCount: 0,
      giveOutDisCount: 0,
      normalDisCount: 0,
      totalDisCount: 0,
      usedDisCount: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initFn(options)
  },

  initFn: function (options) {
    console.log(options)
    const date = `${statisticsModel.getYear()}-${statisticsModel.getMonth()}-${statisticsModel.getDate()}`
    const token = wx.getStorageSync('token')
    let requestData = JSON.parse(options.data)
    
    console.log(requestData)
    this.setData({
      title: options.title,
      requestData: requestData,
      index: options.index,
      date: date
    }, () => {
      // if (requestData.startDate == requestData.endDate) {
      //   requestData = {
      //     startDate: '',
      //     endDate: ''
      //   }
      // }
      statisticsModel.getStatisticsDetail({
        url: '/discount/countDiscountSituation',
        method: 'POST',
        data: requestData
      }).then(res => {
        this.setData({
          statistics: res
        })
      })
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