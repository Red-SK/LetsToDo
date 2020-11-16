const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: cloud.getWXContext().OPENID,
        page: '/pages/index/index',
        lang: 'zh_CN',
        data: {
          thing1: {
            value: '1231231'
          },
          time2: {
            value: '15:22'
          }
        },
        templateId: 'D64ZZ89iJVDy26nZa7xpdytlbhbaJr8wDV4W2QWDo9k',
        miniprogramState: 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}