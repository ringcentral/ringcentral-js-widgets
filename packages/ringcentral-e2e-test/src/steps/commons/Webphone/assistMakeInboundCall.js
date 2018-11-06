import WebPhone from './index';

export default class MakeInboundCall extends WebPhone {
  static get steps() {
    return [
      this.makeCall,
    ];
  }
}
