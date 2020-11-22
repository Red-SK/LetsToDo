// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
//获取日期
  var myDate=new Date();
  var day = myDate.getDate();
  var month = myDate.getMonth();
  month++
  var year = myDate.getFullYear();
  if(month<10) 
    {month="0"+month}
  if(day<10)
    {day="0"+day;}
  var  date1  = year+"-"+month+"-"+day
  console.log(date1)

  db.collection('lists').where({
    remind:true,
    due:date1
  }).get().then(res=>{
    res.data.forEach(function (item) {
      console.log("here")
      cloud.callFunction({
        name: "sendmessage",
        data:{
          openid:item._openid,
          date1:item.due,
          content1:item.todo,
        }
      }).then(res => {
        console.log("推送消息成功", res)
      }).catch(res => {
        console.log("消息推送失败", res)
      })
    })

  })

  // .get().then(res => {
  //   res.data.forEach(function (item) {
    //   cloud.callFunction({	//调用发送模板消息的云函数，对应上边的那个发送函数
    //     name:"fasong",
    //     data:{
    //       openid:item._openid,
    //       date1:item.date1,
    //       content1:item.content1,
    //     }
    //   }).then(res =>{
    //     console.log("发送成功",res);
    //     timedb.collection('timeList').doc(item._id).remove({
    //       success: function(res) {
    //         console.log("删除成功",res);
    //       },
    //       fail: function(res) {
    //         // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //         console.log("删除失败",res);
    //       }
    //     })
    //   }).catch(res =>{
    //     console.log("发送失败",res);
    //   })
    // })
 
  }

