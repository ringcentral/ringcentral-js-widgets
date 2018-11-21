import Webphone from './index';

export default function AnswerCall(...args) {
  return class AnswerCallWithWebphone extends Webphone(...args) {
    static get steps() {
      return [
        this.answerCall,
      ];
    }
  }
}
