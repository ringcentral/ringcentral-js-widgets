import AccountHelper from '../../lib/accountManager';

const AVAILABLE_TYPE = ['browser', 'myRCPhone', 'otherPhone', 'customPhone'];
export default class Account {
  static async getAccount(context) {
    const accountTags =
      context.options.option.accounts ||
      context.options.tag.accounts;

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
    context.options.accounts = accounts;
  }
  static get steps() {
    return [
      this.getAccount,
    ];
  }
}
