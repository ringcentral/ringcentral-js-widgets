import WebPhone from './index';
/* global $ */
export default class PreAnswerCall extends WebPhone {
  static get steps() {
    return [
      ...super.steps,
      this.preAnswerCall,
    ];
  }
}
