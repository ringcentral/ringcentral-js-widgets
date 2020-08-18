import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import * as mock from 'ringcentral-integration/integration-test/mock';
import { waitUntilEqual } from 'ringcentral-integration/integration-test/utils/WaitUtil';

import deviceBody from './data/device';

import {
  makeCall,
  getInboundCall,
  mockActiveCalls,
  mockPresencePubnub,
  mockGeneratePresenceApi,
  mockGeneratePresenceUpdateApi,
  mockGenerateActiveCallsApi,
} from '../../support/callHelper';

function mockCallProcedure(func) {
  return async (phone, ...args) => {
    mock.device(deviceBody, false);
    const activeCallsBody = await func.apply(null, [phone, ...args]);
    mock.activeCalls(activeCallsBody);
    await phone.subscription.subscribe(
      ['/restapi/v1.0/account/~/extension/~/presence'],
      10,
    );
    await waitUntilEqual(
      () =>
        !!(
          phone.subscription._subscription &&
          phone.subscription._subscription._pubnub
        ),
      'subscription',
      true,
      5,
      10,
    );
    await mockPresencePubnub(activeCallsBody);
  };
}

async function mockMultiActiveCallBodies(phone) {
  // inbound call
  const inboundSession = await getInboundCall(phone, {
    id: '111',
    direction: 'Inbound',
    callId: 'call-111',
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
    telephonyStatus: telephonyStatuses.ringing,
  });
  // other device calls
  const mockOtherDeivce = [
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
        toTag: 'pgrneavq66',
        fromTag: '10.74.2.218-5070-2a0553bd67c3401',
        remoteUri: 'sip:104@ringcentral.com',
        localUri: 'sip:105@ringcentral.com',
      },
      startTime: '2018-08-07T09:20:09.405Z',
    },
  ];
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

export async function mockActiveCallPanelData(
  phone,
  mockOtherDeivce = [],
  ringSessionIds = [],
) {
  const activeCalls = mockActiveCalls(
    phone.webphone.sessions,
    mockOtherDeivce,
    ringSessionIds,
  );
  mockGeneratePresenceApi({
    activeCalls,
  });
  mockGeneratePresenceUpdateApi({
    activeCalls,
  });
  mockGenerateActiveCallsApi({
    sessions: phone.webphone.sessions,
  });
  await phone.subscription.subscribe(
    ['/restapi/v1.0/account/~/extension/~/presence'],
    10,
  );
  await waitUntilEqual(
    () =>
      !!(
        phone.subscription._subscription &&
        phone.subscription._subscription._pubnub
      ),
    'subscription',
    true,
    5,
    10,
  );
  await mockPresencePubnub(activeCalls);
}
