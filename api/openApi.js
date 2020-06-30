const prefix='http://news-at.zhihu.com/api'
export default{
  // 热门消息
  getColumns(){
    return new Promise((resolve,reject)=>{
       wx.request({
      url: `${prefix}/3/news/hot`,
      success:(data)=>{
        resolve(data)
      },
      fail:(error)=>{
        reject(error)
      },
      method:'GET'
    })
    }) 
  },

  // 最近消息
  getLatest(){
    return new Promise((resolve,reject)=>{
       wx.request({
      url: `${prefix}/4/news/latest`,
      success:(data)=>{
        resolve(data)
      },
      fail:(error)=>{
        reject(error)
      },
      method:'GET'
    })
    }) 
  },

  // 获取历史消息
  getHistory(date){
    return new Promise((resolve,reject)=>{
      wx.request({
     url: `${prefix}/4/news/before/${date}`,
     success:(data)=>{
       resolve(data)
     },
     fail:(error)=>{
       reject(error)
     },
     method:'GET'
   })
   }) 
  }
}