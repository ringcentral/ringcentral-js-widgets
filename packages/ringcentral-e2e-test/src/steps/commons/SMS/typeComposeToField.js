/* global $ */
export default class TypeComposeToField {
  static async type({ driver: { app }, options: { option } }) {
    const recipientsInput = '@recipientsInput';
    if (Array.isArray(option.typeToFields)) {
      for (const typeToField of option.typeToFields) {
        await $(app).type(recipientsInput, typeToField);
        await this._check(recipientsInput, typeToField);
        await $(app).clear(recipientsInput);
        // TODO: waitForFunction value is clear.
        // wait for browser respond clear input value.
        await $(app).waitFor(500);
      }
    }
    // send to first number in playload accounts.
    await $(app).type(recipientsInput, '2344');
    // await $(app).type(recipientsInput, option.playload.accounts[0].did);
  }

  static addCheckPoints(check) {
    this._check = check;
  }

  static get steps() {
    return [
      this.type,
    ];
  }
}
