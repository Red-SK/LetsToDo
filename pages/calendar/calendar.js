import DataService from '../../datas/DataService';
import { LEVEL } from '../../datas/Config';
import { promiseHandle, log, formatNumber } from '../../utils/util';
wx.cloud.init()
var util = require('../../utils/util.js');
const db = wx.cloud.database()
var thedate
Page({
  data: {
    showMonth: {},
    data: { showMonth: '' },
    selectDateText: '',
    pickerDateValue: '',

    isSelectMode: false,
    isMaskShow: false,
    isUpdateMode: false,

    // modal
    isModalShow: false,
    modalMsg: '',

    //事项等级数据
    levelSelectedValue: LEVEL.normal,
    levelSelectData: [LEVEL.normal, LEVEL.warning, LEVEL.danger],

    // updatePanel 数据
    updatePanelTop: 10000,
    updatePanelAnimationData: {},
    todoInputValue: '',
    todoTextAreaValue: '',

    // 事项列表
    todolist: [],
  },

  onLoad() {
    let _this = this;
    var time = new Date();
    var month = (time.getMonth()+1)%12;
    var day = time.getDate();
    var year = time.getFullYear();
    var currentdate = year+"-"+month+"-"+day;
    var list = {}
    
    db.collection('lists').where({
      due: currentdate
    }).get().then(res => {
      var tmp = res.data;
      for (var i = 0; i < tmp.length; i++) {
        list[i] = tmp[i].todo;
      }
      this.setData({
        todolist : list
      })
      console.log(this.data.todolist)
    })
    promiseHandle(wx.getSystemInfo).then((data) => {
      _this.setData({
        updatePanelTop: data.windowHeight
      });
    });

    changeDate.call(this);
  },
  onShow() {
   
    let _this = this;
    var time = new Date();
    var month = (time.getMonth()+1)%12;
    var day = time.getDate();
    var year = time.getFullYear();
    var currentdate = year+"-"+month+"-"+day;
    var list = {}
    
    db.collection('lists').where({
      due: currentdate
    }).get().then(res => {
      var tmp = res.data;
      for (var i = 0; i < tmp.length; i++) {
        list[i] = tmp[i].todo;
      }
      this.setData({
        todolist : list
      })
      console.log(this.data.todolist)
    })
    promiseHandle(wx.getSystemInfo).then((data) => {
      _this.setData({
        updatePanelTop: data.windowHeight
      });
    });

    changeDate.call(this);
    if (typeof this.getTabBar == 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })

    }

    },
 
  onReady() {
    loadItemListData.call(this);
  },
  onHide(){

    var time = new Date();
    var month = (time.getMonth()+1)%12;
    var day = time.getDate();
    var year = time.getFullYear();
    var date = year+"-"+month+"-"+day;

    changeDate.call(this, new Date(year, parseInt(month) - 1, date));
    pickerDateValue: year + '-' + month;
    selectDateText:year + '年' + month + '月' + day + '日';
    
    this.data.data.selected.year = year;
    this.data.data.selected.month = month;
    this.data.data.selected.date = day;

    console.log("hide");
  },
  datePickerChangeEvent(e) {
    const date = new Date(Date.parse(e.detail.value));
    changeDate.call(this, new Date(date.getFullYear(), date.getMonth(), 1));
  },

  changeDateEvent(e) {
    const { year, month } = e.currentTarget.dataset;
    changeDate.call(this, new Date(year, parseInt(month) - 1, 1));
  },

  dateClickEvent(e) {
    

    const { year, month, date } = e.currentTarget.dataset;
    const { data } = this.data;
    let selectDateText = '';

    data['selected']['year'] = year;
    data['selected']['month'] = month;
    data['selected']['date'] = date;

    this.setData({ data: data });
    changeDate.call(this, new Date(year, parseInt(month) - 1, date));

    //获取选中的日期
    var tmpyear = year;
    var tmpmonth = month;
    if (tmpmonth < 10) tmpmonth = "0" + tmpmonth;
    var tmpdate = date;
    if (tmpdate < 10) tmpdate = "0" + tmpdate;
    thedate = tmpyear + "-" + tmpmonth + "-" + tmpdate
    console.log(thedate)
    //数据库中获取对应日期的事项
    var list = {}
    db.collection('lists').where({
      due: thedate
    }).get().then(res => {
      var tmp = res.data;
      for (var i = 0; i < tmp.length; i++) {
        list[i] = tmp[i].todo;
      }
      console.log(list)
      this.setData({
        todolist : list
      })
      console.log(this.data.todolist)
    })
  },
  showUpdatePanelEvent() {
    showUpdatePanel.call(this);
    this.setData({ isUpdateMode: true });
  },

  closeUpdatePanelEvent() {
    closeUpdatePanel.call(this);
  },

  
  saveDataEvent() {
    const { todoInputValue, todoTextAreaValue, levelSelectedValue } = this.data;
    const { year, month, date } = this.data.data.selected;
    if (todoInputValue !== '') {

      let promise = new DataService({
        title: todoInputValue,
        content: todoTextAreaValue,
        level: levelSelectedValue,
        year: year,
        month: parseInt(month) - 1,
        date: date
      }).save();
      promise && promise.then(() => {
        //清空表单
        this.setData({
          todoTextAreaValue: '',
          levelSelectedValue: LEVEL.normal,
          todoInputValue: ''
        });
        loadItemListData.call(this);
      })

      closeUpdatePanel.call(this);
    } else {
      showModal.call(this, '请填写事项内容');
    }
  },

  listItemClickEvent(e) {
    const { id } = e.currentTarget.dataset;

    let data = this.data.itemList || [];
    let editItemList = this.data.editItemList || [];
    const index = data.findIndex((item) => {
      return item['_id'] == id;
    });

    if (index >= 0) {
      data[index]['checked'] = !data[index]['checked'];
      const tIndx = editItemList.findIndex((item) => {
        return item == id;
      });
      if (data[index]['checked']) {
        tIndx >= 0 || editItemList.push(id);
      } else {
        editItemList.splice(tIndx, 1);
      }
      this.setData({ itemList: data, editItemList: editItemList });
    }
  },

  //提示模态窗口关闭事件
  closeModalEvent() {
    closeModal.call(this);
  }
});






