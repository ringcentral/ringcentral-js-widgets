
export default class SmallCallControl {
  static async click(context) {
    await $(context.app).click('@leftSectionInfo');
  }

  static async mute(context) {
    await $(context.app).click('@mute');
  }

  static async hangup(context) {
    await $(context.app).click('@hangup');
  }

  static async reject(context) {
    await $(context.app).click('@reject');
  }

  static async unmute(context) {
    await $(context.app).click('@unmute');
  }

  static async getIsCallUnmuted(context) {
    const isMuteButtonDisplay = await this.getIsMuteButtonDisplay(context);
    return isMuteButtonDisplay;
  }

  static async getIsMuteButtonDisplay(context) {
    const muteButton = await $(context.app).$('@mute');
    return !!muteButton;
  }

  static async getIsCallHangup(context) {
    await await $(context.app).waitFor(1000);
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
    const activeCallPanel = await $(context.app).$('@activeCallPanel');
    return !!activeCallPanel;
  }

  static get steps() {
    return [
      this.click,
    ];
  }
}
