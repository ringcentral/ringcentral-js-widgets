import SmallCallControl from './index';
/* global $ */
export default class RejectCall extends SmallCallControl {
  static get steps() {
    return [
      this.reject,
    ];
  }
}
