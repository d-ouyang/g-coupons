// components/button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color: {
      type: String,
      value: "#617FDF"
    },
    text: {
      type: String,
      value: "发放"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick: function() {
      this.triggerEvent('buttontap')
    }
  }
})
