import subscriptionBody from 'ringcentral-integration/integration-test/mock/data/subscription.json';
import * as mock from 'ringcentral-integration/integration-test/mock';

import { timeout } from '../shared';
import pubnubPresence from './data/pubnubPresence';
import * as MockedPubNub from '../../__mocks__/pubnub.js';

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
  await timeout(2000);
}

export function mockGeneratePresenceApi({ activeCalls }) {
  mock.presence('~', {
    activeCalls,
    allowSeeMyPresence: true,
    dndStatus: 'TakeAllCalls',
    extensionId: 160751006,
    meetingsStatus: 'Disconnected',
    pickUpCallsOnHold: false,
    presenceStatus: 'Busy',
    ringOnMonitoredCall: false,
    sequence: 368997,
    telephonyStatus: 'OnHold',
    totalActiveCalls: 2,
    userStatus: 'Available',
  });
}

export function mockGeneratePresenceUpdateApi({ activeCalls }) {
  mock.presenceUpdate('~', {
    activeCalls,
    allowSeeMyPresence: true,
    dndStatus: 'TakeAllCalls',
    extensionId: 160751006,
    meetingsStatus: 'Disconnected',
    pickUpCallsOnHold: false,
    presenceStatus: 'Busy',
    ringOnMonitoredCall: false,
    sequence: 368997,
    telephonyStatus: 'OnHold',
    totalActiveCalls: 2,
    userStatus: 'Available',
  });
}

export function mockGenerateActiveCallsApi({ sessions }) {
  const records = sessions.reduce((calls, session) => calls.concat({
    uri: 'https://api-xmnup.lab.nordigy.ru/restapi/v1.0/account/160746006/extension/160751006/call-log/Q6E-u_FeDGlNQA?view=Simple',
    id: 'Q6E-u_FeDGlNQA',
    sessionId: session.id,
    startTime: '2018-08-02T01:48:31.000Z',
    type: 'Voice',
    direction: session.direction,
    action: 'VoIP Call',
    result: 'In Progress',
    to: {
      extensionNumber: '105',
      name: 'FirstName 105 LastName'
    },
    from: {
      name: 'FirstName 105 LastName'
    }
  }), []);
  mock.activeCalls({
    records
  });
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
