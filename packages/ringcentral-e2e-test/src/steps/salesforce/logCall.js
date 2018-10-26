export default class LogCall {
  static async getRingText(){
    await $(app).waitFor(5000);
    const ringing = await $(app).getText('[class*=LogBasicInfo-_styles_status]', { selector: 'css' });
    return ringing;
  }
  static async getMuteValue(){
    const mute = await $(app).getAttributeValue('[class*=SmCallControl-_styles_button]', "class", { selector: 'css', visible: true  });
    return mute;
  }
  static async iClickMute(){
    await $(app).click('[class*=LogSection-_styles_callCtrlWrapper] svg[class*=SmCallControl-_styles_button]', { selector: 'css' });
  }
  static get steps() {
    return [
      this.getRingText,
    ];
  }
}
