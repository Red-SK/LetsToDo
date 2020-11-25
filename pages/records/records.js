const util = require('../../utils/util.js')

wx.cloud.init()
const db = wx.cloud.database()
Page({
  data: {
    // 是否被选中
    openId: "",
    activeIndex: 0,
    records: [],
    // 今日数据记录
    dayList: [],
    list: [],
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
    cateArr: [{
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: "学习"
      },
      {
        icon: 'read',
        text: '阅读'
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
        icon: 'rest',
        text: '休息'
      },
    ]
  },
  onShow: function name(params) {
    var _this = this;
    console.log(user-open-id);
    db.collection('tomatoRecord').where({
        _openid: 'user-open-id',
      })
      .get({
        success: function (res) {
          if (res.data.length == 0) {
            _this.insertData();
            console.log("更新失败");
          } else {
            _this.setData({
              'sum[0].val': day,
              'sum[1].val': total,
              'sum[2].val': dayTime,
              'sum[3].val': totalTime,
              daylist:daylist,
              records:records,
            })
            console.log("更新本地缓存");
          }
        }
      })
    // db.collection('tomatoRecord').where({
    //   _openid: 'user-open-id',
    // })
    // .get({
    //   success: function(res) {
    //     // res.data 是包含以上定义的两条记录的数组
    //     console.log(res.data)
    //   }
    // })


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

    var dayList = [];
    // records 中有数据
    if (records.length > 0) {
      for (var i = 0; i < records.length; ++i) {
        // 通过日期字符串比较来判断是否是今天的数据
        if (records[i].date.substr(0, 10) == util.formatTime(new Date).substr(0, 10)) {
          day = day + 1;
          dayTime = dayTime + parseInt(records[i].time);
          dayList.push(records[i]);
          this.setData({
            dayList: dayList,
            // list 是切换显示今日和历史，默认打开页面都显示今日
            list: dayList,
          })
        }
        totalTime = totalTime + parseInt(records[i].time);
      }
      // console.log("dayTime = " + dayTime);
      this.setData({
        'sum[0].val': day,
        'sum[1].val': total,
        'sum[2].val': dayTime + '分钟',
        'sum[3].val': totalTime + '分钟'
      })
      this.updateRecords();
    }
  },
  // 今日记录和历史记录页面的切换
  changeType: function name(params) {
    var index = params.currentTarget.dataset.index;
    if (index == 0) {
      this.setData({
        list: this.data.dayList,
      })
    } else if (index == 1) {
      this.setData({
        list: this.records,
      })
      // console.log(this.records);
    }
    this.setData({
      activeIndex: params.currentTarget.dataset.index,
    })
    console.log(params.currentTarget.dataset.index);
  },
  insertData: function name(params) {
    var _this = this;
    db.collection('tomatoRecord').add({

      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了

        due: util.formatTime(new Date),
        day: _this.data.sum[0].val,
        total: _this.data.sum[1].val,
        dayTime: _this.data.sum[2].val,
        totalTime: _this.data.sum[3].val,
        daylist: _this.data.dayList,
        records: _this.data.records,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log("插入成功！")
      }
    })
  },
  updateRecords: function name(params) {
    var _this = this;
    db.collection('tomatoRecord').where({
        _openid: 'user-open-id',
      })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          if (res.data.length == 0) {
            _this.insertData();
          } else {
            db.collection('tomatoRecord').where({
                _openid: 'user-open-id',
              })
              .update({
                data: {
                  due: util.formatTime(new Date),
                  day: _this.data.sum[0].val,
                  total: _this.data.sum[1].val,
                  dayTime: _this.data.sum[2].val,
                  totalTime: _this.data.sum[3].val,
                  daylist: _this.data.dayList,
                  records: _this.data.records,
                },
              })
          }
        }
      })
  }
})