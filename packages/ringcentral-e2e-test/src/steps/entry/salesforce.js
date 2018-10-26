/* global $ */
const locationClassic = 'https://ap4.salesforce.com/home/showAllTabs.jsp';
const locationLightning = 'https://ap4.lightning.force.com/lightning/o/Account/list?filterName=Recent';
export default class Entry {
  static async goto(context) {
    const { options: { config, driver }, driver: { page } } = context;
    await $(page).waitForSelector('#username', { visible: true });
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
    await $(page).waitFor(8000);
    const app = await $(page).waitForFrames(['SoftphoneIframe', 'rcAppClassic']);
    return app;
  }

  static async lightning(context) {
    const { options: { config, driver }, driver: { page } } = context;
    await $(page).waitFor(8000);

    // console.log("page", page);

    // first way
    // context.overridePermissions('https://na78.lightning.force.com/', ['notifications']);

    // second way, find out notification and dismiss
    // console.log('Dismiss alerts...');

    // const alertHandlers = await page.$$(dismissBtn, {
    //   selector: 'css'
    // });
    // for (const alertHandler of alertHandlers) {
    //   try {
    //     await alertHandler.click();
    //   } catch (e) {
    //     //
    //   }
    // }
    // // for alerts to disappear
    // await sleep(2000);

    await $(page).waitForSelector('[class*=oneUtilityBarItem]', { selector: 'css', visible: true });
    await $(page).click('[class*=oneUtilityBarItem]', { selector: 'css'});

    const app = await $(page).waitForFrames(['iframe.openctiSoftPhone', 'rcAppLightning']);
   
    return app;
  }

  static async routeMode(context) {
    if ('classic'===context.options.tag.modes){
      await $(context.driver.page).goto(locationClassic);
    } else {
      console.log("Salesforce mode", context.options.tag.modes)
      await $(context.driver.page).goto(locationLightning);
    }
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
