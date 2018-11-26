import { CouponsModel} from '../../models/coupons.js'

const couponsModel = new CouponsModel()

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
    console.log(options)
    this.setId(options)
  },

  setId: function (options) {
    this.setData({
      id: options.id
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
      couponsModel.releaseCoupon({
        dId: this.data.id,
        userPhone: phone,
        relCount: 1
      }).then(res => {
        if (res.status == 1) {
          wx.navigateTo({
            url: '/pages/release-over/index',
          })
        } else {
          wx.showToast({
            title: res.message,
          })
        }
      })
    }
  }
})