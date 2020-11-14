const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()

Page({
  data: {
    checkboxItems: [
    ],
    checkboxItems2: [
    ],
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
      checkboxItems :[]
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
    var tmptodolist = wx.getStorageSync('todos')
    console.log(tmptodolist)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value); //对应的事件ID
    var tmp = {};
    var index = 0;
    var del;
    for (var i in tmptodolist) {
      if (tmptodolist[i].value != e.detail.value) {
        tmp[index++] = tmptodolist[i];
      }else {
        del = tmptodolist[i].value;
      }
    }
    console.log(del)
    wx.setStorageSync('todos', tmp)
    db.collection('lists').doc(del).remove().then(res=>{
    	console.log(res)
  	})
    this.onShow();
  },
})