import subscriptionBody from 'ringcentral-integration/integration-test/mock/data/subscription.json';
import { isConferenceSession } from 'ringcentral-integration/modules/Webphone/webphoneHelper';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';
import * as mock from 'ringcentral-integration/integration-test/mock';
import * as MockedPubNub from '../__mocks__/pubnub.js';
import Session from './session';
import { timeout } from '../integration-test/shared';

export const CONFERENCE_SESSION_ID = 'Y3MxNzI2MjI1NTQzODI0MzUzM0AxMC43NC4yLjIxOA';

const defaultInboundOption = {
  id: '111',
  direction: 'Inbound'
};

const defaultOutboundOption = {
  callId: true,
  fromNumber: '+15878133670',
  homeCountryId: '1',
  toNumber: '101',
};

const defaultConferenceOption = {
  callId: true,
  fromNumber: '+15878133670',
  homeCountryId: '1',
  toNumber: 'conf_7777777777777777',
  to: 'conf_7777777777777777'
};

export async function getInboundCall(phone, options = defaultInboundOption) {
  const session = new Session(options);
  await phone.webphone._webphone.userAgent.trigger('invite', session);
  return session;
}

export async function makeCall(phone, options = defaultOutboundOption) {
  const session = await phone.webphone.makeCall(options);
  if (options.callId) {
    session.__rc_callId = `call-${session.id}`;
  }
  return session;
}

export async function makeConferenceCall(phone, options = defaultConferenceOption) {
  const session = await phone.webphone.makeCall(options);
  if (options.callId) {
    session.__rc_callId = `call-${session.id}`;
  }
  return session;
}

/* --- mock pubnub --- */
export async function mockDetailedPresencePubnub(activeCallsBody) {
  const pubnub = MockedPubNub.getLastPubnub();
  const encrypted = pubnub._realPubnub.encrypt(
    JSON.stringify({
      uuid: '1088719898803550582-8036702296129764',
      event: '/restapi/v1.0/account/160746006/extension/160751006/presence?detailedTelephonyState=true&sipData=true',
      timestamp: (new Date()).toISOString(),
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
      }
    }),
    subscriptionBody.deliveryMode.encryptionKey, {
      encryptKey: false,
      keyEncoding: 'base64',
      keyLength: 128,
      mode: 'ecb'
    });
  pubnub.mockMessage(encrypted);
  await timeout(1000);
}

export function mockActiveCalls(webphoneSessions, mockOtherDeivce = []) {
  const commons = {
    sipData: {
      toTag: 'pgrneavq66',
      fromTag: '10.74.2.218-5070-2a0553bd67c3401',
      remoteUri: 'sip:104@ringcentral.com',
      localUri: 'sip:105@ringcentral.com'
    },
    startTime: '2018-08-07T09:20:09.405Z',
  };
  return webphoneSessions.reduce((calls, session) => {
    if (isConferenceSession(session)) {
      return calls.concat({
        ...commons,
        id: session.callId,
        sessionId: session.id,
        direction: session.direction,
        telephonyStatus: session.telephonyStatus || telephonyStatuses.onHold,
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
        telephonyStatus: session.telephonyStatus || telephonyStatuses.onHold,
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
        telephonyStatus: session.telephonyStatus || telephonyStatuses.onHold,
        fromName: 'FirstName 105 LastName',
        from: session.fromNumber,
        toName: 'Something1 New1',
        to: session.to,
      });
    }
    return calls;
  }, mockOtherDeivce);
}
