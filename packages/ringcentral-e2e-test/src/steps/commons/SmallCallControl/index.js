/* global $ */
export default class SmallCallControl {
  static async click(context) {
    await $(context.driver.app).click('@leftSectionInfo');
  }

  static async mute(context) {
    await $(context.driver.app).click('@mute');
  }

  static async hangup(context) {
    await $(context.driver.app).click('@hangup');
  }

  static async reject(context) {
    await $(context.driver.app).click('@reject');
  }

  static async unmute(context) {
    await $(context.driver.app).click('@unmute');
  }

  static async getIsCallUnmuted(context) {
    const isMuteButtonDisplay = await this.getIsMuteButtonDisplay(context);
    return isMuteButtonDisplay;
  }

  static async getIsMuteButtonDisplay(context) {
    const muteButton = await $(context.driver.app).$('@mute');
    return !!muteButton;
  }

  static async getIsCallHangup(context) {
    const callStatus = await $(context.driver.app).getText('@callStatus');
    const isHangup = callStatus === 'Disconnected';
    return isHangup;
  }

  static async getIsMuteButtonHidden(context) {
    const muteButton = await $(context.driver.app).$('@mute');
    return !muteButton;
  }

  static async getIsHangupButtonHidden(context) {
    const hangupButton = await $(context.driver.app).$('@hangup');
    return !hangupButton;
  }

  static async getIsCallMuted(context) {
    return this.getIsUnmuteButtonDisplay(context);
  }

  static async getIsUnmuteButtonDisplay(context) {
    const unmuteButton = await $(context.driver.app).$('@mute');
    return !!unmuteButton;
  }
  static async getIsStayAllCallsPage(context) {
    const activeCalls = await $(context.driver.app).$('@activeCalls');
    return !!activeCalls;
  }

  static async getIsNavigateToCallControlPage(context) {
    const activeCallPanel = await $(context.driver.app).$('@activeCallPanel');
    return !!activeCallPanel;
  }

  static get steps() {
    return [
      this.click,
    ];
  }
}
