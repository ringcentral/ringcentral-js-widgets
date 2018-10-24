import AccountHelper from '../../lib/accountManager';

const AVAILABLE_TYPE = ['browser', 'myRCPhone', 'otherPhone', 'customPhone'];
export default class Account {
  static async getAccount(context) {
    // merge case settings
    const loginAccount =
      context.options.option.loginAccount ||
      context.options.tag.loginAccount;
    const otherAccount =
      context.options.option.otherAccount ||
      context.options.tag.otherAccount;
    // case settings
    const accountTags = [].concat(loginAccount).concat(otherAccount);
    const { callingType } = context.options.option;
    // TODO should insert logger here
    // console.log('accountTags', accountTags);
    if (!AVAILABLE_TYPE.includes(callingType)) {
      console.error(`Invalid callingType ${callingType}`);
      return;
    }
    const {
      accounts,
      destroyer
    } = await AccountHelper.getAccountList(accountTags);
    // TODO should insert logger here
    context.driver.addAfterHook(destroyer);
    // TODO should introduce payload concept here
    context.options.option.accounts = accounts;
  }
  static get steps() {
    return [
      this.getAccount,
    ];
  }
}
