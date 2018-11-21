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
    selected: false,
    currentIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      nav: options.nav
    })
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
   * 子组件派发事件
   */
  bindSelect: function(e) {
    let currentIndex = this.data.currentIndex

    let currentSelected = this.data.selected

    let selectedIndex = e.detail.index
    
    let selected = e.detail.selected

    let coupons = this.data.coupons
    // 几种情况
    /**
     * 1. 当前没有被选中的情况
     * 2. 当前有选中的情况 点的是选中的元素
     * 3. 当前有选中的情况 点的不是选中的元素
     */
    console.log(selectedIndex, selected)

    coupons[selectedIndex].selected = !selected

    if (!currentSelected) {
      this.setData({
        currentIndex: selectedIndex,
        selected: !selected,
        coupons,
      })
    } else {
      if (currentIndex == selectedIndex) {
        this.setData({
          currentIndex: null,
          selected: !selected,
          coupons,
        })
      } else {
        coupons[currentIndex].selected = false
        this.setData({
          currentIndex: selectedIndex,
          selected: !selected,
          coupons,
        })
      }
    }
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
      canSwitch: false,
      selected: false,
      currentIndex: null
    },() => {
      wx.showLoading({
        title: '加载中...',
      })
      couponsModel.getCoupons(Object.assign({}, params, this._returnQuestData(this.data))).then(res => {
        this.handleArr(res)
      })
    })
  },

  /**
   * 上拉加载
   */
  onReachBottom: function() {
    console.log('上拉加载')
    const noMore = this.data.noMore

    if (noMore) {
      return false
    }

    wx.showLoading({
      title: '加载中...',
    })

    this.setData({
      canSwitch: false
    },() => {
      couponsModel.getCoupons(Object.assign({}, params, this._returnQuestData(this.data))).then(res => {
        this.handleArr(res)
      })
    })

    
  }
})