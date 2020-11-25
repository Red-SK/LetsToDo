Page({
  data: {
    isLogin: false,
    UserAvatar: "/images/Default_Img.jpg",
    UserName: "未登录"
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  setUserAvatar:function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      // 指定上传原图还是缩略图，默认两个都有
      sizeType: ['original', 'compressed'],
      // 指定来源是相机还是相册，默认两个都有
      sourceType: ['camera','album'],
      success:function (res) {
        _this.setData({
          UserAvatar: res.tempFilePaths
        })
      }
    })
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 3
    })
    }
    // Do something when page show.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
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
  bindGetUserInfo (event) {
    console.log(event)
    this.setData({
      userInfo: event.detail.userInfo,
      UserAvatar: event.detail.userInfo.avatarUrl,
      UserName: event.detail.userInfo.nickName,
      isLogin: true
    })
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
  customData: {
    hi: 'MINA'
  }
})