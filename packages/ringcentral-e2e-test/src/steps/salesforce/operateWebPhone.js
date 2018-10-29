import Webphone, { PhoneType } from 'ringcentral-e2e-test/src/lib/webphone';

export default class operateWebPhoneBasic {
  static async getPhone(account) {
    const phoneRes = await Webphone.getPhonesByNumber(`+${account.did}`);
    const phoneBody = JSON.parse(phoneRes.text);
    if(phoneBody.length > 0 ){
      await Webphone.operate({
        phoneId: phoneBody[0]._id,
        sessionId: phoneBody[0].sessionId,
        action: 'close',
        phoneNumber: phoneBody[0].phoneNumber
      });
    }
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
    
    const dailer = await this.getPhone(loginAccount);
    const receiver = await this.getPhone(receiverAccount);
    context.options.option.webphones = [dailer, receiver];
    context.options.option.webphone = Webphone;
    context.driver.addAfterHook(async () => {
      await this.close(context);
    });
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

  static async preAnswerCall(context) {
    const { webphones } = context.options.option;
    const dialer = webphones[0];
    const receiver = webphones[1];
    await Webphone.preOperate({
      phoneId: dialer.id,
      sessionId: dialer.sessionId,
      action: 'answerCall'
    });
    await Webphone.preOperate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'answerCall'
    });
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

  static async close(context) {
    const { webphones } = context.options.option;
    const dialer = webphones[0];
    const receiver = webphones[1];
    console.log(dialer);
    await Webphone.operate({
      phoneId: dialer.id,
      sessionId: dialer.sessionId,
      action: 'close',
      phoneNumber: dialer.phoneNumber
    });
    await Webphone.operate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'close',
      phoneNumber: receiver.phoneNumber
    });
  }

  static get steps() {
    return [
      this.createWebPhone,
    ];
  }
}
