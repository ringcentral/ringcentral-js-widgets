
export default class SendSMS {
  static async send({ app }) {
    await $(app).click('@messageButton');
    await $(app).waitFor(500);
  }

  static async $mockSMS({ options: { option, isVirtual } }) {
    // TODO marten enhance hooks for plug-in.
    if (isVirtual) {
      const { sms } = require('ringcentral-integration/integration-test/mock');
      const { mockGenerateMessageApi } = require('ringcentral-widgets-test/test/integration-test/messages/helper');
      sms({
        subject: option.textSMS,
      });
      await mockGenerateMessageApi({
        subject: option.textSMS,
      });
    }
  }

  static async getIsConversationDetail({ app }) {
    const conversationPanel = await $(app).waitForSelector('@conversationPanel');
    return conversationPanel;
  }

  static async getLastTextSMS({ app }) {
    const lastTextSMS = await $(app).getText('@message:-1');
    return lastTextSMS;
  }

  static async getConversationTitle({ app }) {
    const title = await $(app).getText('@conversationPanel');
    return title;
  }

  static get steps() {
    return [
      this.$mockSMS,
      this.send,
    ];
  }
}
