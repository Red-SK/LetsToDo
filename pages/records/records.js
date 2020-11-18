const util = require('../../utils/util.js')
Page({
  data: {
    // 是否被选中
    activeIndex:0,
    records: [],
    sum: [{
      title: "今日番茄次数",
      val: "0",
    }, {
      title: "累计番茄次数",
      val: "0",
    }, {
      title: "今日专注时长",
      val: "0分钟",
    }, {
      title: "累计专注时长",
      val: "0分钟",
    }, ],
  },
  onShow: function name(params) {
    var records = wx.getStorageSync('records') || [];
    // console.log(records);
    // console.log(records[0].date);
    // 今日番茄次数
    var day = 0;
    // 累计番茄次数
    var total = records.length;
    // 今日番茄时间
    var dayTime = 0;
    // 累计番茄时间
    var totalTime = 0;
    // records 中有数据
    if (records.length > 0) {
      for(var i = 0; i < records.length; ++i){
        // 通过日期字符串比较来判断是否是今天的数据
        if(records[i].date.substr(0,10) == util.formatTime(new Date).substr(0,10)){
          day = day + 1;
          dayTime = dayTime + parseInt(records[i].time);
        }
        totalTime = totalTime + parseInt(records[i].time);
      }
      // console.log("dayTime = " + dayTime);
      this.setData({
        'sum[0].val':day,
        'sum[1].val':total,
        'sum[2].val':dayTime + '分钟',
        'sum[3].val':totalTime + '分钟'
      })
    }
  },
// 今日记录和历史记录页面的切换
  changeType:function name(params) {
    this.setData({
      activeIndex:params.currentTarget.dataset.index,
    })
    console.log(params.currentTarget.dataset.index);
  }
})