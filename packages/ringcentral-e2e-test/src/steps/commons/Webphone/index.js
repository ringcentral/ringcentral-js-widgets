import Webphone, { PhoneType } from '../../../lib/webphone';
import callingTypes from '../../../enums/callingTypes';


export default function createWebphone({
  from,
  to,
}) {
  return class {
    static async _getPhone(context, account) {
      const env = context.options.tag.envs;
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
      return {
        id: body._id,
        sessionId: body.sessionId,
        phoneNumber: body.phoneNumber
      };
    }
  
    static async _setWebphpne(context, account) {
      if (!account) return;
      const { loginAccount, accounts } = context.options.option.playload;
      const webphone = await this._getPhone(context, account);
      if (account === loginAccount) {
        loginAccount.webphone = webphone;
      } else {
        accounts.forEach(_account => {
          if (_account === account) {
            _account.webphone = webphone;
          }
        })
      }
    }
  
    static async _registerWebphone(context, account) {
      await this._setWebphpne(context, account);
      context.driver.addAfterHook(async () => {
        await this._close(context, account);
      });
    }
    
    static async _close(context, account) {
      await Webphone.operate({
        phoneId: account.webphone.id,
        sessionId: account.webphone.sessionId,
        action: 'close',
        phoneNumber: account.webphone.phoneNumber
      });
      delete account.webphone;
    }

    static async _prepare(context) {
      const accounts = [from, to];
      accounts.forEach(async (account) => {
        if (account && !account.webphone) {
          await this._registerWebphone(context, account);
        }
      });
    }


    static async makeCall(context) {
      console.log('makeCall');
      await this._prepare(context, [from, to]);
      await Webphone.operate({
        phoneId: from.webphone.id,
        sessionId: from.webphone.sessionId,
        action: 'makeCall',
        phoneNumber: to.webphone.phoneNumber
      });
    }
  
    static async hangup(context) {
      console.log("hangup");
      await Webphone.operate({
        phoneId: to.webphone.id,
        sessionId: to.webphone.sessionId,
        action: 'hangup',
        phoneNumber: from.webphone.phoneNumber
      });
    }
  
    static async answerCall(context) {
      console.log('answerCall');
      await Webphone.operate({
        phoneId: from.webphone.id,   
        sessionId: from.webphone.sessionId,
        action: 'answerCall',
        phoneNumber: to.webphone.phoneNumber
      });
    }
  
    static async preAnswerCall(context) {
      console.log("preAnswerCall");
      await this._prepare(context, [from, to]);
      await Webphone.preOperate({
        phoneId: to.webphone.id,
        sessionId: to.webphone.sessionId,
        action: 'answerCall'
      });
    }
  
    static async getIsMuteEnabled(context) {
      console.log("getIsMuteEnabled");
      const className = await $(context.app).getAttribute('@mute', 'class');
      const isMuteButtonDisabled = className.indexOf('buttonDisabled') > -1;
      return !isMuteButtonDisabled;
    }
  
    static async getIsHangupEnabled(context) {
      const className = await $(context.app).getAttribute('@hangup', 'class');
      const isHangupDisabled = className.indexOf('buttonDisabled') > -1;
      return !isHangupDisabled;
    }
  
    static async getIsMuteButtonEnabled(context) {
      const isMuteButtonDisabled = await this.getIsMuteButtonDisabled(context);
      return !isMuteButtonDisabled;
    }
  
    static async getIsMuteButtonDisabled(context) {
      const className = await $(context.app).getAttribute('@mute', 'class');
      const isMuteButtonDisabled = className.indexOf('buttonDisabled') > -1;
      return isMuteButtonDisabled;
    }
  
    static async getIsRejectButtonEnabled(context) {
      const className = await $(context.app).getAttribute('@reject', 'class');
      const isRejectButtonEnabled = className.indexOf('buttonDisabled') === -1;
      return isRejectButtonEnabled;
    }
  
    static get steps() {
      return [];
    }
  }
  
}