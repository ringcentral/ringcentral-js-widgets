import operateWebPhoneBasic from './operateWebPhone';
export default class AutoAnswerCall extends operateWebPhoneBasic {
  static get steps() {
    return [
      this.preAnswerCall,
    ];
  }
}
