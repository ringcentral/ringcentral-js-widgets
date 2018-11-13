import Webphone, { PhoneType } from '../../../lib/webphone';
import callingTypes from '../../../enums/callingTypes';


export default function createWebphone({
  from,
  to,
}) {
  return class {
    static async _getPhone(context, account) {
      const env = context.options.tag.envs;
      const phoneBody = (await Webphone.getPhonesByNumber(`+${account.did}`, env)).body;
      if (phoneBody.length > 0) {
        const body = phoneBody[0];
        await Webphone.operate({
          phoneId: body._id,
          sessionId: body.sessionId,
          action: 'close',
          phoneNumber: body.phoneNumber
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
      for(const account of accounts) {
        if (account && !account.webphone) {
          await this._registerWebphone(context, account);
        }
      }
    }

    static async _makeCall(context, [from, to]) {
      await Webphone.operate({
        phoneId: from.webphone.id,
        sessionId: from.webphone.sessionId,
        action: 'makeCall',
        phoneNumber: to.webphone.phoneNumber
      });
    }

    static async makeCall(context) {
      console.log('makeCall');
      await this._prepare(context, [from, to]);
      await this._makeCall(context, [from, to]);
    }
  
    static async hangup(context) {
      const status = await this._status(context, 'hangup');
      console.log("hangup", status);
      await Webphone.operate({
        phoneId: from.webphone.id,
        sessionId: from.webphone.sessionId,
        action: 'hangup',
        phoneNumber: to.webphone.phoneNumber
      });
    }
  
    static async answerCall(context) {
      const status = await this._status(context, 'answerCall');
      console.log('answerCall', status);
      await Webphone.operate({
        phoneId: to.webphone.id,   
        sessionId: to.webphone.sessionId,
        action: 'answerCall',
        phoneNumber: from.webphone.phoneNumber
      });
    }

    static async _status(context, action){
      let status = false;
      let fromStatus;
      let toStatus;
      const waitUntil = Date.now() + 20000;
      if(action === 'answerCall') {
        while((fromStatus !== 'accepted' || toStatus !=='invited') && Date.now() < waitUntil){
          await Webphone.sleep(1000);
          fromStatus = (await Webphone.getPhonesById(from.webphone.id)).body.status;
          toStatus = (await Webphone.getPhonesById(to.webphone.id)).body.status;
          if (fromStatus === 'accepted' && toStatus ==='invited') {
            status = true; 
            return status;
          }
        }
      } else if (action === 'hangup') {
        for(let i=0; i<10; i++){
          await Webphone.sleep(1000);
          fromStatus = (await Webphone.getPhonesById(from.webphone.id)).body.status;
          toStatus = (await Webphone.getPhonesById(to.webphone.id)).body.status;
          if (fromStatus === 'accepted' || toStatus ==='invited' || toStatus === 'accepted' || fromStatus ==='invited') {
            status = true; 
            return status;
          }
        }
      }
      return status;
    }

    static async _preAnswerCall(context, [from, to]) {
      await Webphone.preOperate({
        phoneId: to.webphone.id,
        sessionId: to.webphone.sessionId,
        action: 'answerCall'
      });
    }
  
    static async preAnswerCall(context) {
      console.log("preAnswerCall");
      await this._prepare(context, [from, to]);
      await this._preAnswerCall(context, [from, to]);
    }
  
    static async close(context){
      await this._close(context, from);
      await this._close(context, to);
    }

    static async getIsMuteEnabled(context) {
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