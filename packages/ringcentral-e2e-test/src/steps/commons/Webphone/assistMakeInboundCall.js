import WebPhone from './index';
/* global $ */
export default class MakeInboundCall extends WebPhone {
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
      ...super.steps,
      this.makeCall,
    ];
  }
}
