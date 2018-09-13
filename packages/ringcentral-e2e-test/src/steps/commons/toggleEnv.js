/* global $ */
export default class ToggleEnv {
  static async setEnv({ driver: { page } }) {
    await $(page).execute('toggleEnv()');
    await $(page).click('envToggle');
    await $(page).clear('envServerUrl');
    await $(page).type('envServerUrl', 'https://api-xmnup.lab.nordigy.ru');
    await $(page).click('envSave');
  }

  static get steps() {
    return [
      this.setEnv,
    ];
  }
}
