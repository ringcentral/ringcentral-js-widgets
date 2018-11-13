
export default class TypeComposeToField {
  static async type({ options: { option }, app }) {
    await $(app).type('@messageInput', option.textSMS);
    await $(app).waitFor(300);
  }

  static async getPlaceholder({ app }) {
    const placeholder = await $(app).getAttribute('@messageInput', 'placeholder');
    return placeholder;
  }

  static async getInputSMS({ app }) {
    const inputSMS = await $(app).getValue('@messageInput');
    return inputSMS;
  }

  static async getMessageButtonDisabled({ app }) {
    const disabled = await $(app).getAttribute('@messageButton', 'disabled');
    return disabled;
  }

  static get steps() {
    return [
      this.type,
    ];
  }
}
