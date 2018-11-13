
export default class ToggleEnv {
  static async setEnv(context) {
    const { options: { config, driver }, app } = context;
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

  // static async toggleEnv({ app }) {
  //   await $(app).execute('window.toggleEnv()');
  //   await $(app).waitForSelector('[class*=input]', { visible: true });
  //   await $(app).click('[class*=slider]');
  //   await $(app).clear('[class*=input]');
  //   await $(app).type('[class*=input]', 'https://api-xmnup.lab.nordigy.ru');
  //   // for display only
  //   await $(app).waitFor(100);
  //   await $(app).click('[class*=saveButton]');
  // }
}
