/* global $ */
export default class SendSMS {
  static async send({ driver: { app } }) {
    await $(app).click('@messageButton');
    await $(app).waitFor(500);
  }

  static get steps() {
    return [
      this.send,
    ];
  }
}
