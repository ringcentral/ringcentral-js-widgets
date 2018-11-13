import Webphone from './index';

export default function MakeInboundCall(...args) {
  return class extends Webphone(...args) {
    static get steps() {
      return [
        this.makeCall,
      ];
    }
  }
}
