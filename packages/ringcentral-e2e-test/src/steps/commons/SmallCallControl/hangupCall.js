import SmallCallControl from './index';
/* global $ */
export default class HangupCall extends SmallCallControl {
  static get steps() {
    return [
      this.hangup,
    ];
  }
}
