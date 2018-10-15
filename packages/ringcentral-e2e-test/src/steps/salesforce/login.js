import { createProcess } from 'marten';
import AccountHelper from '../../lib/accountManager/index'
import ToggleEnv from './toggleEnv';
/* global $ */
export default class Login {
  static async prepare(context) {
    await $(context.driver.app).waitFor('[class*=loginButton]',{ selector: 'css' });
    if (context.options.isVirtual) return;
    const process = createProcess(
      ToggleEnv,
    )(context);
    await process.exec();
  }

  static async getAccount(context) {
    const accountHelper = new AccountHelper();
    context.options.option.account = await accountHelper.getAccount(context.options.option.accountTag);
    context.driver.addAfterHook(async () => {
      await accountHelper.recycleAccount(context.options.option.account[0]['uuid']);
    });
  }

  static async login({ options: { option, isVirtual }, driver: { app } }) {
    if (isVirtual) {
      app.props().phone.auth.login({ username: option.account[0]['mainNumber'], password: option.account[0]['password'] });
    } else {
      await $(app).execute(`phone.auth.login({username: '${option.account[0]['mainNumber']}', password: '${option.account[0]['password']}'})`);
    }
    await $(app).waitForSelector('[title="More Menu"]',{ selector: 'css' });
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
