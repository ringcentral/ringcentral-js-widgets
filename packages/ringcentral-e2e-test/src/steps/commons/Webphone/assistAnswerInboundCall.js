import WebPhone from '../Webphone';

export default class HangupCall extends WebPhone {
  static async getIsMuteButtonEnabled(context) {
    //
  }

  static get steps() {
    return [
      this.answerCall,
    ];
  }
}
