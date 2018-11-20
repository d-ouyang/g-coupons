// const util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    text: String,
    // extrdom: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    top:'312rpx'
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
   */
  ready() {
    // console.log(this.properties.extrdom)
    // util.getDomSize(this.properties.extrdom).then(res => {
    //   setTimeout(() => {
    //     console.log(res.heigth)
    //   },200)
    // })

    // util.getDomSize(this.properties.extrdom, (res) => {
    //   util.setModelTop('.nothing', (response, wh) => {
    //     console.log(res)
    //     console.log(response)
    //     console.log(wh)
    //     // const modelBoxTop = util.computedTop(response.height, res.height, wh)
    //     // console.log(modelBoxTop)
    //     // this.setData({
    //     //   modelBoxTop
    //     // })
    //   })
    // })
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
