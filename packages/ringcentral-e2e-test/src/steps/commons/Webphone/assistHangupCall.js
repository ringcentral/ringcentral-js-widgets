import WebPhone from './index';

export default class HangupCall extends WebPhone {
  static get steps() {
    return [
      this.hangup,
      this.close,
    ];
  }
}
