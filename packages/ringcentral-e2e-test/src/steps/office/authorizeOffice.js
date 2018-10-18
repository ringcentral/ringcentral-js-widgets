/* global $, page, browser, context */
import sleep from 'ringcentral-integration/lib/sleep';
export default class AuthorizeOffice {
  static async login() {
    console.log('office 365 authorization');
    const params = context.options.config;
    const MICROSOFT_URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    await sleep(2000);
    await $(page).waitFor('div[title="More Menu"]', { selector: 'css' });
    await $(page).click('div[title="More Menu"]', { selector: 'css' });
    await $(page).waitFor('div[title="Settings"]', { selector: 'css' });
    await $(page).click('div[title="Settings"]', { selector: 'css' });
    await $(page).waitFor('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    const officeAuthPagePromise = new Promise(
      resolve => browser.on('targetcreated', async (t) => {
        if (t._targetInfo && t._targetInfo.url.includes(MICROSOFT_URL)) {
          console.log('MS popup created');
          resolve(await t.page());
        }
      })
    );
    await $(page).click('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    const officeAuthPage = await officeAuthPagePromise;
    console.log('Waiting 20s for MS popup rendering.');
    await sleep(20000);

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
    console.log('Logining...');
    await $(officeAuthPage).waitFor(2500);
  }
  static get steps() {
    return [
      this.login,
    ];
  }
}
