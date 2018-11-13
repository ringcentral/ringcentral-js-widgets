import operateWebPhoneBasic from './operateWebPhone';
export default class Hangup extends operateWebPhoneBasic {
  static get steps() {
    return [
      this.hangup,
    ];
  }
}
