export const callingTypes = {
  customPhone: 'Custom Phone',
  myPhone: 'My RingCentral Phone',
  desktop: 'RingCentral for Desktop',
  browser: 'Browser',
  otherPhone: 'Other Phone',
};
export default class SetCallingSetting {
  static async setCalling({ app, options: { option } }) {
    const selectedItemText = await $(app).getText('@selectedItem');
    if (selectedItemText.indexOf(option.callingType) === -1) {
      await $(app).click('@dropdownSelect');
      await $(app).click(`[title="${option.callingType}"]`);
      const isWithPrompt = [
        callingTypes.myPhone,
        callingTypes.customPhone
      ].indexOf(option.callingType) > -1;
      if (isWithPrompt) {
        const ringoutPrompt = await $(app).getProperty('@ringoutPromptToggle switch', 'checked');
        // Webphone lib only supports `ringoutPrompt: false`.
        if (ringoutPrompt) await $(app).click('@ringoutPromptToggle');
      }
      const isCustomPhone = option.callingSetting === callingTypes.customPhone;
      if (isCustomPhone) {
        const [{ did } = {}] = option.playload.accounts || [];
        await $(app).type('@myLocation', `${did}`);
      }
      await $(app).click('@saveButton');
    }
  }

  static get steps() {
    return [
      this.setCalling,
    ];
  }
}
