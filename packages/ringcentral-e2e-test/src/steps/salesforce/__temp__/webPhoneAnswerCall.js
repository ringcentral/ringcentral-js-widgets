import operateWebPhoneBasic from './operateWebPhone';
export default class AnswerCall extends operateWebPhoneBasic {
  static get steps() {
    return [
      this.answerCall,
    ];
  }
}
