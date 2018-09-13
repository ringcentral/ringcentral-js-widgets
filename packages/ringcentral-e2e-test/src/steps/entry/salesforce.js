/* global $ */
const location = 'https://na78.salesforce.com/home/showAllTabs.jsp';
export default class Entry {
  static async goto(ctx) {
    const { options: { config }, driver: { page } } = ctx;
    await $(page).type('#username', config.username, { selector: 'css' });
    await $(page).type('#password', config.password, { selector: 'css' });
    await $(page).click('#Login', { selector: 'css' });
    await $(page).waitFor('body', { selector: 'css' });
    await this.routeMode(ctx);
  }

  static async classic(ctx) {
    // const { driver: { page } } = ctx;
    // const $ = that => that;
    // await $(page).waitFor(() => window.frames.length > 2);
    // await $(page).frames()[3].waitFor(() => window.frames.length > 0);
    // this.app = this.page.frames()[4];
  }

  static async lightning(ctx) {
    // const { driver: { page } } = ctx;
    // await $(page).click('.switch-to-lightning');
    // await $(page).waitFor('.flexipageComponent');
    // await $(page).click('.flexipageComponent');
    // const existFrames = () => window.frames.length > 0;
    // await $(page).waitFor(existFrames);
    // await $(page).frames()[0].waitFor(existFrames);
    // await $(page).frames()[1].waitFor(existFrames);
    // this.app = this.page.frames()[2];
  }

  static async routeMode(ctx) {
    const { options: { tag: { modes } }, driver: { page } } = ctx;
    await $(page).goto(location);
    await this[modes](ctx);
  }


  static get steps() {
    return [
      this.goto,
      this.routeMode,
    ];
  }
}
