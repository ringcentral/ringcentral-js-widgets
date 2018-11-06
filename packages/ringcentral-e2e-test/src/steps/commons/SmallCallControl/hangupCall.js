import SmallCallControl from './index';

export default class HangupCall extends SmallCallControl {
  static get steps() {
    return [
      this.hangup,
    ];
  }
}
