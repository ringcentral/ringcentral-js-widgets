import subscriptionBody from 'ringcentral-integration/integration-test/mock/data/subscription.json';
import * as mock from 'ringcentral-integration/integration-test/mock';

import Session from '../../support/session';
import { timeout } from '../shared';
import pubnubPresenceBody from './data/pubnubPresence';
import deviceBody from './data/device';
import * as MockedPubNub from '../../__mocks__/pubnub.js';

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

export async function mockMultiActiveCalls(phone, makeTwoOutboundCall) {
  mock.device(deviceBody, false);
  // inbound call session
  const inboundSession = new Session({
    id: '111',
    direction: 'Inbound',
    _header_callId: 'call-111'
  });
  // incoming call session
  const incomingSession = new Session({
    id: '222',
    direction: 'Inbound',
    _header_callId: 'call-222'
  });

  await phone.webphone._webphone.userAgent.trigger('invite', inboundSession);
  await phone.webphone.answer(inboundSession.id);
  await phone.webphone.hold(inboundSession.id);
  // outbound call session
  const outboundSession = await phone.webphone.makeCall({ fromNumber: '+15878133670', toNumber: '101', homeCountryId: '1' });
  outboundSession._header_callId = `call-${outboundSession.id}`;
  await phone.webphone.hold(outboundSession.id);
  const outboundSession2 = await phone.webphone.makeCall({ fromNumber: '+15878133670', toNumber: '101', homeCountryId: '1' });
  outboundSession2._header_callId = `call-${outboundSession2.id}`;
  await phone.webphone._webphone.userAgent.trigger('invite', incomingSession);
  const activeCallsBody = [
    // inbound call
    {
      id: inboundSession._header_callId,
      sessionId: inboundSession.id,
      fromName: 'FirstName 104 LastName',
      from: '104',
      toName: 'FirstName 105 LastName',
      to: '105',
      direction: 'Inbound',
      telephonyStatus: 'OnHold',
      sipData: {
        toTag: 'pgrneavq66',
        fromTag: '10.74.2.218-5070-2a0553bd67c3401',
        remoteUri: 'sip:104@ringcentral.com',
        localUri: 'sip:105@ringcentral.com'
      },
      startTime: '2018-08-07T09:20:09.405Z'
    },
    // incoming call - ring call
    {
      id: incomingSession._header_callId,
      sessionId: incomingSession.id,
      fromName: 'FirstName 104 LastName',
      from: '104',
      toName: 'FirstName 105 LastName',
      to: '105',
      telephonyStatus: 'Ringing',
      direction: 'Inbound',
      sipData: {
        toTag: 'blf',
        fromTag: 'cs1726225552836133786-2',
        remoteUri: 'sip:104@ringcentral.com',
        localUri: 'sip:105@ringcentral.com'
      },
      startTime: '2018-08-07T09:20:59.077Z'
    },
    // outbound call
    {
      id: `call-${outboundSession.id}`,
      sessionId: outboundSession.id,
      direction: 'Outbound',
      fromName: 'FirstName 105 LastName',
      from: outboundSession.fromNumber,
      toName: 'Something1 New1',
      to: outboundSession.to,
      telephonyStatus: 'CallConnected',
      sipData: {
        toTag: 'srjtbqv29l',
        fromTag: '10.74.2.219-5070-2a224ee6421749c',
        remoteUri: 'sip:101@ringcentral.com',
        localUri: 'sip:+14804483316@ringcentral.com'
      },
      startTime: '2018-08-07T09:20:19.867Z'
    },
    // other device call
    {
      id: 'call-4444',
      sessionId: '4444',
      fromName: 'FirstName 104 LastName',
      from: '104',
      toName: 'FirstName 105 LastName',
      to: '105',
      direction: 'Inbound',
      telephonyStatus: 'CallConnected',
      sipData: {
        toTag: '5s02sj8rhl',
        fromTag: '10.74.2.218-5070-576d0c13caa3431',
        remoteUri: 'sip:104@ringcentral.com',
        localUri: 'sip:105@ringcentral.com'
      },
      startTime: '2018-08-07T09:20:31.124Z'
    }
  ];
  if (makeTwoOutboundCall) {
    activeCallsBody.push({
      id: `call-${outboundSession2.id}`,
      sessionId: outboundSession2.id,
      direction: 'Outbound',
      fromName: 'FirstName 105 LastName',
      from: outboundSession2.fromNumber,
      toName: 'Something1 New1',
      to: outboundSession2.to,
      telephonyStatus: 'CallConnected',
      sipData: {
        toTag: 'srjtbqv29l',
        fromTag: '10.74.2.219-5070-2a224ee6421749c',
        remoteUri: 'sip:101@ringcentral.com',
        localUri: 'sip:+14804483316@ringcentral.com'
      },
      startTime: '2018-08-07T09:20:19.867Z'
    });
  }
  mock.activeCalls(activeCallsBody);
  await mockPubnub(activeCallsBody);
  await timeout(2000);
}
