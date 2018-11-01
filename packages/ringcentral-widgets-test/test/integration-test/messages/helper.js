import messageSyncBody from 'ringcentral-integration/integration-test/mock/data/messageSync.json';
import messageFaxItemBody from 'ringcentral-integration/integration-test/mock/data/messageFaxItem.json';
import subscriptionBody from 'ringcentral-integration/integration-test/mock/data/subscription.json';
import pubnubMsg from 'ringcentral-integration/integration-test/mock/data/pubnub.json';
import * as mock from 'ringcentral-integration/integration-test/mock';
import { timeout } from '../shared';
import * as MockedPubNub from '../../__mocks__/pubnub.js';

export async function mockPubnub() {
  const pubnub = MockedPubNub.getLastPubnub();
  const encrypted = pubnub._realPubnub.encrypt(
    JSON.stringify({
      ...pubnubMsg,
      timestamp: (new Date()).toISOString(),
    }),
    subscriptionBody.deliveryMode.encryptionKey, {
      encryptKey: false,
      keyEncoding: 'base64',
      keyLength: 128,
      mode: 'ecb'
    });
  pubnub.mockMessage(encrypted);
  await timeout(100);
}

export async function mockGenerateMessageApi({
  count = 1,
  messageType = 'Text',
  readStatus = 'Unread',
  direction = 'Inbound',
  subject = '',
  to = {},
  from = {},
}) {
  const records = [];
  for (let i = 1; i <= count; i += 1) {
    const mockedMessage = {
      ...messageSyncBody.records[0],
      type: messageType,
      readStatus,
      id: i,
      from: {
        ...messageSyncBody.records[0].from,
        ...from,
      },
      conversationId: i,
      conversation: {
        id: i,
      },
      subject,
      direction,
      messageStatus: direction === 'Inbound' ? 'Received' : 'Sent',
      to: {
        extensionNumber: '101',
        name: 'Something1 New1',
        ...to,
      },
      creationTime: (new Date()).toISOString(),
      lastModifiedTime: (new Date()).toISOString(),
    };
    if (messageType === 'Fax' || messageType === 'VoiceMail') {
      // Fax and Voicemail doesn't have conversation
      mockedMessage.conversation = undefined;
      mockedMessage.conversationId = undefined;
    }
    records.push(mockedMessage);
  }
  mock.messageSync({ records });
  await timeout(2500);
}
export function mockUpdateMessageStatusApi({
  id = 1, messageType = 'Text', readStatus = 'Unread', direction = 'Inbound'
}) {
  let preDefined = {};
  if (messageType === 'Fax') {
    preDefined = messageFaxItemBody;
  }
  const mockedMessage = {
    ...preDefined,
    type: messageType,
    id,
    readStatus,
    direction,
    messageStatus: direction === 'Inbound' ? 'Received' : 'Sent',
    creationTime: (new Date()).toISOString(),
    lastModifiedTime: (new Date()).toISOString(),
  };
  if (messageType === 'Fax' || messageType === 'VoiceMail') {
    // Fax and Voicemail doesn't have conversation
    mockedMessage.conversation = undefined;
    mockedMessage.conversationId = undefined;
  }
  mock.updateMessageStatus(mockedMessage);
}

