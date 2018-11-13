import SmallCallControl from './index';

export default class RejectCall extends SmallCallControl {
  static get steps() {
    return [
      this.reject,
    ];
  }
}
