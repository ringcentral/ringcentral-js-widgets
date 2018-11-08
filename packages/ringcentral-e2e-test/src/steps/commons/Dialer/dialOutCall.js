export default class DialOutCall {
  static async inputPhoneNumber({ options: { option }, app }) {
    // const [_, { did }] = playload.accounts;
    const {accounts} = option.playload;
    await $(app).type('@recipientsInput', `+${accounts[0].did}`);
  }

  static async dialOut({ app }) {
    // await $(app).click('@callButton');
    await $(app).click('[class*=CircleButton-_styles_noBorder]');
    await $(app).waitForSelector('@logSection');
  }

  static get steps() {
    return [
      this.inputPhoneNumber,
      this.dialOut,
    ];
  }
}
