import { StatisticsModel} from '../../../models/statistics.js'
let statisticsModel = new StatisticsModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: "",
    end: "",
    endLimit:"",
    currentIndex: 0,
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
    ],
    requestData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initFunction()
  },

  /**
   * 初始化时查询当天
   */
  initFunction: function () {
    const requestData = statisticsModel.retrunParams(0)
    this.setData({
      requestData,
      endLimit: requestData.endDate
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
   * tag 切换
   */
  bindSelect: function (e) {
    let selectArr = this.data.selectArr
    const index = e.currentTarget.dataset.index

    if (selectArr[index].selected) {
      return
    }

    for (let i in selectArr) {
      if (selectArr[i].selected) {
        selectArr[i].selected = false
        break
      }
    }

    selectArr[index].selected = true

    this.setData({
      selectArr,
      currentIndex: index
    })

    if (index == 3) {
      console.log('自定义')
      this.setData({
        pickerShow: true
      })
      if (!this.data.startPicker || !this.data.endPicker) {
        this.setData({
          canCheck: false
        })
      } else {
        const requestData = {
          startDate: this.data.start,
          ensDate: this.data.end
        }
        console.log(requestData)
        this.setData({
          canCheck: true,
          requestData
        })
      }
    } else {
      const requestData = statisticsModel.retrunParams(index)
      console.log(requestData)
      this.setData({
        pickerShow: false,
        canCheck:true,
        requestData
      })
    }
  },

  /**
   * 选择开始时间
   */
  bindStartChange: function (e) {
    console.log(e)
    const date = e.detail.value;

    if (this.data.endPicker) {
      // 判断 endDate >= startDate
      const startTime = parseInt(new Date(date).getTime()/1000)
      const endTime = parseInt(new Date(this.data.end).getTime() / 1000)
      if (startTime > endTime) {
        wx.showToast({
          title: '开始日期不能大于结束日期',
          duration: 2500,
          icon: "none"
        })
        this.setData({
          startPicker: false,
          canCheck: false
        })
      } else {
        this.setData({
          start: date,
          startPicker: true,
          canCheck: true
        })
      }
    } else {
      this.setData({
        start: date,
        startPicker: true,
        canCheck: false
      })
    }
  },

  /**
   * 选择结束时间
   */
  bindEndChange: function (e) {
    console.log(e)
    const date = e.detail.value;

    if (this.data.startPicker) {
      // 判断 endDate >= startDate
      const startTime = parseInt(new Date(this.data.start).getTime() / 1000)
      const endTime = parseInt(new Date(date).getTime() / 1000)

      if (startTime > endTime) {
        wx.showToast({
          title: '结束日期不能小于开始日期',
          duration: 2500,
          icon: "none"
        })
        this.setData({
          endPicker: false,
          canCheck: false
        })
      } else {
        this.setData({
          end:date,
          endPicker: true,
          canCheck: true
        })
      }
    } else {
      this.setData({
        end: date,
        endPicker: true,
        canCheck: false
      })
    }
  },

  /**
   * bindCheck
   * @params
   * requestData
   */
  bindCheck: function() {
    const canCheck = this.data.canCheck
    if (!canCheck) {
      return
    }

    const index = this.data.currentIndex
    const requestData = this.data.requestData
    console.log(requestData)
    wx.navigateTo({
      url: `/pages/statistics-detail/index?data=${requestData}&index=${index}`
    })
  }
})