/* eslint-disable */
/* global $, page, browser, driver, context */
import {
  createProcess
} from 'marten';
import AuthorizeOffice, {
  goThrough3rdPartyLogin
} from '../../../steps/office/authorizeOffice';
import Login from '../../../steps/office/login';
import Entry from '../../../steps/entry';
import sleep from 'ringcentral-integration/lib/sleep';

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
})

afterEach(async () => {
  // await browser.close();
})

/** Go to setting page
 * @param isAuth {bool} the office account is auth or unauth
 * User should be able to view below authorized message:
 * - required: Office 365 icon
 * - if is auth: Authorised Account:i button
 * - if is auth: Unauthorise button, Button should be highlight and clickable
 * - if is unauth: Authorise button, Button should be highlight and clickable
 */
async function detectAuthPanel(isAuth, { config, option }) {
  await $(page).waitFor('div[title="More Menu"]', {
    selector: 'css'
  });
  await $(page).click('div[title="More Menu"]', {
    selector: 'css'
  });
  await $(page).waitFor('div[title="Settings"]', {
    selector: 'css'
  });
  await $(page).click('div[title="Settings"]', {
    selector: 'css'
  });
  await $(page).waitFor(2000);

  if (isAuth) {
    // title: Authorised Account
    $(page).waitFor('span[class*="src-components-AuthorizeSettingsPanel-_styles_title"]', {
      selector: 'css'
    });
    const authTitle = await $(page).getText('span[class*="AuthorizeSettingsPanel-_styles_title"]', {
      selector: 'css'
    });
    expect(authTitle).toEqual('Authorized Account');
    // i button
    await $(page).waitFor('[class*="IconField"] > i', {
      selector: 'css'
    });
    await $(page).click('[class*="IconField"] > i', {
      selector: 'css'
    });
    const authTooltip = await $(page).getText('[class*="rc-tooltip-inner"]', {
      selector: 'css'
    });
    expect(authTooltip).toContain(`You have authorized ${option.appNames[option.brand]} to access your account ${config.officeAccout}.`);
    // Authorise button
    const authButton = await $(page).getText('button[class*="AuthorizeSettingsPanel"]', {
      selector: 'css'
    });
    expect(authButton).toEqual('Unauthorize');
  } else {
    // title: empty
    const authTitle = await $(page).getText("[class*='AuthorizeSettingsPanel-_styles_title']", {
      selector: 'css'
    });
    expect(authTitle).toEqual('');
    // Authorise button
    const authButton = await $(page).getText('button[class*="AuthorizeSettingsPanel"]', {
      selector: 'css'
    });
    expect(authButton).toEqual('Authorize');
  }
}

export async function caseAuthorizePanel(options) {
  // Login CTI
  // const params = context.options.config;
  // const process = createProcess(
  //   Entry,
  //   Login,
  //   AuthorizeOffice
  // )(context);
  // Authroize Office365
  // await process.exec();
  console.info('options:', options);
  debugger;
  await detectAuthPanel(true, options);
  /** Click logout and relogin, user still Authorized **/
  await $(page).waitFor('[class*="loginNumber"]', {
    selector: 'css'
  });
  await $(page).click('[class*="loginNumber"]', {
    selector: 'css'
  });
  sleep(2000);
  await Login.login({
    noSkipUserGuide: true
  });
  await detectAuthPanel(true, options);
  /** Click the Unauthorise button **/
  await $(page).click('button[class*="AuthorizeSettingsPanel"]', {
    selector: 'css'
  });
  await detectAuthPanel(false, options);
}
