/* global $, page, browser, context */
export default class AuthorizeOffice {
  static async login() {
    const params = context.options.config;
    const MICROSOFT_URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';

    await $(page).waitFor('div[title="More Menu"]', { selector: 'css' });
    await $(page).click('div[title="More Menu"]', { selector: 'css' });
    await $(page).waitFor('div[title="Settings"]', { selector: 'css' });
    await $(page).click('div[title="Settings"]', { selector: 'css' });
    await $(page).waitFor('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    await $(page).click('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    const officeAuthPage = await new Promise(resolve => browser.on('targetcreated', async (t) => {
      if (t._targetInfo && t._targetInfo.url.includes(MICROSOFT_URL)) {
        resolve(await t.page());
      }
    }));
    // await $(officeAuthPage).waitFor(1000);
    // email
    await $(officeAuthPage).waitFor('input[type=email]', { selector: 'css' });
    await $(officeAuthPage).type('input[type=email]', params.officeAccout, { selector: 'css' });
    await $(officeAuthPage).click('[value=Next]', { selector: 'css' });
    await $(officeAuthPage).waitFor(1000);
    // password
    await $(officeAuthPage).waitFor('input[name=passwd]', { selector: 'css' });
    await $(officeAuthPage).type('input[name=passwd]', params.officePwd, { selector: 'css' });
    await $(officeAuthPage).waitFor('input[type=submit]', { selector: 'css' });
    await $(officeAuthPage).click('input[type=submit]', { selector: 'css' });
    await $(officeAuthPage).waitFor(2500);
  }
  static get steps() {
    return [
      this.login,
    ];
  }
}
