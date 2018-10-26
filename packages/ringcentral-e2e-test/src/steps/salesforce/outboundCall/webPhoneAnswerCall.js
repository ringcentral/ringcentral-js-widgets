import operateWebPhoneBasic from 'ringcentral-e2e-test/src/steps/salesforce/operateWebPhone';
export default class AnswerCallFromCTI extends operateWebPhoneBasic {
  static get steps() {
    return [
      this.preAnswerCall,
    ];
  }
}
