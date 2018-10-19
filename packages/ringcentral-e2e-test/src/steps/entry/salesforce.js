/* global $ */
const location = 'https://na78.salesforce.com/home/showAllTabs.jsp';
export default class Entry {
  static async goto(context) {
    const { options: { config, driver }, driver: { page } } = context;
    await $(page).type('#username', config.username, { selector: 'css' });
    await $(page).type('#password', config.password, { selector: 'css' });
    await $(page).click('#Login', { selector: 'css' });
    await $(page).waitFor('body', { selector: 'css' });
    if (driver === 'seleniumWebdriverSafari') {
      // compatibility for safari
      await $(page).waitFor(2000);
    }
  }

  static async classic(context) {
    const { driver: { page } } = context;
    await $(page).waitFor(5000);
    const app = await $(page).waitForFrames(['SoftphoneIframe', 'rcAppClassic']);
    return app;
  }

  static async lightning(context) {
    //
  }

  static async routeMode(context) {
    await $(context.driver.page).goto(location);
    context.driver.app = await this[context.options.tag.modes](context);
    global.app = context.driver.app;
  }

  static get steps() {
    return [
      this.goto,
      this.routeMode,
    ];
  }
}
