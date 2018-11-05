import WebPhone from './index';
/* global $ */
export default class MakeInboundCall extends WebPhone {
  static get steps() {
    return [
      ...super.steps,
      this.makeCall,
    ];
  }
}
