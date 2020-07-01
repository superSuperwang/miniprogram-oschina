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
    const idArr=this.data.swiperList.map((item)=>item.id)
    this.data.listArr=this.data.listData.map((item)=>item.id)
    // 将id存起来
    wx.setStorageSync('top_stories', idArr)
    wx.setStorageSync('stories', this.data.listArr)
    // 获取历史消息
    this.getHistoryData()
  },

  // 获取过往消息
  async getHistoryData(newDate){
    const yesterday=new Date((new Date).getTime())
    const date=dayjs(yesterday).format('YYYYMMDD')
    const {data}=await api.getHistory(newDate||date)
    if(data.date===newDate){
      return
    }
    data.stories.forEach((item)=>{
      this.data.listArr.push(item.id)
    })
    this.data.historyData.push(data)
    this.setData({
     historyData:this.data.historyData
    })
    
    wx.setStorageSync('stories', this.data.listArr)
    console.log(this.data.listArr)
  },

  // 上滑加载
  async pullUpLoad(){
   const arrLength=this.data.historyData.length
   const date=this.data.historyData[arrLength-1].date
   this.getHistoryData(date)
  //  const {data}=await api.getHistory(date)
  //  if(data.date===date){
  //    return
  //  }
  //  this.data.historyData.push(data)
  //  this.setData({
  //   historyData:this.data.historyData
  //  })
  },

  // 查看详情
  lookDetail(event){
    const id=event.currentTarget.dataset.id
    const flag=event.currentTarget.dataset.flag
    wx.navigateTo({
      url: `/pages/newsDetail/newsDetail?id=${id}&flag=${flag}`,
    })
  }


})
