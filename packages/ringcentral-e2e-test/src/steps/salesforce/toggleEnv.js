/* global $ */
export default class ToggleEnv {
  static async setEnv({ driver: { app } }) {
    await $(app).execute('toggleEnv()');
    // await $(app).click('envToggle');
    await $(app).click('[class*=styles_switch]', { selector: 'css' });
    await $(app).clear('[class*=styles_input]', { selector: 'css' });
    await $(app).type('[class*=styles_input]', 'https://api-xmnup.lab.nordigy.ru',{ selector: 'css' });
    await $(app).click('[class*=saveButton]',{ selector: 'css' });
  }

  static get steps() {
    return [
      this.setEnv,
    ];
  }
}
