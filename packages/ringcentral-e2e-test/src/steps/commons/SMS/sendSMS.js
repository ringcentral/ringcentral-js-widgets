/* global $ */
export default class SendSMS {
  static async send({ driver: { app } }) {
    await $(app).click('@messageButton');
    await $(app).waitFor(500);
  }

  static async getIsConversationDetail({ driver: { app } }) {
    const conversationPanel = await $(app).waitForSelector('@conversationPanel');
    return conversationPanel;
  }

  static async getLastTextSMS({ driver: { app } }) {
    const lastTextSMS = await $(app).getText('@message:-1');
    return lastTextSMS;
  }

  static async getConversationTitle({ driver: { app } }) {
    const title = await $(app).getText('@conversationPanel');
    return title;
  }

  static get steps() {
    return [
      this.send,
    ];
  }
}
