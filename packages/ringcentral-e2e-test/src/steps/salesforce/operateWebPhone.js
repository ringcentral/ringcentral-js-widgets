import Webphone, { PhoneType } from 'ringcentral-e2e-test/src/lib/webphone';

export default class operateWebPhoneBasic {
  static async getPhone(account) {
    const res = await Webphone.createWebPhone(`+${account.did}`, PhoneType.WebPhone, 'Test!123');
    const body = JSON.parse(res.text);
    const webphone = {
      id: body._id,
      sessionId: body.sessionId,
      phoneNumber: body.phoneNumber
    };
    return webphone;
  }
  static async createWebPhone(context) {
    const { accounts } = context.options.option;
    const loginAccount = accounts[0];
    const receiverAccount = accounts[1];
    context.driver.addAfterHook(async () => {
      await this.close();
    });
    const dailer = await this.getPhone(loginAccount);
    const receiver = await this.getPhone(receiverAccount);
    context.options.option.webphones = [dailer, receiver];
    context.options.option.webphone = Webphone;
    console.log(context.options.option.webphones);
  }

  static async makeCall(context) {
    console.log('makeCall');
    const { webphones } = context.options.option;
    const dialer = webphones[0];
    const receiver = webphones[1];
    await Webphone.operate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'makeCall',
      phoneNumber: dialer.phoneNumber
    });
  }

  static async preAnswerCall() {
    const webphone1 = context.options.option.webphones[0];
    const webphone2 = context.options.option.webphones[1];
    const webphone = context.options.option.webphone;
    await webphone.preOperate({ phoneId: webphone1["id"], sessionId: webphone1["sessionId"], action: 'answerCall' });
    await webphone.preOperate({ phoneId: webphone2["id"], sessionId: webphone2["sessionId"], action: 'answerCall' });
  }

  static async answerCall(context) {
    const { webphones } = context.options.option;
    const receiver = webphones[0];
    const dialer = webphones[1];
    await Webphone.operate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'answerCall',
      phoneNumber: dialer.phoneNumber
    });
  }

  static async hangup(context) {
    const { webphones } = context.options.option;
    const receiver = webphones[0];
    const dialer = webphones[1];
    await Webphone.operate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'hangup',
      phoneNumber: dialer.phoneNumber
    });
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