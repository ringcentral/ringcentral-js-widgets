import { contains } from 'ramda';
import subscriptionBody from '@ringcentral-integration/commons/integration-test/mock/data/subscription.json';
import { isConferenceSession } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { getLastPubnub } from '../__mocks__/pubnub';
import Session, { CONFERENCE_SESSION_ID } from './session';
import { timeout } from '../integration-test/shared';

const defaultInboundOption = {
  id: '111',
  direction: 'Inbound',
};

const defaultOutboundOption = {
  fromNumber: '+15878133670',
  homeCountryId: '1',
  toNumber: '101',
};

const defaultConferenceOption = {
  fromNumber: '+15878133670',
  homeCountryId: '1',
  toNumber: 'conf_7777777777777777',
  to: 'conf_7777777777777777',
};

export async function getInboundCall(phone, options = defaultInboundOption) {
  const session = new Session(
    {
      ...options,
      callId: options.callId || `call-${options.id}`,
    },
    phone.webphone._webphone.userAgent,
  );
  await phone.webphone._webphone.userAgent.trigger('invite', session);
  return session;
}

export async function makeCall(phone, options = defaultOutboundOption) {
  for (const session of phone.webphone.sessions) {
    await phone.webphone.hold(session.id);
  }
  mock.device();
  const session = await phone.webphone.makeCall(options);
  return session;
}

export async function makeConferenceCall(
  phone,
  options = defaultConferenceOption,
) {
  mock.device();
  const session = await phone.webphone.makeCall(options);
  return session;
}

/* --- mock pubnub --- */
export async function mockPresencePubnub(activeCallsBody) {
  const pubnub = getLastPubnub();
  const encrypted = pubnub._realPubnub.encrypt(
    JSON.stringify({
      uuid: '1088719898803550582-8036702296129764',
      event:
        '/restapi/v1.0/account/160746006/extension/160751006/presence?detailedTelephonyState=true&sipData=true',
      timestamp: new Date().toISOString(),
      subscriptionId: '24dcfdcf-e7d0-4930-9edb-555ec11843b9',
      body: {
        allowSeeMyPresence: true,
        dndStatus: 'TakeAllCalls',
        extensionId: 160751006,
        meetingsStatus: 'Disconnected',
        pickUpCallsOnHold: false,
        presenceStatus: 'Busy',
        ringOnMonitoredCall: false,
        sequence: 368997,
        telephonyStatus: 'OnHold',
        userStatus: 'Available',
        activeCalls: activeCallsBody,
        totalActiveCalls: activeCallsBody.length,
      },
    }),
    subscriptionBody.deliveryMode.encryptionKey,
    {
      encryptKey: false,
      keyEncoding: 'base64',
      keyLength: 128,
      mode: 'ecb',
    },
  );
  pubnub.mockMessage(encrypted);
  await timeout(1000);
}

/* --- mock data --- */
export function mockGeneratePresenceApi({ activeCalls, totalActiveCalls }) {
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
    totalActiveCalls: totalActiveCalls || activeCalls.length,
    userStatus: 'Available',
  });
}

export function mockGeneratePresenceUpdateApi({
  activeCalls,
  totalActiveCalls,
}) {
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
    totalActiveCalls: totalActiveCalls || activeCalls.length,
    userStatus: 'Available',
  });
}

export function mockGenerateActiveCallsApi({ sessions }) {
  const records = sessions.reduce(
    (calls, session) =>
      calls.concat({
        uri:
          'https://api-xmnup.lab.nordigy.ru/restapi/v1.0/account/160746006/extension/160751006/call-log/Q6E-u_FeDGlNQA?view=Simple',
        id: 'Q6E-u_FeDGlNQA',
        sessionId: session.id,
        startTime: '2018-08-02T01:48:31.000Z',
        type: 'Voice',
        direction: session.direction,
        action: 'VoIP Call',
        result: 'In Progress',
        to: {
          extensionNumber: '105',
          name: 'FirstName 105 LastName',
        },
        from: {
          name: 'FirstName 105 LastName',
        },
      }),
    [],
  );
  mock.activeCalls({
    records,
  });
}

export function mockActiveCalls(
  webphoneSessions,
  mockOtherDeivce = [],
  ringSessionIds = [],
) {
  const commons = {
    sipData: {
      toTag: 'pgrneavq66',
      fromTag: '10.74.2.218-5070-2a0553bd67c3401',
      remoteUri: 'sip:104@ringcentral.com',
      localUri: 'sip:105@ringcentral.com',
    },
    startTime: '2018-08-07T09:20:09.405Z',
  };
  return webphoneSessions.reduce((calls, session) => {
    const telephonyStatus = contains(session.id, ringSessionIds)
      ? telephonyStatuses.ringing
      : telephonyStatuses.onHold;
    if (isConferenceSession(session)) {
      return calls.concat({
        ...commons,
        id: session.callId,
        sessionId: session.id,
        direction: session.direction,
        telephonyStatus,
        fromName: 'FirstName 104 LastName',
        from: '104',
        toName: 'Conference',
        to: { phoneNumber: '' },
      });
    }
    if (session.direction === 'Inbound') {
      return calls.concat({
        ...commons,
        id: session.callId,
        sessionId: session.id,
        direction: session.direction,
        telephonyStatus,
        fromName: 'FirstName 104 LastName',
        from: '104',
        toName: 'FirstName 105 LastName',
        to: '105',
      });
    }
    if (session.direction === 'Outbound') {
      return calls.concat({
        ...commons,
        id: `call-${session.id}`,
        sessionId: session.id,
        direction: session.direction,
        telephonyStatus,
        fromName: 'FirstName 105 LastName',
        from: session.fromNumber,
        toName: 'Something1 New1',
        to: session.to,
      });
    }
    return calls;
  }, mockOtherDeivce);
}

export { CONFERENCE_SESSION_ID };
