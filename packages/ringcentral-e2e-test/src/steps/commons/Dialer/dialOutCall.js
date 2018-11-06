/* global $ */
export default class DialOutCall {
  static async inputPhoneNumber({ options: { option }, driver: { app } }) {
    // const [_, { did }] = playload.accounts;
    const {accounts} = option.playload;
    await $(app).type('@recipientsInput', `+${accounts[0].did}`);
  }

  static async dialOut({ driver: { app } }) {
    await $(app).click('@callButton');
    await $(app).waitForSelector('@logSection');
  }

  static get steps() {
    return [
      this.inputPhoneNumber,
      this.dialOut,
    ];
  }
}
