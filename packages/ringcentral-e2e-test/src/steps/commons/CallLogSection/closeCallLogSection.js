/* global $ */
export default class CloseCallLogSection {
  static async close(context) {
    await $(context.driver.app).click('@closeButton');
  }

  static get steps() {
    return [
      this.close,
    ];
  }
}
