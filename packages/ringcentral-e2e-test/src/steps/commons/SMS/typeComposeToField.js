
export default class TypeComposeToField {
  static async type({ app, options: { option } }) {
    const recipientsInput = '@recipientsInput';
    const spinnerOverlay = '@spinnerOverlay';
    const _spinnerOverlay = $(app).getSelector(spinnerOverlay);
    const _recipientsInput = $(app).getSelector(recipientsInput);
    await $(app).waitForFunction(selector => !document.querySelector(selector), _spinnerOverlay);
    if (Array.isArray(option.typeToFields) && this._check) {
      for (const typeToField of option.typeToFields) {
        await $(app).type(recipientsInput, typeToField, {delay: 100}); // TODO delay for extension
        const toFieldText = await $(app).getValue(recipientsInput);
        await this._check(toFieldText, typeToField);
        await $(app).clear(recipientsInput);
        await Promise.race([
          $(app).waitFor(500),
          $(app).waitForFunction(
            (selector) => {
              const dom = document.querySelector(selector);
              return !dom || !dom.value;
            },
            _recipientsInput
          )
        ]);
      }
    }
    // send to first number in playload accounts.
    const [{ did = '101' } = {}] = option.playload.accounts || [];
    await $(app).type(recipientsInput, did, {delay: 100}); // TODO delay for extension
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
