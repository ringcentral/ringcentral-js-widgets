/* eslint-disable */
/* global $, page, browser, driver, context */
import { createProcess } from 'marten';
import Login from '../../../steps/office/login';
import Entry from '../../../steps/entry';

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
})
afterEach(async() => {
  await browser.close();
})
describe('O365 authorization flow: =====>', () => {
  test({
    title: 'O365 authorization flow(click authorization on setting panel)',
    tags: [
      ['office', { brands: ['rc'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {
        authSuccess: 'Authorized Account',
        officeAccout: '',
        officePwd: '',
        microsoftOauthUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
      },
    ],
  }, async ({ option }) => {
    // Login CTI
    const process = createProcess(
      Entry,
      Login,
    )(context);
    await process.exec();
    // Authroize Office365
    await $(page).waitFor(500);
    await $(page).waitFor('div[title="More Menu"]', { selector: 'css' });
    await $(page).click('div[title="More Menu"]', { selector: 'css' });
    await $(page).waitFor('div[title="Settings"]', { selector: 'css' });
    await $(page).click('div[title="Settings"]', { selector: 'css' });
    await $(page).waitFor('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    await $(page).click('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    const officeAuthPage = await new Promise(resolve => browser.on('targetcreated', async(t) => {
      if(t._targetInfo && t._targetInfo.url.includes(option.microsoftOauthUrl)) {
        resolve(await t.page());
      }
    }));
    await $(officeAuthPage).waitFor("input[type='email']", { selector: 'css' });
    await $(officeAuthPage).type("input[type='email']", option.officeAccout, { selector: 'css' });
    await $(officeAuthPage).click("input[type='submit']", { selector: 'css' });
    await $(officeAuthPage).type("input[name='passwd']", option.officePwd, { selector: 'css' });
    // need a timeout
    await $(page).waitFor(500);
    await $(officeAuthPage).click("input[type='submit']", { selector: 'css' });
    await $(page).waitFor(2500);
    const text = await $(page).getText("[class*='AuthorizeSettingsPanel-_styles_title']",
      { selector: 'css' }
    );
    expect(text).toEqual(option.authSuccess);
  });
});
