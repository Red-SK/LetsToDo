
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const result=await cloud.openapi.subscribeMessage.send({
      touser:'ooVwH5lhoa9mZUr6hIfXCfrXuK1Y',//此处需要在主体界面将用户的openid传参传过来
      page:'pages/todos/todos',//点击订阅模板消息会进入到的界面
      data:{						//此处要与所选择订阅消息模板的格式对应
        thing1:{
          value:'11111'
        },
        time2:{
          value:'2020-10-18'
        },
      },
      templateId: 'D64ZZ89iJVDy26nZa7xpdytlbhbaJr8wDV4W2QWDo9k',
    })
    console.log(result)
    return result
  }catch(err)
  {
    console.log(err)
    return err
  }
}


