
export default class ToggleEnv {
  static async setEnv({ app }) {
    await $(app).execute('toggleEnv()');
    await $(app).click('[class*=styles_switch]', { selector: 'css' });
    await $(app).clear('[class*=styles_input]', { selector: 'css' });
    await $(app).type('[class*=styles_input]', 'https://api-xmnup.lab.nordigy.ru', { selector: 'css' });
    await $(app).click('[class*=styles_saveButton]', { selector: 'css' });
  }
  static get steps() {
    return [
      this.setEnv,
    ];
  }
}
