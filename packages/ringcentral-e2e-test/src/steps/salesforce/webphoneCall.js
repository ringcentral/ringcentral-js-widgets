import AccountHelper from '../../lib/accountManager/index'
import webphone from '../../lib/webphone';
export default class WebphoneCall{

  static async getAccount(context) {
    const accountHelper = new AccountHelper();
    context.options.option.account1 = await accountHelper.getAccount(context.options.option.accountTag);
    context.driver.addAfterHook(async () => {
      await accountHelper.recycleAccount(context.options.option.account[0]['uuid']);
    });
  }
  static async webphoneCall(context) {
    let reswebphone = await webphone.createWebPhone('+'+context.options.option.account1[0]['did'],'webphone','Test!123');
    let result2 = await webphone.operateMakeCall(JSON.parse(reswebphone.text)._id, context.options.option.account[0]['mainnumber']);
    context.driver.addAfterHook(async () => {
      await webphone.operateClose(JSON.parse(reswebphone.text)._id,JSON.parse(reswebphone.text).sessionId,JSON.parse(reswebphone.text).phoneNumber);
    });
    await $(app).waitFor(10000);
  }
  static get steps() {
    return [
      this.getAccount,
      this.webphoneCall,
    ];
  }
}