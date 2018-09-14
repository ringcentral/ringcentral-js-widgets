/* global $ */
const location = 'https://na78.salesforce.com/home/showAllTabs.jsp';
export default class Entry {
  static async goto(context) {
    const { options: { config }, driver: { page } } = context;
    await $(page).type('#username', config.username, { selector: 'css' });
    await $(page).type('#password', config.password, { selector: 'css' });
    await $(page).click('#Login', { selector: 'css' });
    await $(page).waitFor('body', { selector: 'css' });
  }

  static async classic(context) {
    const { driver: { page } } = context;
    const app = await $(page).waitForFrame('rcAppClassic');
    return app;
  }

  static async lightning(context) {
    //
  }

  static async routeMode(context) {
    await $(context.driver.page).goto(location);
    context.driver.app = await this[context.options.tag.modes](context);
    global.app = context.driver.app;
    // TODO
    await $(global.app).waitFor(500);
  }

  static get steps() {
    return [
      this.goto,
      this.routeMode,
    ];
  }
}
