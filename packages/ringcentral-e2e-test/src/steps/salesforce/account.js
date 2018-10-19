import AccountHelper from '../../lib/accountManager'
export default class Account {
  static async getAccount(context) {
    const accountHelper = new AccountHelper();
    let configOption = context.options.option;
    let tempAccount;
    let accountTag = new Array();
    let accounts = new Array();

    for (var key in configOption) {
      accountTag.push(configOption[key]);
      console.log(accountTag);
    }

    switch (configOption.callingType) {
      case 'browser':
      case 'myRCPhone':
        let myRCPhoneAccount = new Array();
        for (var i = 1; i < accountTag.length; i++) {
          let myRCPhoneAccount = await accountHelper.getAccount(accountTag[i]);
          tempAccount = myRCPhoneAccount[0];
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
            accounts.push(tempAccount);
          }
        }
        break;
      case 'customPhone':
        let customPhoneAccount = new Array();
        for (var i = 1; i < accountTag.length; i++) {
          customPhoneAccount = await accountHelper.getAccount(accountTag[i]);
          tempAccount = customAccount[0];
          accounts.push(tempAccount)
        }
        break;
      default:
        console.error('Please set a valid callingType');
    }
    context.driver.addAfterHook(async () => {
      for (var account in accounts) {
        await accountHelper.recycleAccount(account['uuid']);
      }
    });
    return context.options.option.accounts = accounts;
  }
  static get steps() {
    return [
      this.getAccount,
    ];
  }
}