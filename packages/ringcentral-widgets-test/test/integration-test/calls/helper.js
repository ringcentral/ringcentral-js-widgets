import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';
import * as mock from 'ringcentral-integration/integration-test/mock';

import deviceBody from './data/device';

import { timeout } from '../shared';
import {
  makeCall,
  getInboundCall,
  mockActiveCalls,
  mockDetailedPresencePubnub,
  mockGeneratePresenceApi,
  mockGeneratePresenceUpdateApi,
  mockGenerateActiveCallsApi,
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
  // outbound call session
  const outboundSession = await makeCall(phone, {
    callId: true,
    fromNumber: '+15878133670',
    homeCountryId: '1',
    toNumber: '101',
  });
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
    const outboundSession = await makeCall(phone, {
      callId: true,
      fromNumber: '+15878133670',
      homeCountryId: '1',
      toNumber: '101',
    });
    outboundSession.accept(phone.webphone.acceptOptions);
  }
  return mockActiveCalls(phone.webphone.sessions);
}

export async function mockMultiActiveCalls(phone) {
  await mockCallProcedure(mockMultiActiveCallBodies)(phone);
}

export async function mockMultiOutboundCalls(phone, n) {
  await mockCallProcedure(mockMultipleOutboundCallBodies)(phone, n);
}
// all calls page
export async function makeInboudCalls(phone, optional = []) {
  for (const option of optional) {
    await getInboundCall(phone, option);
  }
  const activeCallBody = await mockActiveCalls(phone.webphone.sessions);
  mock.activeCalls(activeCallBody);
  await phone.subscription.subscribe(['/account/~/extension/~/presence'], 10);
  await timeout(100);
  await mockDetailedPresencePubnub(activeCallBody);
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
export async function mockSub(phone, ttl = 100) {
  const activeCalls = generateActiveCallsData(phone.webphone.sessions);
  mockGeneratePresenceApi({
    activeCalls
  });
  mockGeneratePresenceUpdateApi({
    activeCalls
  });
  mockGenerateActiveCallsApi({
    sessions: phone.webphone.sessions
  });
  await phone.subscription.subscribe(['/account/~/extension/~/presence'], 10);
  await timeout(ttl);
  await mockDetailedPresencePubnub(activeCalls);
}
