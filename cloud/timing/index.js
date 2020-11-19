// 云函数入口文件
const cloud = require('wx-server-sdk');
var result = 0;

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
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
  console.log(year+"-"+month+"-"+day)
  timedb.collection('lists').where({
    due: year+"-"+month+"-"+day
  })
  .get({
    success: function(res) {
      console.log(res.data)
    }
  })
  //   console.log("查询到了")
  //   var tmp2 = res.data;
  //   var tmp =  year+"-"+month+"-"+day;
  //   console.log(tmp)
  //   console.log(tmp2)
  //    res.data.forEach(function (item) {
  //      console.log(item)
  //      console.log("here")
  //     cloud.callFunction({	//调用发送模板消息的云函数，对应上边的那个发送函数
  //       name:"sendmessage",
  //     }).then(res =>{
  //       console.log("发送成功",res);
  //       // timedb.collection('timeList').doc(item._id).remove({
  //       //   success: function(res) {
  //       //     console.log("删除成功",res);
  //       //   },
  //       //   fail: function(res) {
  //       //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
  //       //     console.log("删除失败",res);
  //       //   }
  //       // })
  //     }).catch(res =>{
  //       console.log("发送失败",res);
  //     })
      
  //    })
  // })
 
}
