export default class CloseCallLogSection {
  static async close(context) {
    await $(context.app).click('@closeButton');
  }

  static get steps() {
    return [
      this.close,
    ];
  }
}
