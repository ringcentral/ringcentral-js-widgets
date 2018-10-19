import Webphone from 'ringcentral-e2e-test/src/lib/webphone';
let webphone = null;
let webphone1 = null;
let webphone2 = null;
export default class WebphoneCall {
  static async createWebPhone(context) {
    webphone = new Webphone();
    context.driver.addAfterHook(async () => {
      await webphone.operateClose(JSON.parse(webphone1.text)._id, JSON.parse(webphone1.text).sessionId, JSON.parse(webphone1.text).phoneNumber);
      await webphone.operateClose(JSON.parse(webphone2.text)._id, JSON.parse(webphone2.text).sessionId, JSON.parse(webphone2.text).phoneNumber);
    });
    webphone1 = await webphone.createWebPhone('+' + context.options.option.account1[0]['did'], 'webphone', 'Test!123');
    webphone2 = await webphone.createWebPhone('+' + context.options.option.account2[0]['did'], 'webphone', 'Test!123');
    await $(app).waitFor(100);
  }
  static async makeCall(context) {
    if (context.hasMade) return;
    await console.log(JSON.parse(webphone2.text)._id);
    let result1 = await webphone.operateMakeCall(JSON.parse(webphone2.text)._id, JSON.parse(webphone2.text).sessionId, JSON.parse(webphone1.text).phoneNumber);
    context.hasMade = true;
  }

  static async answerCall(context) {
    await console.log(JSON.parse(webphone1.text)._id);
    let result1 = await webphone.operateAnswerCall(JSON.parse(webphone1.text)._id, JSON.parse(webphone1.text).sessionId, JSON.parse(webphone2.text).phoneNumber);
    let result2 = await webphone.operateAnswerCall(JSON.parse(webphone2.text)._id, JSON.parse(webphone2.text).sessionId, JSON.parse(webphone1.text).phoneNumber);

  }

  static async hangUp(context) {
    await console.log(JSON.parse(webphone2.text)._id);
    let result2 = await webphone.operateHangUp(JSON.parse(webphone1.text)._id, JSON.parse(webphone1.text).sessionId, JSON.parse(webphone2.text).phoneNumber);
  }
  static get steps() {
    return [
      this.createWebPhone,
      this.makeCall,
      this.answerCall,
      this.hangUp,
    ];
  }
}