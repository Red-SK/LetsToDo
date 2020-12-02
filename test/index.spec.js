const automator = require('miniprogram-automator')

// beforeAll(async () => {
//     miniProgram = await automator.launch({
//       cliPath: 'F:/微信小程序Build/微信web开发者工具/cli.bat', 
//       projectPath: 'F:/Demo-test/Double-Ten'
//     })
//     page = await miniProgram.reLaunch('/pages/clock/clock')
//     await page.waitFor(500)
// }, 50000)

describe('LetsToDo自动化测试', () => {
  let miniProgram;
  // 运行测试前调用
  beforeAll(async () => {
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://localhost:9420',
    });
  });
  // 运行测试后调用
  afterAll(() => {
    miniProgram.disconnect();
  });
  // 测试内容

  it('主页按钮测试', async () => {
    const page = await miniProgram.reLaunch('/pages/index/index');
    // 获取按钮组件信息
    const basicApplyButton = await page.$('.userinfo-nickname-wrapper');
    // 判断按钮显示内容
    expect(await basicApplyButton.wxml()).toContain('LetsToDo!');
    await page.callMethod('onGetOpenid')
  });

  it('创建事项功能测试', async () => {
    page = await miniProgram.reLaunch('/pages/clock/clock'),
      expect(page.path).toContain('pages/clock/clock');
      await page.waitFor(3000)
  }, 20000);

  it('番茄时钟时间选择测试', async () => {
    page = await miniProgram.reLaunch('/pages/calendar/calendar'),
      expect(page.path).toContain('pages/calendar/calendar');
      await page.waitFor(2000)
  }, 20000);

  it('日历时间选择测试', async () => {
    page = await miniProgram.reLaunch('/pages/mine/mine'),
      expect(page.path).toContain('pages/mine/mine');
  }, 20000);

  // it('maketodos跳转测试', async () => {
  //   page = await miniProgram.reLaunch('/pages/maketodos/maketodos'),
  //     expect(page.path).toContain('pages/maketodos/maketodos');
  // }, 20000);

  // it('todos数据测试', async () => {
  //   page = await miniProgram.reLaunch('/pages/todos/todos');
  //   const tmp = await page.data('checkboxItems');
  //   const tmp2 = await page.data('checkboxItems2')
  //   expect(tmp).toBeDefined();
  //   expect(tmp2).toBeDefined();
  // })

  // it('日历数据测试',async()=>{
  //   page = await miniProgram.reLaunch('/pages/calendar/calendar');
  //   const tmp = await page.data('todolist');
  //   expect(tmp).toBeDefined();
  // })
});