import {
  createProcess
} from 'marten';
import ToggleEnv from './toggleEnv';

const oauthUrl = 'http://service-itldevxmn.lab.nordigy.ru';

export default class Login {
  static async prepare(context) {
    await $(context.app).waitFor('[class*=loginButton]', {
      selector: 'css'
    });
    if (context.options.isVirtual) return;
    const process = createProcess(
      ToggleEnv,
    )(context);
    await process.exec();
  }
  static async loginBtOrTelus(loginPage, params) {
    // 1. username
    await $(loginPage).waitFor('input#rc-login-number', {
      selector: 'css'
    });
    await $(loginPage).type('input#rc-login-number', params.username, {
      selector: 'css'
    });
    // 2. pwd
    await $(loginPage).waitFor('input#rc-login-password', {
      selector: 'css'
    });
    await $(loginPage).type('input#rc-login-password', params.password, {
      selector: 'css'
    });
    // 3. submit
    await $(loginPage).click('[data-test-automation-id=submit]', {
      selector: 'css'
    });
  }
  static async loginRcOrAtt(loginPage, params) {
    // 1. username
    await $(loginPage).waitFor('input#credential', {
      selector: 'css'
    });
    await $(loginPage).type('input#credential', params.username, {
      selector: 'css'
    });
    // TODO: wait for url change
    await Promise.all([
      $(loginPage).click('[data-test-automation-id=loginCredentialNext]', {
        selector: 'css'
      }),
      // loginPage.waitForNavigation({ waitUntil: 'networkidle2' }),
      $(loginPage).waitFor(5000),
      $(loginPage).waitFor('input#password', {
        selector: 'css'
      }),
    ]);
    // 2. pwd
    await $(loginPage).type('input#password', params.password, {
      selector: 'css'
    });
    // 3. submit
    await $(loginPage).click('[data-test-automation-id=signInBtn]', {
      selector: 'css'
    });
  }
  static async login(actions) {
    const params = context.options.config;
    await $(context.app).waitFor('[class*=loginButton]', {
      selector: 'css'
    });
    await $(page).waitFor(2000); // wait for js warm up;
    await $(page).click('[class*=loginButton]', {
      selector: 'css'
    });
    // TODO: wait for popup
    await $(page).waitFor(10000);
    const targets = await browser.targets();
    const popupTarget = targets.find(t => t._targetInfo.title.indexOf('Sign in') !== -1);
    if (!popupTarget) {
      console.error('Fail to open login popup of RC');
      return;
    }
    const loginPage = await popupTarget.page();
    if (context.options.tag.brands === 'bt' || context.options.tag.brands === 'telus') {
      this.loginBtOrTelus(loginPage, params);
    }
    if (context.options.tag.brands === 'rc' || context.options.tag.brands === 'att') {
      this.loginRcOrAtt(loginPage, params);
    }
    // display UserGuide and skip(by default)
    if (!actions.noSkipUserGuide) {
      await $(page).waitFor('[class*=components-UserGuide]', {
        selector: 'css'
      });
      await $(page).click('[class*=styles_secondaryButton]', {
        selector: 'css'
      });
      await $(page).waitFor('[class*=components-TabNavigationView]', {
        selector: 'css'
      });
    }
  }
  static get steps() {
    return [
      this.login
    ];
  }
}
