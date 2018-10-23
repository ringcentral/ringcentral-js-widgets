
import SettingsBasic from './setting';
export default class SettingMyRCPhone extends SettingsBasic {
  // static async enterSettings() {
  //   await $(app).waitFor(1000);
  //   await $(app).waitForSelector('[title="More Menu"]', { selector: 'css' });
  //   await $(app).click('[title="More Menu"]', { selector: 'css' });
  //   await $(app).waitForSelector('[title="Settings"]', { selector: 'css' });
  //   await $(app).click('[title="Settings"]', { selector: 'css' });
  //   await $(app).waitFor(1000);
  // }
  // static async settingMyRCPhone() {
  //   await $(app).click('#viewport > div > div > div > div > div > div.node_modules-ringcentral-widgets-components-SettingsPanel-_styles_root_1Eq2f > div > a:nth-child(1) > div > div > div.node_modules-ringcentral-widgets-components-IconField-_styles_content_2rExK')
  //   const DropdownSelectText = await $(app).getText('[class*="DropdownSelect"]');
  //   if (DropdownSelectText.trim() !== 'My RingCentral Phone') {
  //     await $(app).click('[class*="DropdownSelect"]', { selector: 'css' });
  //     await $(app).click('[title="My RingCentral Phone"]', { selector: 'css' });
  //     const ringoutPrompt = await $(app).execute(`phone.callingSettings.ringoutPrompt`);
  //     if (ringoutPrompt === true) {
  //       await $(app).click('[class*=Switch-_styles_slider]', { selector: 'css' });
  //     }
  //     await $(app).click('[class*=SaveButton]', { selector: 'css' });
  //     await $(app).waitForSelector('[class*="AlertDisplay"]', { selector: 'css' });
  //     await $(app).execute('phone.alert.dismissAll');
  //     await $(app).waitFor(1000);
  //   }
  // }
  static get steps() {
    return [
      this.gotoSettings,
      // this.settingAutoLog,
      this.gotoCalling,
      this.settingMyRCPhone,
    ];
  }
}