import subscriptionBody from 'ringcentral-integration/integration-test/mock/data/subscription.json';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';
import * as mock from 'ringcentral-integration/integration-test/mock';

import deviceBody from './data/device';
import mockActiveCalls from './data/activeCalls';
import pubnubPresenceBody from './data/pubnubPresence';

import { timeout } from '../shared';
import * as MockedPubNub from '../../__mocks__/pubnub.js';
import { getInboundCall, makeCall } from '../../support/callHelper';

export async function mockPubnub(activeCallsBody) {
  const pubnub = MockedPubNub.getLastPubnub();
  const encrypted = pubnub._realPubnub.encrypt(
    JSON.stringify({
      ...pubnubPresenceBody,
      body: {
        ...pubnubPresenceBody.body,
        activeCalls: activeCallsBody
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

export async function mockMultiActiveCalls(phone) {
  mock.device(deviceBody, false);
  // inbound call
  const inboundSession = await getInboundCall(phone, {
    id: '111',
    direction: 'Inbound',
    _header_callId: 'call-111'
  });
  await phone.webphone.answer(inboundSession.id);
  await phone.webphone.hold(inboundSession.id);
  // outbound call session
  const outboundSession = await makeCall(phone, {
    _header_callId: true,
    fromNumber: '+15878133670',
    homeCountryId: '1',
    toNumber: '101',
  });
  await phone.webphone.hold(outboundSession.id);
  // incoming call
  const incomingSession = await getInboundCall(phone, {
    id: '222',
    direction: 'Inbound',
    _header_callId: 'call-222',
    telephonyStatus: telephonyStatuses.ringing
  });
  const activeCallsBody = mockActiveCalls([inboundSession, outboundSession, incomingSession], true);
  mock.activeCalls(activeCallsBody);
  await mockPubnub(activeCallsBody);
  await timeout(2000);
}
