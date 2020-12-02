const app = getApp()

wx.cloud.init()
const db = wx.cloud.database()
var util = require('../../utils/util.js');
Page({
  data: {
    checkboxItems: [
    ],
    checkboxItems2: [
    ],
    list:'123'
  },
  //跳转创建事项界面
  maketodos: function () {
    wx.navigateTo({
      url: '/pages/maketodos/maketodos',
    })
  },
  //设置当前界面的事项列表
  settodolist: function () {

    var todolist = wx.getStorageSync('todos')
    this.setData({
      checkboxItems: []
    })

    for (var i in todolist) {
      let x = "checkboxItems[" + i + "].name";
      let x1 = "checkboxItems[" + i + "].value";
      let x2 = "checkboxItems[" + i + "].checked";
      let x3 = "checkboxItems[" + i + "].time";
      this.setData({
        [x]: todolist[i].name,
        [x1]: todolist[i].value,
        [x2]: todolist[i].checked,
        [x3]: todolist[i].time,
      })

    }
  },
  setreward: function () {
    this.setData({
      checkboxItems2: []
    })
    var reward = wx.getStorageSync('reward')
    for (var i in reward) {
      let x = "checkboxItems2[" + i + "].name";
      let x1 = "checkboxItems2[" + i + "].value";
      let x2 = "checkboxItems2[" + i + "].checked";
      this.setData({
        [x]: reward[i].name,
        [x1]: reward[i].value,
        [x2]: reward[i].checked,
      })
    }
  },
  onLoad: function (options) {
    this.settodolist();
    this.setreward();
    console.log(this.data)
  },

  onShow: function () {
    this.settodolist();
    this.setreward();

  },

  // Do something when page show.
  onReady: function () {
    // Do something when page ready.
  },
  onHide: function () {
    // Do something when page hide.
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
  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {

    })
  },

  //勾选后的操作
  checkboxChange: function (e) {
    var tmpreward = wx.getStorageSync('reward')
    var tmptodolist = wx.getStorageSync('todos')
    console.log('checkbox发生change事件，携带value值为：', e.detail.value); //对应的事件ID
    var tmp = {};
    var index = 0;
    var del;
    var rewardtmp;
    for (var i in tmptodolist) {
      if (tmptodolist[i].value != e.detail.value) {
        tmp[index++] = tmptodolist[i];
      } else {
        del = tmptodolist[i].value;
        rewardtmp = tmptodolist[i];
      }
    }
    wx.setStorageSync('todos', tmp)
    db.collection('lists').doc(del).remove().then(res => {
      console.log(res)
    })

    //如果奖励事项为空 ，则返回
    var judge = rewardtmp.reward;
    if (judge == "") {
      this.onShow();
      return;
    }

    //  -----分解奖励事项并设置缓存
    var time = util.formatTime(new Date());
    var index2 = 0;
    //获取最后一个元素的下标
    for (var i in tmpreward) {
      index2++;
    }
    var x = {
      "name": rewardtmp.reward,
      "value": rewardtmp.reward + time,
      "checked": false,
    }
    tmpreward[index2] = x;

    wx.setStorageSync('reward', tmpreward)
    //同时修改对应数据库
    db.collection('reward').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: rewardtmp.reward + time,
        todo: rewardtmp.reward,
        done: false,
      },
      success: function (res) {
        console.log(res)
      }
    })
    this.onShow();
  },
  checkboxChange2: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value); //对应的事件ID
    var tmpreward = wx.getStorageSync('reward')
    var index = 0;
    var changedreward = {}
    var del;
    for (var i in tmpreward) {
      if (tmpreward[i].value != e.detail.value) {
        changedreward[index++] = tmpreward[i]
      } else {
        del = tmpreward[i].value
      }
    }
    wx.setStorageSync('reward', changedreward)
    db.collection('reward').doc(del).remove().then(res => {
      console.log(res)
    })
    this.onShow()
  }
})
