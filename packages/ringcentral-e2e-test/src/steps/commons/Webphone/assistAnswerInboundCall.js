import WebPhone from '../Webphone';

export default class AnswerCall extends WebPhone {
  static get steps() {
    return [
      this.answerCall,
    ];
  }
}
