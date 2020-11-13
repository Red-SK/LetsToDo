
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
const todos = db.collection('lists')
var x  = {}
Page({
  data: {
    text: "This is page data."
  },
  //从数据库中获取当前用户的所有事项数据
  setfromDB:function(){

    db.collection('lists').where({
      _openid: 'user-open-id',
      done: false
    })
    .get().then(res=>{
      app.globalData.tmp=  res.data;
    //  console.log(app.globalData.tmp);
 
    })
  },
  onLoad: function(options) {
   this.setfromDB();
  },
  onShow: function() {
    // Do something when page show.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    wx.setStorageSync({
      key:'todos',
      value:app.globalData.tmp,
    })
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  onResize: function() {
    // Do something when page resize
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  onGetOpenid: function() {
   
    wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
      wx.navigateTo({
        url: '../deployFunctions/deployFunctions',
      })
    }
  })
  wx.switchTab({
    url:'/pages/todos/todos',
    success: function (e) {
      var page = getCurrentPages().pop();
      if (page == undefined || page == null) return;
      page.onLoad();
    }
  })
  }
})


