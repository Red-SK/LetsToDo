const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
const todos = db.collection('lists')
var tmp ={}
Page({
  data: {
    checkboxItems: [
    //    {name: 'standard is dealt for u.', value: '0', checked: true},
     //   {name: 'standard is dealicient for u.', value: '1'},
    ],
},
  maketodos:function(){
    wx.navigateTo({
      url: '/pages/maketodos/maketodos',
    })
  },
  onLoad: function(options) {
 
    //console.log(app.globalData.tmp);
    this.gettodos();
    console.log("ONLOAD")
   
   // console.log(this.data);
  },

  gettodos:function(){
    tmp = app.globalData.tmp;

    for(var i = 0 ; i<tmp.length;i++){
      let x =  "checkboxItems["+i+"].name";
      let x1 = "checkboxItems["+i+"].value";
      let x2 ="checkboxItems["+i+"].checked";
      this.setData({
        [x]: tmp[i].todo,
        [x1]: "0",
        [x2]:tmp[i].checked,
     });
    }
  },
  onShow: function() {
    this.gettodos();
    console.log(tmp);
  },

    // Do something when page show.
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
 
    })
  },
 


checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
  
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(checkboxItems[i].value == values[j]){
                checkboxItems[i].checked = true;
                break;
            }
        }
    }

    
},
})