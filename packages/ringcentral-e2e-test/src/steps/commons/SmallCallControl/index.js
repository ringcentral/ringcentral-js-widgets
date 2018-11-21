import checkCallStatus from '../../utils/checkCallStatus';
export default class SmallCallControl {
  static async click(context) {
    if (context.options.tag.project === 'salesforce') {
      // TODO waitFor popup form sf.
      await $(context.app).waitFor(3000 * 3);
      const dom = await $(context.page).$('[title="Close this window"]');
      if (dom) {
        await $(context.page).click('[title="Close this window"]');
      }
    }
    // TODO
    await $(context.app).waitFor(1000);
    await $(context.app).click('@leftSectionInfo');
    await $(context.app).waitFor(1000);
  }

  static async mute(context) {
    // TODO waitFor
    await $(context.app).waitFor(1000);
    await $(context.app).click('@mute');
  }

  static async hangup(context) {
    await $(context.app).click('@hangup');
    await checkCallStatus(context, { callStatus: 'Disconnected' });
  }

  static async reject(context) {
    await $(context.app).click('@reject');
  }

  static async unmute(context) {
    // TODO waitFor
    await $(context.app).waitFor(1000);
    await $(context.app).click('@unmute');
  }

  static async getIsCallUnmuted(context) {
    const isMuteButtonDisplay = await this.getIsMuteButtonDisplay(context);
    return isMuteButtonDisplay;
  }

  static async getIsMuteButtonDisplay(context) {
    const muteButton = await $(context.app).waitForSelector('@mute');
    return !!muteButton;
  }

  static async getIsCallHangup(context) {
    await checkCallStatus(context, { callStatus: 'Disconnected' });
    const callStatus = await $(context.app).getText('@callStatus');
    const isHangup = callStatus === 'Disconnected';
    return isHangup;
  }

  static async getIsMuteButtonHidden(context) {
    const muteButton = await $(context.app).$('@mute');
    return !muteButton;
  }

  static async getIsHangupButtonHidden(context) {
    const hangupButton = await $(context.app).$('@hangup');
    return !hangupButton;
  }

  static async getIsCallMuted(context) {
    return this.getIsUnmuteButtonDisplay(context);
  }

  static async getIsUnmuteButtonDisplay(context) {
    const unmuteButton = await $(context.app).$('@mute');
    return !!unmuteButton;
  }
  static async getIsStayAllCallsPage(context) {
    const activeCalls = await $(context.app).$('@activeCalls');
    return !!activeCalls;
  }

  static async getIsNavigateToCallControlPage(context) {
    const activeCallPanel = await $(context.app).waitForSelector('@activeCallPanel');
    return !!activeCallPanel;
  }

  static get steps() {
    return [
      this.click,
    ];
  }
}
