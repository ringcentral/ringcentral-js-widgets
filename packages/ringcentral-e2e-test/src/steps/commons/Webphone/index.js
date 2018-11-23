import Webphone, { PhoneType } from '../../../lib/webphone';
import callingTypes from '../../../enums/callingTypes';
import checkCallStatus from '../../utils/checkCallStatus';



export default function createWebphone({
  from,
  to,
}) {
  return class WebPhone {
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
      if(!account.hasOwnProperty('webphone')) return;
      console.log('close', account.webphone.phoneNumber);
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
      context.driver.addAfterHook(async () => {
        await this.hangup(context);
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
      if (!status) return;
      await Webphone.operate({
        phoneId: from.webphone.id,
        sessionId: from.webphone.sessionId,
        action: 'hangup',
        phoneNumber: to.webphone.phoneNumber
      });
    }
  
    static async answerCall(context) {
      const status = await this._status(context, 'answerCall');
      console.log("answerCall", status);
      if(!status) return;
      await Webphone.operate({
        phoneId: to.webphone.id,   
        sessionId: to.webphone.sessionId,
        action: 'answerCall',
        phoneNumber: from.webphone.phoneNumber
      });
    }

    static async _status(context, action){
      let status = false;
      if(!['answerCall', 'hangup'].includes(action)) return status;
      if((!from.hasOwnProperty('webphone')) || (!to.hasOwnProperty('webphone'))) return status;
      const waitUntil = Date.now() + 30000;
      while(Date.now() < waitUntil){
        await Webphone.sleep(3000);
        const fromStatus = (await Webphone.getPhonesById(from.webphone.id)).body.status;
        const toStatus = (await Webphone.getPhonesById(to.webphone.id)).body.status;
        if (action === 'answerCall' && fromStatus === 'accepted' && toStatus ==='invited' ) {
          status = true;
          break;
        } else if(action === 'hangup'){
          if(fromStatus === 'terminated' && toStatus ==='terminated') {
            status = false;
            break;
          }else if(['accepted','invited'].includes(fromStatus) || ['accepted','invited'].includes(toStatus)){
            status = true;
            break;
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
      await Webphone.preOperate({
        phoneId: from.webphone.id,
        sessionId: from.webphone.sessionId,
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
  
    static async getIsHangupButtonEnabled(context) {
      await checkCallStatus(context, { callStatus: 'Connected' });
      const className = await $(context.app).getAttribute('@hangup', 'class');
      const isHangupEnabled = className.indexOf('buttonDisabled') === -1;
      return isHangupEnabled;
    }
  
    static async getIsMuteButtonDisabled(context) {
      const className = await $(context.app).getAttribute('@mute', 'class');
      const isMuteButtonDisabled = className.indexOf('buttonDisabled') > -1;
      return isMuteButtonDisabled;
    }

    static async getIsMuteButtonEnabled(context) {
      await checkCallStatus(context, { callStatus: 'Connected' });
      const isMuteButtonDisabled = await this.getIsMuteButtonDisabled(context);
      return !isMuteButtonDisabled;
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