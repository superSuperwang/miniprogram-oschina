// miniprogram/pages/newsDetail/newsDetail.js
import api from '.././../api/openApi'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[], // 文章
    extraDetail:{},
    idIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
     // 获取详情
     this.getDetail()
     // 获取固定高度
     const _this=this
     wx.getSystemInfo({
       success: function(res) {
         _this.setData( {
           windowHeight: res.windowHeight,
           windowWidth:res.windowWidth
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
    this.getExtra(id)
  },

  // 获取新闻额外信息
  async getExtra(id){
    const {data:{comments,long_comments,popularity,short_comments}}=await api.getExtra(id||this.options.id)
    this.setData({
      extraDetail:{
        comments,
        long_comments,
        popularity,
        short_comments
      }
    })
    console.log(this.data.extraDetail)
  },

  // 滑动触发
  itemTransition(event){
    this.setData({
      idIndex:event.detail.current
    })
    // console.log(event.detail.current,this.data.swiperList)
    if(typeof this.data.swiperList[event.detail.current]==='number'){
        this.getDetail(this.data.swiperList[event.detail.current])
    }else{
      this.getExtra(this.data.swiperList[event.detail.current].id)
    }
  
  }
})