import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';
import * as mock from 'ringcentral-integration/integration-test/mock';

import deviceBody from './data/device';

import { timeout } from '../shared';
import {
  makeCall,
  getInboundCall,
  mockActiveCalls,
  mockDetailedPresencePubnub,
} from '../../support/callHelper';

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
  // other device calls
  const mockOtherDeivce = [{
    id: 'call-4444',
    sessionId: '4444',
    fromName: 'FirstName 104 LastName',
    from: '104',
    toName: 'FirstName 105 LastName',
    to: '105',
    direction: 'Inbound',
    telephonyStatus: 'CallConnected',
    sipData: {
      toTag: 'pgrneavq66',
      fromTag: '10.74.2.218-5070-2a0553bd67c3401',
      remoteUri: 'sip:104@ringcentral.com',
      localUri: 'sip:105@ringcentral.com'
    },
    startTime: '2018-08-07T09:20:09.405Z',
  }];
  const activeCallsBody = mockActiveCalls(
    [inboundSession, outboundSession, incomingSession],
    mockOtherDeivce
  );
  mock.activeCalls(activeCallsBody);
  await phone.subscription.subscribe(['/account/~/extension/~/presence']);
  await timeout(2500);
  await mockDetailedPresencePubnub(activeCallsBody);
}
