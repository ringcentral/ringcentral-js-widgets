/* global $ */
export default class TypeComposeToField {
  static async type({ options: { option }, driver: { app } }) {
    await $(app).type('@messageInput', option.textSMS);
    await $(app).waitFor(300);
  }

  static async getPlaceholder({ driver: { app } }) {
    const placeholder = await $(app).getAttribute('@messageInput', 'placeholder');
    return placeholder;
  }

  static async getInputSMS({ driver: { app } }) {
    const inputSMS = await $(app).html('@messageInput');
    return inputSMS;
  }

  static async getMessageButtonDisabled({ driver: { app } }) {
    const disabled = await $(app).getAttribute('@messageButton', 'disabled');
    return disabled;
  }

  static get steps() {
    return [
      this.type,
    ];
  }
}