/**
 * 显示事项数据添加更新面板
 */
function showUpdatePanel() {
  let animation = wx.createAnimation({
    duration: 600
  });
  animation.translateY('-100%').step();
  this.setData({
    updatePanelAnimationData: animation.export()
  });
}

/**
 * 显示模态窗口
 * @param {String} msg 显示消息
 */
function showModal(msg) {
  this.setData({
    isModalShow: true,
    isMaskShow: true,
    modalMsg: msg
  });
}

/**
 * 关闭模态窗口
 */
function closeModal() {
  this.setData({
    isModalShow: false,
    isMaskShow: false,
    modalMsg: ''
  });
}

/**
 * 关闭事项数据添加更新面板
 */
function closeUpdatePanel() {
  let animation = wx.createAnimation({
    duration: 600
  });
  animation.translateY('100%').step();
  this.setData({
    updatePanelAnimationData: animation.export()
  });
}

/**
 * 加载事项列表数据
 */
function loadItemListData() {
  const { year, month, date } = this.data.data.selected;
  let _this = this;
  DataService.findByDate(new Date(Date.parse([year, month, date].join('-')))).then((data) => {
    _this.setData({ itemList: data });
  });

}

// /**
//  * 重置是项列表勾选记录
//  */
// function resetItemListDataCheck() {
//   let data = this.data.itemList || [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     data[i]['checked'] = false;
//   }
//   this.setData({ itemList: data });
// }

/**
 * 变更日期数据
 * @param {Date} targetDate 当前日期对象
 */
