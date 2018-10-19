import { createProcess } from 'marten';
import ToggleEnv from './toggleEnv';
/* global $, page, browser, context */

const oauthUrl = 'http://service-itldevxmn.lab.nordigy.ru';
export default class Login {
  static async prepare(context) {
    await $(context.driver.app).waitFor('[class*=loginButton]', { selector: 'css' });
    if (context.options.isVirtual) return;
    const process = createProcess(
      ToggleEnv,
    )(context);
    await process.exec();
  }
  static async login(actions = {}) {
    const params = context.options.config;
    await $(context.driver.app).waitFor('[class*=loginButton]', { selector: 'css' });
    await $(page).waitFor(2000);// wait for js warm up;
    await $(page).click('[class*=loginButton]', { selector: 'css' });
    // TODO: wait for popup
    await $(page).waitFor(5000);
    const targets = await browser.targets();
    const popupTarget = targets.find(t => t._targetInfo.title.indexOf('Sign in') !== -1);
    if (!popupTarget) {
      console.error('Fail to open login popup of RC');
      return;
    }
    const loginPage = await popupTarget.page();
    // 1. username
    await $(loginPage).waitFor('input#credential', { selector: 'css' });
    await $(loginPage).type('input#credential', params.username, { selector: 'css' });
    // TODO: wait for url change
    await Promise.all([
      $(loginPage).click('[data-test-automation-id=loginCredentialNext]', { selector: 'css' }),
      // loginPage.waitForNavigation({ waitUntil: 'networkidle2' }),
      $(loginPage).waitFor(5000),
      $(loginPage).waitFor('input#password', { selector: 'css' }),
    ]);
    // 2. pwd
    await $(loginPage).type('input#password', params.password, { selector: 'css' });
    await $(loginPage).click('[data-test-automation-id=signInBtn]', { selector: 'css' });
    // display UserGuide and skip(by default)
    await $(page).waitFor('[class*=components-UserGuide]', { selector: 'css' });
    if (!actions.noSkipUserGuide) {
      await $(page).click('[class*=styles_secondaryButton]', { selector: 'css' });
      await $(page).waitFor('[class*=components-TabNavigationView]', { selector: 'css' });
    }
  }
  static get steps() {
    return [
      this.login,
    ];
  }
}
