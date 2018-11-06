import SmallCallControl from './index';

export default class UnmuteCall extends SmallCallControl {
  static get steps() {
    return [
      this.unmute,
    ];
  }
}
