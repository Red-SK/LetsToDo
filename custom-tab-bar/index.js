Component({

  data: {
    custom:"ture",
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        "pagePath": "../todos/todos",
        "iconPath": "../images/todosOFF.png",
        "selectedIconPath": "../images/todos.png",
      
      },
      {
        "pagePath": "../clock/clock",
        "iconPath": "../images/clockOFF.png",
        "selectedIconPath": "../images/clock.png",

      },
      {
        "pagePath": "../calendar/calendar",
        "iconPath": "../images/calendarOFF.png",
        "selectedIconPath": "../images/calendar.png",
 
      },
      {
        "pagePath": "../mine/mine",
        "iconPath": "../images/mineOFF.png",
        "selectedIconPath": "../images/mine.png",
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      //             存疑
      // this.setData({       
      //   selected: data.index
      // })
    }
  }
})