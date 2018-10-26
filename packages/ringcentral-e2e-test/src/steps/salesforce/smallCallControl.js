import LogCall from 'ringcentral-e2e-test/src/steps/salesforce/logCall'
export default class smallCallControl extends LogCall{
  static get steps() {
    return [
      this.iClickMute,
    ];
  }
}