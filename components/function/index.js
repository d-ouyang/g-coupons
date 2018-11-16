// components/function/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    arrowPath: "image/icon-arrow.png",
    functions: [
      {
        iconPath: "image/icon-coupon.png",
        title: "优惠券",
        router: "coupons"
      },
      {
        iconPath: "image/icon-statistics.png",
        title: "统计",
        router: "statistics"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(e) {
      const $router = e.currentTarget.dataset.router;
      this.triggerEvent('NavToPage',{
        router: $router
      })
    }
  }
})
