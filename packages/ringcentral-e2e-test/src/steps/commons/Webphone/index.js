import Webphone, { PhoneType } from '../../../lib/webphone';
import { callingTypes } from '../../../steps/commons/Setting/setCallingSetting';

/* global $ */
export default class operateWebPhoneBasic {
  static async _getPhone(account, env) {
    const phoneRes = await Webphone.getPhonesByNumber(`+${account.did}`, env);
    const phoneBody = JSON.parse(phoneRes.text);
    if (phoneBody.length > 0) {
      await Webphone.operate({
        phoneId: phoneBody[0]._id,
        sessionId: phoneBody[0].sessionId,
        action: 'close',
        phoneNumber: phoneBody[0].phoneNumber
      });
    }
    const res = await Webphone.createWebPhone({
      phoneNumber: `+${account.did}`,
      type: PhoneType.WebPhone,
      password: 'Test!123',
      env
    });
    const body = JSON.parse(res.text);
    const webphone = {
      id: body._id,
      sessionId: body.sessionId,
      phoneNumber: body.phoneNumber
    };
    return webphone;
  }

  static async createWebPhone(context) {
    const isCustomPhone = context.options.option.callingSetting === callingTypes.customPhone;
    let { accounts, loginAccount } = context.options.option.playload;
    let receiverAccount;
    if (isCustomPhone && accounts.length > 1) {
      loginAccount = accounts[1];
    }    
    receiverAccount = accounts[0];
    const dailer = await this._getPhone(loginAccount, context.options.tag.envs);
    const receiver = await this._getPhone(receiverAccount, context.options.tag.envs);
    context.options.option.webphones = [dailer, receiver];
    context.options.option.webphone = Webphone;
    context.driver.addAfterHook(async () => {
      await this.close(context);
    });
  }

  static async makeCall(context) {
    console.log('makeCall');
    const { webphones } = context.options.option;
    const dailer = webphones[0];
    const receiver = webphones[1];
    await Webphone.operate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'makeCall',
      phoneNumber: dailer.phoneNumber
    });
  }

  static async hangup(context) {
    console.log("hangup");
    const { webphones } = context.options.option;
    const dialer = webphones[0];
    const receiver = webphones[1];
    await Webphone.operate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'hangup',
      phoneNumber: dialer.phoneNumber
    });
  }

  static async answerCall(context) {
    console.log('answerCall');
    const { webphones } = context.options.option;
    const dialer = webphones[0];
    const receiver = webphones[1];
    await Webphone.operate({
      phoneId: dialer.id,   
      sessionId: dialer.sessionId,
      action: 'answerCall',
      phoneNumber: receiver.phoneNumber
    });
  }

  static async preAnswerCall(context) {
    console.log("preAnswerCall");
    const { webphones } = context.options.option;
    const dialer = webphones[0];
    const receiver = webphones[1];
    const isCustomPhone = context.options.option.callingSetting === callingTypes.customPhone;
    await Webphone.preOperate({
      phoneId: receiver.id,
      sessionId: receiver.sessionId,
      action: 'answerCall'
    });
    await Webphone.preOperate({
      phoneId: dialer.id,
      sessionId: dialer.sessionId,
      action: 'answerCall'
    });
  }

  static async close(context) {
    const { webphones } = context.options.option;
    const dialer = webphones[0];
    const receiver = webphones[1];
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

  static async getIsMuteEnabled(context) {
    console.log("getIsMuteEnabled");
    const className = await $(context.driver.app).getAttribute('@mute', 'class');
    const isMuteButtonDisabled = className.indexOf('buttonDisabled') > -1;
    return !isMuteButtonDisabled;
  }

  static async getIsHangupEnabled(context) {
    const className = await $(context.driver.app).getAttribute('@hangup', 'class');
    const isHangupDisabled = className.indexOf('buttonDisabled') > -1;
    return !isHangupDisabled;
  }

  static async getIsMuteButtonEnabled(context) {
    const isMuteButtonDisabled = await this.getIsMuteButtonDisabled(context);
    return !isMuteButtonDisabled;
  }

  static async getIsMuteButtonDisabled(context) {
    const className = await $(context.driver.app).getAttribute('@mute', 'class');
    const isMuteButtonDisabled = className.indexOf('buttonDisabled') > -1;
    return isMuteButtonDisabled;
  }

  static async getIsRejectButtonEnabled(context) {
    const className = await $(context.driver.app).getAttribute('@reject', 'class');
    const isRejectButtonEnabled = className.indexOf('buttonDisabled') === -1;
    return isRejectButtonEnabled;
  }

  static get steps() {
    return [
      this.createWebPhone,
    ];
  }
}
