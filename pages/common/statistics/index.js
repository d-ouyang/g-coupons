import { StatisticsModel} from '../../../models/statistics.js'
let statisticsModel = new StatisticsModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paramsStart: "",
    paramsend: "",
    start: "",
    end: "",
    startPicker: false,
    endPicker: false,
    canCheck: true,
    pickerShow: false,
    selectArr: [
      {
        title: "当天",
        selected: true
      },
      {
        title: "本月",
        selected: false
      },
      {
        title: "全年",
        selected: false
      },
      {
        title: "自定义",
        selected: false
      },
    ]
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
   * 选择tag
   */
  bindSelect: function (e) {
    let selectArr = this.data.selectArr
    const index = e.currentTarget.dataset.index

    if (index == 3) {
      console.log('自定义')
    } else {
      var requestData = statisticsModel.retrunParams(index)
      console.log(requestData)
    }
  },

  /**
   * 选择开始时间
   */
  bindStartChange: function (e) {
    console.log(e)
    const date = e.detail.value;
    this.setData({
      paramsStart: date,
      start: date
    })
  },

  /**
   * 选择结束时间
   */
  bindEndChange: function (e) {
    console.log(e)
  }
})