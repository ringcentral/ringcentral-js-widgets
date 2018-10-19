import { createProcess } from 'marten';
import AccountHelper from '../../lib/accountManager/index'
import ToggleEnv from './toggleEnv';
import Account from './account'
/* global $ */
export default class Login {
  static async prepare(context) {
    await $(context.driver.app).waitFor('[class*=loginButton]', { selector: 'css' });
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

  static async login({ options: { option, isVirtual }, driver: { app } }) {
    if (isVirtual) {
      app.props().phone.auth.login({ username: option.accounts[0]['did'], password: option.accounts[0]['password'] });
    } else {
      await $(app).execute(`phone.auth.login({username: '${option.accounts[0]['did']}', password: '${option.accounts[0]['password']}'})`);
    }
    await $(app).waitFor(1500);
    await $(app).waitForSelector('[class*=-SettingsPanel-_styles_root] div  a:nth-child(1) [class*=IconField-_styles_content]', { selector: 'css', visible: true });
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
