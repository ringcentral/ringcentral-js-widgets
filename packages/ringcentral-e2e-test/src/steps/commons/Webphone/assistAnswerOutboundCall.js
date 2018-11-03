import WebPhone from './index';
/* global $ */
export default class HangupCall extends WebPhone {
  static async getIsMuteEnabled(context) {
    const className = await $(context.driver.app).getAttribute('@mute', 'class');
    const isMuteButtonDisabled = className.indexOf('buttonDisabled') > -1;
    return !isMuteButtonDisabled;
  }

  static async getIsHangupEnabled(context) {
    const className = await $(context.driver.app).getAttribute('@hangup', 'class');
    const isHangupDisabled = className.indexOf('buttonDisabled') > -1;
    return !isHangupDisabled;
  }

  static get steps() {
    return [
      this.preAnswerCall,
    ];
  }
}
