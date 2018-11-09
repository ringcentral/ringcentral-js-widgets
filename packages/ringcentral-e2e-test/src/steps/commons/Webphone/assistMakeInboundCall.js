import WebPhone from './index';

export default function MakeInboundCall(...args) {
  return class extends WebPhone(..args) {
    static get steps() {
      return [
        this.makeCall,
      ];
    }
  }
}
