export default class CallPhone {

  static async iClickDialPad() {
    await $(app).waitFor('[title="Dial Pad"]', { selector: 'css' });
    await $(app).click('[title="Dial Pad"]', { selector: 'css' });
  }

  static async iInputPhoneNumber(account) {
    await $(app).waitFor('[class*=styles_numberInput]', { selector: 'css' });
    await $(app).type('[class*=styles_numberInput]','+'+ context.options.option.account3[0]['did'],{ selector: 'css' });
  }   

  static async iClickCallBtn(){
    await $(app).waitFor('[class*=styles_callBtn]');
    await $(app).click('[class*=styles_callBtn]');
    await $(app).waitFor(5000);
    await $(page).screenshot({ path: 'called.png'})
  }
  static get steps(){
    return [
      this.iClickDialPad,  
      this.iInputPhoneNumber,
      this.iClickCal lBtn,
    ];
  }
}
