export default class SettingsBasic {
  static async gotoSettings() {
    await $(app).waitFor(1000);
    await $(app).waitForSelector('[title="More Menu"]', { selector: 'css' });
    await $(app).click('[title="More Menu"]', { selector: 'css' });
    await $(app).waitForSelector('[title="Settings"]', { selector: 'css' });
    await $(app).click('[title="Settings"]', { selector: 'css' });
    await $(app).waitFor(1000);
  }
  static async settingAutoLog() {
    await $(app).waitForSelector('[class*=Switch-_styles_slider]', { selector: 'css' });
    await $(app).click('[class*=Switch-_styles_slider]', { selector: 'css' });
  }
  static async gotoCalling() {
    await $(app).waitForSelector('[class*=-SettingsPanel-_styles_root] div  a:nth-child(1) [class*=IconField-_styles_content]');
    await $(app).click('[class*=-SettingsPanel-_styles_root] div  a:nth-child(1) [class*=IconField-_styles_content]');
  }
  static async settingCustomPhone(context) {
    const DropdownSelectText = await $(app).getText('[class*="DropdownSelect"]');
    if (DropdownSelectText.trim() !== 'Custom Phone') {
      await $(app).click('[class*="DropdownSelect"]', { selector: 'css' });
      await $(app).click('[title="Custom Phone"]', { selector: 'css' });
      await $(app).waitFor(100);
      const ringoutPrompt = await $(app).execute(`phone.callingSettings.ringoutPrompt`);
      if (ringoutPrompt === true) {
        await $(app).click('[class*=Switch-_styles_slider]', { selector: 'css' });
      }
      await $(app).waitForSelector('[class*=TextInput-_styles_input]', { selector: 'css' });
      await $(app).type('[class*=TextInput-_styles_input]', '+' + context.options.option.accounts[1]['did'], { selector: 'css' });
      await $(app).click('[class*=SaveButton]', { selector: 'css' });
      await $(app).waitForSelector('[class*="AlertDisplay"]', { selector: 'css' });
      await $(app).execute('phone.alert.dismissAll');
      await $(app).waitFor(1000);
    }
  }
  static async settingMyRCPhone() {
    const DropdownSelectText = await $(app).getText('[class*="DropdownSelect"]');
    if (DropdownSelectText.trim() !== 'My RingCentral Phone') {
      await $(app).click('[class*="DropdownSelect"]', { selector: 'css' });
      await $(app).click('[title="My RingCentral Phone"]', { selector: 'css' });
      const ringoutPrompt = await $(app).execute(`phone.callingSettings.ringoutPrompt`);
      if (ringoutPrompt === true) {
        await $(app).click('[class*=Switch-_styles_slider]', { selector: 'css' });
      }
      await $(app).click('[class*=SaveButton]', { selector: 'css' });
      await $(app).waitForSelector('[class*="AlertDisplay"]', { selector: 'css' });
      await $(app).execute('phone.alert.dismissAll');
      await $(app).waitFor(1000);
    }
  }

  static async settingRCPhoneDesktop() {
    const DropdownSelectText = await $(app).getText('[class*="DropdownSelect"]');
    if (DropdownSelectText.trim() !== 'RingCentral for Desktop') {
      await $(app).click('[class*="DropdownSelect"]', { selector: 'css' });
      await $(app).click('[title="RingCentral for Desktop"]', { selector: 'css' });
      const ringoutPrompt = await $(app).execute(`phone.callingSettings.ringoutPrompt`);
      if (ringoutPrompt === true) {
        await $(app).click('[class*=Switch-_styles_slider]', { selector: 'css' });
      }
      await $(app).click('[class*=SaveButton]', { selector: 'css' });
      await $(app).waitForSelector('[class*="AlertDisplay"]', { selector: 'css' });
      await $(app).execute('phone.alert.dismissAll');
      await $(app).waitFor(1000);
    }
  }


  static get steps() {
    return [
      this.enterSettings,
      // this.settingAutoLog,
      this.gotoCalling,
      this.settingRCPhoneDesktop,
    ];
  }
}