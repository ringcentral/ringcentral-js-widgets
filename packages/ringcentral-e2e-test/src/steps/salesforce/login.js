import { createProcess } from 'marten';
import AccountHelper from '../../lib/accountManager/index'
import ToggleEnv from './toggleEnv';
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
    const accountHelper = new AccountHelper();
    let configOption = context.options.option;
    let tempAccount;
    let accountTag = new Array();
    let accounts = new Array();

    for (var key in configOption) {
      accountTag.push(configOption[key]);
    }

    switch (configOption.callingType) {
      case 'browser':
      case 'myRCPhone':
        let myRCPhoneAccount = new Array();
        for (var i = 1; i < accountTag.length; i++) {
          let myRCPhoneAccount = await accountHelper.getAccount(accountTag[i]);
          tempAccount = myRCPhoneAccount[0];
          console.log("tempAccount====", tempAccount);
          accounts.push(tempAccount)
        }
        break;
      case 'otherPhone':
        let otherAccount = new Array();
        for (var i = 1; i < accountTag.length; i++) {
          otherAccount = await accountHelper.getAccount(accountTag[i]);
          if (accountTag[i].indexOf('forwarding') >= 0) {
            let tempAccount1 = otherAccount[1];
            tempAccount = otherAccount[0];
            accounts.push(tempAccount, tempAccount1);
          } else {
            tempAccount = otherAccount[0];
            accounts.push(tempAccount)
          }
          console.log("tempAccount====", tempAccount);
        }
        break;
      case 'customPhone':
        let customPhoneAccount = new Array();
        for (var i = 1; i < accountTag.length; i++) {
          customPhoneAccount = await accountHelper.getAccount(accountTag[i]);
          tempAccount = customAccount[0];
          console.log("tempAccount====", tempAccount);
          accounts.push(tempAccount)
        }
        break;
      default:
        console.log('Please set a valid callingType');
    }
    context.driver.addAfterHook(async () => {
      for (var account in accounts) {
        await accountHelper.recycleAccount(account['uuid']);
      }
    });
    return context.options.option.accounts = accounts;
  }

  static async login({ options: { option, isVirtual }, driver: { app } }) {
    if (isVirtual) {
      app.props().phone.auth.login({ username: option.accounts[0]['mainNumber'], password: option.accounts[0]['password'] });
    } else {
      await $(app).execute(`phone.auth.login({username: '${option.accounts[0]['mainNumber']}', password: '${option.accounts[0]['password']}'})`);
    }
    await $(app).waitForSelector('[title="More Menu"]', { selector: 'css' });
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
