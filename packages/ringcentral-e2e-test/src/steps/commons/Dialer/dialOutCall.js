/* global $ */
export default class DialOutCall {
  static async inputPhoneNumber({ options: { playload }, driver: { app } }) {
    const [_, { did }] = playload.accounts;
    await $(app).type('@recipientsInput', `+${did}`);
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
