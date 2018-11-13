import callingTypes from '../../../enums/callingTypes';
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
      const isCustomPhone = option.callingType === callingTypes.customPhone;
      const isMyPhone = option.callingType === callingTypes.myPhone;
      if (isWithPrompt) {
        const ringoutPrompt = await $(app).getProperty('@ringoutPromptToggle switch', 'checked');
        // Webphone lib only supports `ringoutPrompt: false`.
        if (ringoutPrompt) await $(app).click('@ringoutPromptToggle');
      }
      if (isCustomPhone) {
        const [{ did } = {}] = option.playload.accounts || [];
        await $(app).type('@myLocation myLocationInput', `${did}`);
      }
      if (isMyPhone) {
        await $(app).click('@myLocation selectedItem');
        await $(app).click('@myLocation selectMenuItem:-1');
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
