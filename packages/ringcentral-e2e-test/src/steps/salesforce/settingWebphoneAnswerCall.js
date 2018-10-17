import Webphone from 'ringcentral-e2e-test/src/lib/webphone';
export default class WebphoneAnserCall {

  static async setting2PhoneAnswerCall(context) {
    const webphone = new Webphone();
    context.driver.addAfterHook(async () => {
      await webphone.operateClose(JSON.parse(webphone1.text)._id, JSON.parse(webphone1.text).sessionId, JSON.parse(webphone1.text).phoneNumber);
      await webphone.operateClose(JSON.parse(webphone2.text)._id, JSON.parse(webphone2.text).sessionId, JSON.parse(webphone2.text).phoneNumber);
    });
    let webphone1 = await webphone.createWebPhone('+' + context.options.option.account2[0]['did'], 'webphone', 'Test!123');
    let result1 = await webphone.preOperateAnswerCall(JSON.parse(webphone1.text)._id, JSON.parse(webphone1.text).sessionId);
    let webphone2 = await webphone.createWebPhone('+' + context.options.option.account3[0]['did'], 'webphone', 'Test!123');
    let result2 = await webphone.preOperateAnswerCall(JSON.parse(webphone2.text)._id, JSON.parse(webphone2.text).sessionId);
    await $(app).waitFor(100);
  }
  static get steps() {
    return [
      this.setting2PhoneAnswerCall,
    ];
  }
}