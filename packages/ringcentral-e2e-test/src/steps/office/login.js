import { createProcess } from 'marten';
import ToggleEnv from './toggleEnv';
/* global $, page, browser */
export default class Login {
  static async prepare(context) {
    await $(context.driver.app).waitFor('[class*=loginButton]', { selector: 'css' });
    if (context.options.isVirtual) return;
    const process = createProcess(
      ToggleEnv,
    )(context);
    await process.exec();
  }
  static async login({ options: { option } }) {
    await $(page).click('[class*=loginButton]', { selector: 'css' });
    // TODO: wait for popup
    await $(page).waitFor(2000);
    const targets = await browser.targets();
    const popupTarget = targets.find(t => t._targetInfo.title === 'Sign in - RingCentral');
    const loginPage = await popupTarget.page();
    // 1. username
    await $(loginPage).type('input#credential', '8552085154', { selector: 'css' });
    // TODO: wait for url change
    const response = await Promise.all([
      $(loginPage).click('loginCredentialNext'),
      // loginPage.waitForNavigation({ waitUntil: 'networkidle2' }),
      $(loginPage).waitFor(1000),
      $(loginPage).waitFor('input#password', { selector: 'css' }),
    ]);
    console.info('response:', response);
    // 2. pwd
    await $(loginPage).type('input#password', 'Test!123', { selector: 'css' });
    await $(loginPage).click('signInBtn');
    // display UserGuide and skip(by default)
    await $(page).waitFor('[class*=components-UserGuide]', { selector: 'css' });
    if (!option.noSkipUserGuide) {
      await $(page).click('[class*=styles_secondaryButton]', { selector: 'css' });
      await $(page).waitFor('[class*=components-TabNavigationView]', { selector: 'css' });
    }
  }
  static get steps() {
    return [
      this.prepare,
      this.login,
    ];
  }
}
