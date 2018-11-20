const util = require('../../../utils/util.js')
import { CouponsModel} from '../../../models/coupons.js'
const couponsModel = new CouponsModel()
const tabs = [
  {
    giveOutType: '0',
    value: '定额券',
    active: true
  },
  {
    giveOutType: '2',
    value: '时长券',
    active: false
  }
]

const nothing = {
  src:  '/resource/image/no-coupons.png',
  text: '暂无优惠券'
}

let params = {
  url: '/discount/getUserGroupDiscountList',
  method: "POST"
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nothing,
    tabs: tabs,
    currentType: "0", // 默认定额券
    coupons:[],
    noMore: false,
    canSwitch: false, //默认不能切换
    currentPage: 1,
    pageSize: 15,
    selected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    
    couponsModel.getCoupons(Object.assign({}, params, this._returnQuestData(this.data))).then(res => {
      this.handleArr(res)
    })

  },

  /**
   * 返回请求数据
   */
  _returnQuestData: function (data) {
    return {
      data: {
        giveOutType: data.currentType,
        currentPage: data.currentPage,
        pageSize: data.pageSize
      }
    }
  },

  /**
   * 处理返回数据
   */
  handleArr: function(res) {
    let coupons = this.data.coupons.concat(res.datas)
    console.log(coupons)
    // setTimeout(() => {
      this.setData({
        canSwitch: true,
        coupons
      }, () => {
        wx.hideLoading()
        if (coupons.length >= res.totalCount && coupons.length) {
          this.setData({
            noMore: true
          })
        } else {
          this.setData({
            currentPage: this.data.currentPage + 1,
            noMore: false
          })
        }
      }) 
    // },2000)
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
    // 此处添加新类型优惠券需改页面结构及相关样式，逻辑可以不变
    const item = e.currentTarget.dataset.item
    console.log(item)

    if (item.active) {
      return false
    }

    // 切换锁
    console.log(this.data.canSwitch)
    if (!this.data.canSwitch) {
      return false
    }

    const currentType = item.giveOutType

    for (let i in tabs) {
      if (tabs[i].active) {
        tabs[i].active = false
      }

      if (tabs[i].giveOutType == currentType) {
        tabs[i].active = true
      }
    }

    this.setData({
      currentType,
      tabs,
      coupons: [],
      currentPage: 1,
      noMore: false,
      canSwitch: false
    },() => {
      wx.showLoading({
        title: '加载中...',
      })
      couponsModel.getCoupons(Object.assign({}, params, this._returnQuestData(this.data))).then(res => {
        console.log(res)
        this.handleArr(res)
      })
    })
  },

  /**
   * 上拉加载
   */
  onReachBottom: function() {
    console.log('上拉加载')
    const totalPage = this.data.totalPage
    const currentPage = this.data.currentPage

    if (currentPage >= totalPage) {
      return
    }

    const requestData= {
      giveOutType: this.data.currentType,
      currentPage: this.data.currentPage,
      pageSize: this.data.pageSize
    }

    couponsModel.getCoupons({
      url: '/discount/getUserGroupDiscountList',
      method: "POST",
      data: requestData
    }).then(res => {
      console.log(res)
    })
  }
})