//index.js
import api from '.././../api/openApi'
import dayjs from '../../miniprogram_npm/dayjs/index'

const app = getApp()

Page({
  data: {
   swiperList:[], // 轮播图数据
   listData:[], // 近期消息
   historyData:[] // 历史消息
  },

  onLoad () {
    // 获取最新消息
    this.getLastData()
    // 获取历史消息
    this.getHistoryData()
    // 获取固定高度
    const _this=this
    wx.getSystemInfo({
      success: function(res) {
        _this.setData( {
          windowHeight: res.windowHeight
        })

      }

    })
  },

  // 获取头部热门消息
  // async getHotData(){
  //   const {data:{recent}}=await api.getColumns()
  //   this.setData({
  //     swiperList:recent.slice(0,5)
  //   })
  // },

  // 获取最近消息
  async getLastData(){
    const {data:{top_stories,stories}}=await api.getLatest()
    this.setData({
      swiperList:top_stories,
      listData:stories
    })
  },

  // 获取过往消息
  async getHistoryData(){
    const historyData=[]
    const yesterday=new Date((new Date).getTime())
    const {data}=await api.getHistory(dayjs(yesterday).format('YYYYMMDD'))
    historyData.push(data)
    this.setData({
      historyData
    })
  },

  // 上滑加载
  async pullUpLoad(){
   const arrLength=this.data.historyData.length
   const date=this.data.historyData[arrLength-1].date
   const {data}=await api.getHistory(date)
   if(data.date===date){
     return
   }
   this.data.historyData.push(data)
   this.setData({
    historyData:this.data.historyData
   })
  },

  // 查看详情
  lookDetail(){

  }


})
