import WebPhone from '../Webphone';

export default class HangupCall extends WebPhone {
  static get steps() {
    return [
      this.answerCall,
    ];
  }
}
