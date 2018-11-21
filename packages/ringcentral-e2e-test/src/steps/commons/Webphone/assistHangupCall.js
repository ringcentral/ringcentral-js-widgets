import Webphone from './index';

export default function HangupCall(...args) {
  return class HangupCallWithWebphone extends Webphone(...args) {
    static get steps() {
      return [
        this.hangup,
        this.close,
      ];
    }
  }
}
