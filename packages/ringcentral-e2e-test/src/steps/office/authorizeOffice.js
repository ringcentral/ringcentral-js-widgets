import sleep from 'ringcentral-integration/lib/sleep';
import { createProcess } from '../index';

const MICROSOFT_URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';

export default class AuthorizeOffice {
  static async authorize(context) {
    console.log('office 365 authorization');
    const params = context.options.config;
    const page = context.page;

    const officeAuthPagePromise = new Promise(
      resolve => context.browser.on('targetcreated', async (t) => {
        if (t._targetInfo && t._targetInfo.url.includes(MICROSOFT_URL)) {
          console.log('MS popup created');
          resolve(await t.page());
        }
      })
    );
    await $(page).click('@authorizeButton');
    const officeAuthPage = await officeAuthPagePromise;
    console.log('Waiting 20s for MS popup rendering.');

    // email
    await $(officeAuthPage).waitFor('input[type=email]');
    await $(officeAuthPage).type('input[type= email]', params.officeAccount);
    await $(officeAuthPage).click('[value=Next]');
    await $(officeAuthPage).waitFor(1000);
    // password
    await $(officeAuthPage).waitFor('input[name=passwd]');
    await $(officeAuthPage).type('input[name=passwd]', params.officePwd);
    await $(officeAuthPage).waitFor('input[type=submit]');
    await $(officeAuthPage).click('input[type=submit]');
    console.log('Logining...');
    await $(officeAuthPage).waitFor(3000);
  }
  static get steps() {
    return [
      this.authorize
    ];
  }
}
