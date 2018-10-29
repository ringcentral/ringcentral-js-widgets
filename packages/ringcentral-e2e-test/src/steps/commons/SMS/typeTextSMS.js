/* global $ */
export default class TypeComposeToField {
  static async type({ options: { option }, driver: { app } }) {
    await $(app).type('@messageInput', option.textSMS);
    await $(app).waitFor(300);
  }

  static get steps() {
    return [
      this.type,
    ];
  }
}
