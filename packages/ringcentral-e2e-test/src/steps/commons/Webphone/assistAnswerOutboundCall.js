import WebPhone from './index';
/* global $ */
export default class HangupCall extends WebPhone {
  static get steps() {
    return [
      this.preAnswerCall,
    ];
  }
}
