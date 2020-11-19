var util = require('../../utils/util.js');
var app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
var datee = new Date();
var remind = false;
var time = util.formatTime(new Date());
var month = datee.getMonth();
var day = datee.getDate();
var year = datee.getFullYear();
var nowday = year + "-" + month + "-" + day
Page({
  data: {
    date: nowday
  },

  onLoad: function (options) {
    // Do some initialize when page load.
  },
  onShow: function () {
    // Do something when page show.
  },
  onReady: function () {
    // Do something when page ready.
  },
  onHide: function () {
  },
  onUnload: function () {
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },
  onResize: function () {
    // Do something when page resize
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //提交表单方法——————————————————————————————————————————————————————————
  formSubmit(e) {
    console.log(app.globalData.openid)
    var time = util.formatTime(new Date());
    if (e.detail.value.remind) {
      wx.requestSubscribeMessage({
        tmplIds: ['D64ZZ89iJVDy26nZa7xpdytlbhbaJr8wDV4W2QWDo9k'],
        success(res) {
          // console.log(res)
          // console.log("before send")
          // //调用sendmessage云函数
          // wx.cloud.callFunction({
          //   name: "sendmessage",
        
          // }).then(res => {
          //   console.log("推送消息成功", res)
          // }).catch(res => {
          //   console.log("消息推送失败", res)
          // })
        },
      })
    }

    console.log('form发生了submit事件，携带数据为', e.detail.value)
    //如果submit的 todo为空的return 
    if (e.detail.value.todo.length == 0) {
      wx.switchTab({
        url: '/pages/todos/todos',
      })
      return;
    }
    //修改本地缓存
    var tmp = wx.getStorageSync('todos')
    //获取最后一个元素的下标
    var index = 0;
    for (var i in tmp) {
      index++;
    }
    var x = {
      "name": e.detail.value.todo,
      "value": e.detail.value.todo + time,
      "checked": false,
      "time": this.data.date,
      "reward": e.detail.value.reward
    }
    tmp[index] = x;

    wx.setStorageSync('todos', tmp)
    //同时修改对应数据库
    db.collection('lists').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: e.detail.value.todo + time,
        todo: e.detail.value.todo,
        due: this.data.date,
        reward: e.detail.value.reward,
        done: false,
        remind: e.detail.value.remind,
      },
      success: function (res) {
        console.log(res)
      }
    })
    //跳转回todos界面
    wx.switchTab({
      url: '/pages/todos/todos',
    })
  },

  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },

})
