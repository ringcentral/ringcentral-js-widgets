/* global $ */
export default class ToggleEnv {
  static async setEnv(context) {
    const { options: { config, driver }, driver: { app } } = context;
    let envServerUrl;
    await $(app).execute('toggleEnv()');
    await $(app).click('[class*=styles_switch]', { selector: 'css' });
    await $(app).clear('[class*=styles_input]', { selector: 'css' });
    switch (config.env) {
      case 'xmnup':
        envServerUrl = 'https://api-xmnup.lab.nordigy.ru';
        break;
      case 'itl':
        envServerUrl = 'https://api-itldevxmn.lab.nordigy.ru';
        break;
      default:
        envServerUrl = 'https://api-itldevxmn.lab.nordigy.ru';
    }
    console.log(envServerUrl);
    await $(app).type('[class*=styles_input]', envServerUrl, { selector: 'css' });
    await $(app).click('[class*=saveButton]', { selector: 'css' });
  }

  static get steps() {
    return [
      this.setEnv,
    ];
  }
}
