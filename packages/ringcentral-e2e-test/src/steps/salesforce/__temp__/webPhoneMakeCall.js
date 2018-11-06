import operateWebPhoneBasic from './operateWebPhone';
export default class MakeCall extends operateWebPhoneBasic {
  static get steps() {
    return [
      this.makeCall,
    ];
  }
}
