
import SettingsBasic from './setting';
export default class SettingMyRCPhone extends SettingsBasic {
  static get steps() {
    return [
      this.gotoSettings,
      // this.settingAutoLog,
      this.gotoCalling,
      this.settingMyRCPhone,
    ];
  }
}