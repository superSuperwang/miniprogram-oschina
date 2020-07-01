// miniprogram/pages/newsDetail/newsDetail.js
import api from '.././../api/openApi'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[], // 文章
    idIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 获取详情
     this.getDetail()
     // 获取固定高度
     const _this=this
     wx.getSystemInfo({
       success: function(res) {
         _this.setData( {
           windowHeight: res.windowHeight
         })
       }
     })
    // 获取当前id
    this.setData({
      swiperList:wx.getStorageSync(this.options.flag)
    })
   
   const index=this.data.swiperList.indexOf(+this.options.id)
   this.setData({
    idIndex:index
  })
  },
 
  // 请求详情
  async getDetail(id){
  const {data}=await api.getDetail(id||this.options.id)
    const html=data.body.replace(/figure/g,'div').replace(/figcaption/g,'div')
    data.body=html
    this.data.swiperList[this.data.idIndex]=data
    this.setData({
      swiperList:this.data.swiperList
    })
  },

  // 滑动触发
  itemTransition(event){
    this.setData({
      idIndex:event.detail.current
    })
    // console.log(event.detail.current,this.data.swiperList)
    if(typeof this.data.swiperList[event.detail.current]==='number'){
        this.getDetail(this.data.swiperList[event.detail.current])
    }
  
  }
})