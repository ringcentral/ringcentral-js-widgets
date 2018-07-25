import messageSyncBody from 'ringcentral-integration/integration-test/mock/data/messageSync.json';
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
  await timeout(2000);
}

export function mockGenerateMessageApi({
  count = 1, messageType = 'Text', readStatus = 'Unread', direction = 'Inbound'
}) {
  const records = [];
  for (let i = 0; i < count; i += 1) {
    records.push({
      ...messageSyncBody.records[0],
      type: messageType,
      readStatus,
      id: i,
      conversationId: i,
      conversation: {
        id: i,
      },
      direction,
      messageStatus: direction === 'Inbound' ? 'Received' : 'Sent',
      to: {
        extensionNumber: '101',
        name: 'Something1 New1'
      },
      creationTime: (new Date()).toISOString(),
      lastModifiedTime: (new Date()).toISOString(),
    });
  }
  mock.messageSync({ records });
}
export function mockUpdateMessageStatusApi({
  id = 0, messageType = 'Text', readStatus = 'Unread', direction = 'Inbound'
}) {
  mock.updateMessageStatus({
    type: messageType,
    id,
    readStatus,
    direction,
    messageStatus: direction === 'Inbound' ? 'Received' : 'Sent',
    creationTime: (new Date()).toISOString(),
    lastModifiedTime: (new Date()).toISOString(),
  });
}

