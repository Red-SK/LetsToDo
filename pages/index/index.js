//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    clockShow: false, //选择页与倒计时页切换显示
    time: '25', //初始番茄钟默认时间
    mTime: 25 * 60 * 1000,// 倒计时时间转为 ms 的值
    timeStr: '25:00',// 倒计时事件字符串
    iconActive: '-1', //默认不选择事件
    rate: '',// rpx与px的比值
    clockHeight: 0,
    okShow:false,// 完成按钮是否显示
    pauseShow:true,// 暂停按钮是否显示
    continueCancleShow:false,// 继续和放弃按钮是否显示
    timer:null, // 计时器
    cateArr: [{
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: "学习"
      },
      {
        icon: 'think',
        text: '思考'
      },
      {
        icon: 'write',
        text: '写作'
      },
      {
        icon: 'sport',
        text: '运动'
      },
      {
        icon: 'read',
        text: '阅读'
      },
    ]
  },
  //事件处理函数
  onLoad: function name(params) {
    //获得当前设备的信息
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    //获得 rpx 与当前设备宽度的比
    //小程序默认都 750 rpx
    this.setData({
      rate: rate,
      clockHeight: rate * res.windowHeight
    })

  },
  sliderChange: function name(params) {
    //console.log(params);
    this.setData({
      time: params.detail.value
    })
  },
  clickIcon: function name(params) {
    // console.log(params);
    var iconActive = params.currentTarget.dataset.index;
    this.setData({
      iconActive: iconActive
    })
    // 选定某件事时，自动设定时间值
    if(iconActive == 2)
    {
    //console.log(iconActive);
      this.setData({
        time:5,
      })
    }
  },
  start: function name(params) {
    this.setData({
      clockShow: true,
      // 根据用户选择的 time 值更新 mTime 的值
      mTime: this.data.time * 60 * 1000,
      // 根据用户选择的 time 值更新倒计时文字
      timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ":00" : "0" + this.data.time + ":00",
    })
    this.drawBg();
    this.drawActive();
  },
  // 跳转至记录页面
  record:function name(params) {
    wx.navigateTo({
      url: '/pages/records/records',
    })
  },

  // 画黑色背景圆
  drawBg: function name(params) {
    //rpx 转化为 px
    var lineWidth = 6 / this.data.rate;
    var ctx = wx.createCanvasContext('progress_bg');
    //var  ctx = wx.createSelectorQuery()
    //ctx.select("#progress_bg");
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";
    // ctx.setLineCap("round");
    ctx.beginPath();
    ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },
  //画白色动态圆
  drawActive: function name(params) {
    // 设置一个定时器
    var _this = this;
    var timer = setInterval(function () {
      var angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.mTime) / (_this.data.time * 60 * 1000);
      // 更新 mTime
      var currentTime = _this.data.mTime - 100;
      _this.setData({
        mTime: currentTime,
      });
      if (angle < 3.5) {
        // 时间文本的动态变化
        if (currentTime % 1000 == 0) {
          var timeStr1 = currentTime / 1000; // 总的秒数
          var timeStr2 = parseInt(timeStr1 / 60); // 分钟数
          var timeStr3 = timeStr1 - timeStr2 * 60; // 分钟之后的秒数
          var timeStr2 = timeStr2 >= 10 ? timeStr2 : "0" + timeStr2;
          var timeStr3 = timeStr3 >= 10 ? timeStr3 : "0" + timeStr3;
          _this.setData({
            timeStr:timeStr2+":"+timeStr3
          })
        }
        //rpx 转化为 px
        var lineWidth = 6 / _this.data.rate;
        var ctx = wx.createCanvasContext('progress_active');
        //var  ctx = wx.createSelectorQuery()
        //ctx.select("#progress_bg");
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#ffffff";
        ctx.lineCap = "round";
        // ctx.setLineCap("round");
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        ctx.stroke();
        ctx.draw();
      } else {
        // 记录倒计时结束的数据
        var records = wx.getStorageSync('records') || [];
        records.unshift({
          date:util.formatTime(new Date),
          // 事件类型
          cate:_this.data.iconActive,
          // 倒计时时长
          time:_this.data.time
        });
        wx.setStorageSync('records',records);
        // 清空计时器 timer
        clearInterval(timer);
        //时间文本设为 0
        _this.setData({
          timeStr:"00:00",
          // 计时完成
          okShow:true,
          pauseShow:false,
        })
      }
    }, 100);
    _this.setData({
      timer:timer,
    })
  },
  // 计时完成
  ok:function name(params) {
    clearInterval(this.data.timer);
    this.setData({
      pauseShow:true,
      okShow:false,
      continueCancleShow:false,
      clockShow:false,
    })
  },
  // 计时停止
  pause:function name(params) {
    // 首先清除原有的计时器
    clearInterval(this.data.timer);
    // 隐藏计时按钮，显示继续和放弃按钮
    this.setData({
      pauseShow:false,
      continueCancleShow:true,
      okShow:false,
    })
  },
  // 计时继续
  continue:function name(params) {
    // 隐藏继续和放弃按钮，显示暂停按钮
    this.setData({
      pauseShow:true,
      continueCancleShow:false,
      okShow:false,
    })
    // 启动计时器，继续倒计时
    this.drawActive();
  },
  // 放弃计时
  cancle:function name(params) {
    // 首先清除计时器
    clearInterval(this.data.timer);
    // 恢复按钮显示关系的初始值，保证下次进入的时候按钮显示正常
    this.setData({
      pauseShow:true,
      continueCancleShow:false,
      okShow:false,
      clockShow:false
    })

  }
})