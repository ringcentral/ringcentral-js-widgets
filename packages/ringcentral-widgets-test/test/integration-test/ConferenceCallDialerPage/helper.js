import subscriptionBody from 'ringcentral-integration/integration-test/mock/data/subscription.json';

import * as MockedPubNub from '../../__mocks__/pubnub.js';
import pubnubPresence from './data/pubnubPresence';
import { timeout } from '../shared';

let sequence = (pubnubPresence && pubnubPresence.body && pubnubPresence.body.sequence) || 368997;

export async function mockPubnub({ activeCalls }) {
  const pubnub = MockedPubNub.getLastPubnub();
  sequence += 1;
  const encrypted = pubnub._realPubnub.encrypt(
    JSON.stringify({
      ...pubnubPresence,
      body: {
        ...pubnubPresence.body,
        sequence,
        activeCalls
      },
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

export function generateActiveCallsData(sessions) {
  return sessions.reduce((calls, session) => calls.concat({
    direction: session.direction,
    from: '+12812923232',
    fromName: 'FirstName 105 LastName',
    id: `call-id-${session.id}`,
    sessionId: session.id,
    startTime: (new Date()).getTime(),
    telephonyStatus: 'OnHold',
    to: session.to || '101',
    toName: 'Something1 New1',
    sipData: {
      fromTag: '10.74.2.219-5070-09d1878acdfc44a',
      localUri: 'sip:+12812923232@ringcentral.com',
      remoteUri: `sip:${session.to}@ringcentral.com`,
      toTag: 'tr8f8ele53',
    }
  }), []);
}
