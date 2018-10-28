/* global $ */
export default class TypeComposeToField {
  static async type({ driver: { app }, options: { option } }) {
    const recipientsInput = '@recipientsInput';
    const spinnerOverlay = '@spinnerOverlay';
    const _spinnerOverlay = $(app).getSelector(spinnerOverlay);
    const _recipientsInput = $(app).getSelector(recipientsInput);
    await $(app).waitForFunction(selector => !document.querySelector(selector), _spinnerOverlay);
    if (Array.isArray(option.typeToFields)) {
      for (const typeToField of option.typeToFields) {
        await $(app).type(recipientsInput, typeToField);
        await this._check(recipientsInput, typeToField);
        await $(app).clear(recipientsInput);
        await Promise.race([
          $(app).waitFor(500),
          $(app).waitForFunction(
            selector => !document.querySelector(selector).value,
            _recipientsInput
          )
        ]);
      }
    }
    // send to first number in playload accounts.
    await $(app).type(recipientsInput, option.playload.accounts[0].did);
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
