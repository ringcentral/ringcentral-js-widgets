import deviceBody from 'ringcentral-integration/integration-test/mock/data/device';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';
import * as mock from 'ringcentral-integration/integration-test/mock';

import { timeout } from '../shared';
import {
  makeCall,
  getInboundCall,
  mockActiveCalls,
  mockDetailedPresencePubnub,
} from '../../support/callHelper';

function mockCallProcedure(func) {
  return async (phone, ...args) => {
    mock.device(deviceBody, false);
    const activeCallsBody = await func.apply(null, [phone, ...args]);
    mock.activeCalls(activeCallsBody);
    await phone.subscription.subscribe(['/account/~/extension/~/presence'], 10);
    await timeout(100);
    await mockDetailedPresencePubnub(activeCallsBody);
  };
}

async function mockMultiActiveCallBodies(phone) {
  // inbound call
  const inboundSession = await getInboundCall(phone, {
    id: '111',
    direction: 'Inbound',
    callId: 'call-111'
  });
  await phone.webphone.answer(inboundSession.id);
  await phone.webphone.hold(inboundSession.id);
  // outbound call session
  const outboundSession = await makeCall(phone, {
    callId: true,
    fromNumber: '+15878133670',
    homeCountryId: '1',
    toNumber: '101',
  });
  await phone.webphone.hold(outboundSession.id);
  // incoming call
  const incomingSession = await getInboundCall(phone, {
    id: '222',
    direction: 'Inbound',
    callId: 'call-222',
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
  return mockActiveCalls(phone.webphone.sessions, mockOtherDeivce);
}

async function mockMultipleOutboundCallBodies(phone, n) {
  for (let i = n; i > 0; i -= 1) {
    const outboundSession = await makeCall(phone);
    await phone.webphone.hold(outboundSession.id);
  }
  return mockActiveCalls(phone.webphone.sessions);
}

export async function mockMultiActiveCalls(phone) {
  await mockCallProcedure(mockMultiActiveCallBodies)(phone);
}

export async function mockMultiOutboundCalls(phone, n) {
  await mockCallProcedure(mockMultipleOutboundCallBodies)(phone, n);
}