function changeDate(targetDate) {
  let date = targetDate || new Date();
  let currentDateObj = new Date();

  let showMonth, //当天显示月份
    showYear, //当前显示年份
    showDay, //当前显示星期
    showDate, //当前显示第几天
    showMonthFirstDateDay, //当前显示月份第一天的星期
    showMonthLastDateDay, //当前显示月份最后一天的星期
    showMonthDateCount; //当前月份的总天数

  let data = [];

  showDate = date.getDate();
  showMonth = date.getMonth() + 1;
  showYear = date.getFullYear();
  showDay = date.getDay();

  showMonthDateCount = new Date(showYear, showMonth, 0).getDate();
  date.setDate(1);
  showMonthFirstDateDay = date.getDay(); //当前显示月份第一天的星期
  date.setDate(showMonthDateCount);
  showMonthLastDateDay = date.getDay(); //当前显示月份最后一天的星期  

  let beforeDayCount = 0,
    beforeYear, //上页月年份
    beforMonth, //上页月份
    afterYear, //下页年份
    afterMonth, //下页月份
    afterDayCount = 0, //上页显示天数
    beforeMonthDayCount = 0; //上页月份总天数

  //上一个月月份
  beforMonth = showMonth === 1 ? 12 : showMonth - 1;
  //上一个月年份
  beforeYear = showMonth === 1 ? showYear - 1 : showYear;
  //下个月月份
  afterMonth = showMonth === 12 ? 1 : showMonth + 1;
  //下个月年份
  afterYear = showMonth === 12 ? showYear + 1 : showYear;

  //获取上一页的显示天数
  if (showMonthFirstDateDay != 0)
    beforeDayCount = showMonthFirstDateDay - 1;
  else
    beforeDayCount = 6;

  //获取下页的显示天数
  if (showMonthLastDateDay != 0)
    afterDayCount = 7 - showMonthLastDateDay;
  else
    showMonthLastDateDay = 0;

  //如果天数不够6行，则补充完整
  let tDay = showMonthDateCount + beforeDayCount + afterDayCount;
  if (tDay <= 35)
    afterDayCount += (42 - tDay); //6行7列 = 42

  let selected = this.data.data['selected'] || { year: showYear, month: showMonth, date: showDate };
  let selectDateText = selected.year + '年' + formatNumber(selected.month) + '月' + formatNumber(selected.date) + '日';

  data = {
    currentDate: currentDateObj.getDate(), //当天日期第几天
    currentYear: currentDateObj.getFullYear(), //当天年份
    currentDay: currentDateObj.getDay(), //当天星期
    currentMonth: currentDateObj.getMonth() + 1, //当天月份
    showMonth: showMonth, //当前显示月份
    showDate: showDate, //当前显示月份的第几天 
    showYear: showYear, //当前显示月份的年份
    beforeYear: beforeYear, //当前页上一页的年份
    beforMonth: beforMonth, //当前页上一页的月份
    afterYear: afterYear, //当前页下一页的年份
    afterMonth: afterMonth, //当前页下一页的月份
    selected: selected,
    selectDateText: selectDateText
  };

  let dates = [];
  let _id = 0; //为wx:key指定

  if (beforeDayCount > 0) {
    beforeMonthDayCount = new Date(beforeYear, beforMonth, 0).getDate();
    for (let fIdx = 0; fIdx < beforeDayCount; fIdx++) {
      dates.unshift({
        _id: _id,
        year: beforeYear,
        month: beforMonth,
        date: beforeMonthDayCount - fIdx
      });
      _id++;
    }
  }

  for (let cIdx = 1; cIdx <= showMonthDateCount; cIdx++) {
    dates.push({
      _id: _id,
      active: (selected['year'] == showYear && selected['month'] == showMonth && selected['date'] == cIdx), //选中状态判断
      year: showYear,
      month: showMonth,
      date: cIdx
    });
    _id++;
  }

  if (afterDayCount > 0) {
    for (let lIdx = 1; lIdx <= afterDayCount; lIdx++) {
      dates.push({
        _id: _id,
        year: afterYear,
        month: afterMonth,
        date: lIdx
      });
      _id++;
    }
  }

  data.dates = dates;


  this.setData({ data: data, pickerDateValue: showYear + '-' + showMonth });
  loadItemListData.call(this);
}