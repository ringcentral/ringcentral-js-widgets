import Webphone from 'ringcentral-e2e-test/src/lib/webphone';

export default class operateWebPhoneBasic {

  static async createWebPhone() {
    const webphone = new Webphone();
    let webphones = [];
    context.driver.addAfterHook(async () => {
      await this.close();
    });
    const webphone1 = await webphone.createWebPhone('+' + context.options.option.account1[0]['did'], 'webphone', 'Test!123');
    const webphone2 = await webphone.createWebPhone('+' + context.options.option.account2[0]['did'], 'webphone', 'Test!123');
    await webphones.push({ id: JSON.parse(webphone1.text)._id, sessionId: JSON.parse(webphone1.text).sessionId, phoneNumber: JSON.parse(webphone1.text).phoneNumber });
    await webphones.push({ id: JSON.parse(webphone2.text)._id, sessionId: JSON.parse(webphone2.text).sessionId, phoneNumber: JSON.parse(webphone2.text).phoneNumber });
    context.options.option.webphones = webphones;
    context.options.option.webphone = webphone;
    console.log(context.options.option.webphones);
  }

  static async makeCall() {
    console.log("makeCall");
    const webphone1 = context.options.option.webphones[0];
    const webphone2 = context.options.option.webphones[1];
    const webphone = context.options.option.webphone;
    await webphone.operate({ phoneId: webphone2["id"], sessionId: webphone2["sessionId"], action: 'makeCall', phoneNumber: webphone1["phoneNumber"] });
  }

  static async preAnswerCall() {
    const webphone1 = context.options.option.webphones[0];
    const webphone2 = context.options.option.webphones[1];
    const webphone = context.options.option.webphone;
    await webphone.preOperate({ phoneId: webphone1["id"], sessionId: webphone1["sessionId"], action: 'answerCall' });
    await webphone.preOperate({ phoneId: webphone2["id"], sessionId: webphone2["sessionId"], action: 'answerCall' });
  }

  static async answerCall() {
    const webphone1 = context.options.option.webphones[0];
    const webphone2 = context.options.option.webphones[1];
    const webphone = context.options.option.webphone;
    await webphone.operate({ phoneId: webphone1["id"], sessionId: webphone1["sessionId"], action: 'answerCall', phoneNumber: webphone2["phoneNumber"] });
  }

  static async hangup() {
    const webphone1 = context.options.option.webphones[0];
    const webphone2 = context.options.option.webphones[1];
    const webphone = context.options.option.webphone;
    await webphone.operate({ phoneId: webphone1["id"], sessionId: webphone1["sessionId"], action: 'hangup', phoneNumber: webphone2["phoneNumber"] });
  }

  static async close() {
    const webphone1 = context.options.option.webphones[0];
    const webphone2 = context.options.option.webphones[1];
    const webphone = context.options.option.webphone;
    console.log(webphone1);
    await webphone.operate({ phoneId: webphone1["id"], sessionId: webphone1["sessionId"], action: 'close', phoneNumber: webphone1["phoneNumber"] });
    await webphone.operate({ phoneId: webphone2["id"], sessionId: webphone2["sessionId"], action: 'close', phoneNumber: webphone2["phoneNumber"] });
  }

  static get steps() {
    return [
      this.createWebPhone,
    ];
  }
}