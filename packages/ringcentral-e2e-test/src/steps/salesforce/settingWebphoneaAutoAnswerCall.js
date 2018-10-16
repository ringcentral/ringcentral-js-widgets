import AccountHelper from 'ringcentral-e2e-test/src/lib/accountManager'
import Webphone from 'ringcentral-e2e-test/src/lib/webphone';
export default class WebphoneCall{

  static async getAccount(context) {
    const accountHelper = new AccountHelper();
    context.options.option.account1 = await accountHelper.getAccount(context.options.option.accountTag);
    context.options.option.account2 = await accountHelper.getAccount(context.options.option.accountTag);

    context.driver.addAfterHook(async () => {
      await accountHelper.recycleAccount(context.options.option.account1[0]['uuid']);
      await accountHelper.recycleAccount(context.options.option.account2[0]['uuid']);
    });
  }
  static async webphoneCall(context) {
    const webphone = new Webphone();
    let respstn1 = await webphone.createWebPhone('+'+context.options.option.account1[0]['did'],'webphone','Test!123');
    let result1  = await webphone.preOperateAnswerCall(JSON.parse(respstn1.text)._id, JSON.parse(respstn1.text).sessionId);
    let respstn2 = await webphone.createWebPhone('+'+context.options.option.account2[0]['did'],'webphone','Test!123');
    let result2  = await webphone.preOperateAnswerCall(JSON.parse(respstn2.text)._id, JSON.parse(respstn2.text).sessionId);
    context.driver.addAfterHook(async () => {
      await webphone.operateClose(JSON.parse(respstn1.text)._id,JSON.parse(respstn1.text).sessionId,JSON.parse(respstn1.text).phoneNumber);
      await webphone.operateClose(JSON.parse(respstn2.text)._id,JSON.parse(respstn2.text).sessionId,JSON.parse(respstn2.text).phoneNumber);
    });
    await $(app).waitFor(100);
  }
  static get steps() {
    return [
      this.getAccount,
      this.webphoneCall,
    ];
  }
}