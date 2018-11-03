/* global $ */
export default class CloseCallLogSection {
  static async close(context) {
    await $(context.driver.app).click('@close');
  }

  static get steps() {
    return [
      this.close,
    ];
  }
}
