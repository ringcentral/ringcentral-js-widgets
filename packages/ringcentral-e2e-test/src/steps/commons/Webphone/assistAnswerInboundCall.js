import Webphone from './index';

export default function AnswerCall(...args) {
  return class extends Webphone(...args) {
    static get steps() {
      return [
        this.answerCall,
      ];
    }
  }
}
