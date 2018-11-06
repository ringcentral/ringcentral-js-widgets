import SettingsBasic from './setting';
export default class SettingRCForDesktop extends SettingsBasic{
  static get steps() {
    return [
      this.gotoSettings,
      // this.settingAutoLog,
      this.gotoCalling,
      this.settingRCForDesktop,
    ];
  }
}