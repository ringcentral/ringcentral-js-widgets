import AccountHelper from '../../lib/accountManager';

export default class Account {
  static async getAccount(context) {
    const {
      playload: { loginAccount = {} } = {},
      accounts = [],
    } = context.options.option;
    const needLoginAccount = !(loginAccount.username && loginAccount.password);
    const accountsList = [
      ...accounts || [],
    ];
    if (needLoginAccount) accountsList.unshift(context.options.option.loginAccount || context.options.tag.accounts);
    const needAccount = accountsList.length > 0;
    if (needAccount && !context.options.isVirtual) {
      const { accounts, destroyer } = await AccountHelper.getAccountList(context, accountsList);
      console.log('Get Accounts:', JSON.stringify(accounts, null, 2));
      context.driver.addAfterHook(destroyer);
      const [firstAccount, ..._accounts] = accounts;
      context.options.option.playload.accounts = needLoginAccount ? _accounts : accounts;
      if (needLoginAccount) {
        context.options.option.playload.loginAccount = {
          ...firstAccount,
          username: firstAccount.did,
        };
      }
    }
    console.log('Login Account:', context.options.option.playload.loginAccount);
  }
  static getAccount2(context) {
   context.options.option.playload.loginAccount = {
     username: '+18552085154',
     password: 'Test!123'
   }
  }
  static get steps() {
    return [
      this.getAccount,
     // this.getAccount2
    ];
  }
}
