import { createProcess } from 'marten';
import { PuppeteerUtils } from '../../lib/utils';
import ToggleEnv from './toggleEnv';
import Account from './account';
/* global $ */
export default class Login {
  static async prepare(context) {
    await $(context.driver.app).waitForSelector('[class*=loginButton]');
    if (context.options.isVirtual) return;
    const process = createProcess(
      ToggleEnv,
    )(context);
    await process.exec();
  }

  static async getAccount(context) {
    const process = createProcess(
      Account,
    )(context);
    await process.exec();
  }

  static async login({ options, driver: { app, page } }) {
    const { isVirtual } = options;
    const { did, password } = options.accounts[0];
    if (isVirtual) {
      app.props().phone.auth.login({ username: did, password });
    } else {
      // // shortcut for speed up
      // await $(app).execute(`phone.auth.login({username: '${did}', password: '${password}'})`);
      await Login.trueLogin({ did, password }, app, page);
    }
    await $(app).waitFor(1500);
    await $(app).waitForSelector('[class*=-SettingsPanel-_styles_root] div  a:nth-child(1) [class*=IconField-_styles_content]', { selector: 'css', visible: true });
  }

  static async trueLogin({ did, password }, app, page) {
    await $(app).waitForClickable('[class*=loginButton]');
    await $(app).click('[class*=loginButton]');
    const loginPage = await PuppeteerUtils.waitForNewPage(page);
    // loginpage-1
    await $(loginPage).waitForSelector('[data-test-automation-id=loginCredentialNext]', { visible: true });
    await $(loginPage).type('[data-test-automation-id=input]', did);
    await $(loginPage).click('[data-test-automation-id=loginCredentialNext]');
    // loginpage-2
    await $(loginPage).waitForSelector('[data-test-automation-id=signInBtn]', { visible: true });
    // cannot remove this, cause of it will blink
    await $(loginPage).waitFor(1000);
    await $(loginPage).type('[id=password]', password);
    await $(loginPage).click('[data-test-automation-id=signInBtn]');
  }

  // static async login({ options: { option, isVirtual }, driver: { app } }) {
  //   if (isVirtual) {
  //     app.props().phone.auth.login({ username: option.username, password: option.password });
  //   } else {
  //     await $(app).execute(`phone.auth.login({username: '${option.username}', password: '${option.password}'})`);
  //   }
  //   await $(app).waitForSelector('[title="More Menu"]',{ selector: 'css' });
  // }

  static get steps() {
    return [
      this.prepare,
      this.getAccount,
      this.login,
    ];
  }
}
