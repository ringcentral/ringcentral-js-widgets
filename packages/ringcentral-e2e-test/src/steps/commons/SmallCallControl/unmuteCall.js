import SmallCallControl from './index';
/* global $ */
export default class UnmuteCall extends SmallCallControl {
  static get steps() {
    return [
      this.unmute,
    ];
  }
}
