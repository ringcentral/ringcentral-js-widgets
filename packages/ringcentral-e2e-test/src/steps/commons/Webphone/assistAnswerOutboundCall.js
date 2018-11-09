import WebPhone from './index';

export default function AnswerCall(...args) {
  return class extends WebPhone(..args) {
    static get steps() {
      return [
        this.preAnswerCall,
      ];
    }
  }
}
