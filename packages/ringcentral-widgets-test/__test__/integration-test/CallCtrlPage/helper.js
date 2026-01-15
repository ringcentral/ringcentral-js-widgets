import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { sleep } from '@ringcentral-integration/commons/utils';

import {
  makeCall,
  makeConferenceCall,
  mockActiveCalls,
  mockGenerateActiveCallsApi,
  mockGeneratePresenceApi,
  mockGeneratePresenceUpdateApi,
  mockPresencePubnub,
} from '../../support/callHelper';

import deviceBody from './data/device.json';
import getConferenceCallBody from './data/getConferenceCall';

export async function makeOutboundCall(phone) {
  mock.device(deviceBody);
  await Promise.all(
    phone.webphone.sessions.map((session) => phone.webphone.hold(session.id)),
  );
  const outboundSession = await makeCall(phone);
  return outboundSession;
}

export async function updateConferenceCallEnv(
  phone,
  { conferencePartiesCount, conferenceCallBody },
) {
  const currentConference =
    phone.conferenceCall.conferences[phone.conferenceCall.currentConferenceId];
  const conferenceBodyData = conferencePartiesCount
    ? getConferenceCallBody(conferencePartiesCount)
    : conferenceCallBody;
  if (phone.conferenceCall.setConferencesState) {
    phone.conferenceCall.setConferencesState({
      ...phone.conferenceCall.conferences,
      [conferenceBodyData.id]: {
        ...phone.conferenceCall.conferences[conferenceBodyData.id],
        conference: conferenceBodyData,
        sessionId: currentConference.id,
      },
    });
  } else {
    phone.store.dispatch({
      type: phone.conferenceCall.actionTypes.updateConferenceSucceeded,
      conference: conferenceBodyData,
      sessionId: currentConference.sessionId,
    });
  }
}

export async function mockConferenceCallEnv(
  phone,
  params = {
    conferencePartiesCount: 3,
  },
) {
  await Promise.all(
    phone.webphone.sessions.map((session) => phone.webphone.hold(session.id)),
  );
  const conferenceBodyData = getConferenceCallBody(
    params.conferencePartiesCount,
  );
  /* mock data */
  mock.device(deviceBody);
  const conferenceSession = await makeConferenceCall(phone);
  conferenceSession.trigger('accepted', {});
  const activeCallsBody = mockActiveCalls(phone.webphone.sessions, []);
  mockGeneratePresenceApi({
    activeCalls: activeCallsBody,
  });
  mockGeneratePresenceUpdateApi({
    activeCalls: activeCallsBody,
  });
  mockGenerateActiveCallsApi({
    sessions: phone.webphone.sessions,
  });
  mock.activeCalls(activeCallsBody);
  await phone.subscription.subscribe([
    '/restapi/v1.0/account/~/extension/~/presence',
  ]);
  await sleep(100);
  await mockPresencePubnub(activeCallsBody);
  /* mock redux data */
  if (phone.conferenceCall.setConferencesState) {
    // v2
    phone.conferenceCall.setConferencesState({
      ...phone.conferenceCall.conferences,
      [conferenceBodyData.id]: {
        conference: conferenceBodyData,
        sessionId: conferenceSession.id,
        profiles: [],
      },
    });
    phone.conferenceCall.setCurrentConferenceId(conferenceBodyData.id);
  } else {
    phone.store.dispatch({
      type: phone.conferenceCall.actionTypes.makeConferenceSucceeded,
      conference: conferenceBodyData,
      sessionId: conferenceSession.id,
      parties: [],
    });
    phone.store.dispatch({
      type: phone.conferenceCall.actionTypes.updateCurrentConferenceId,
      conferenceId: conferenceBodyData.id,
    });
  }
  /* update session status */
  conferenceSession.accept(phone.webphone.acceptOptions);
  /* HACK: Force the CallCtrlPage layout refresh to callCtrlLayouts.conferenceCtrl */
  phone.routerInteraction.push('/dialer');
  phone.routerInteraction.push('/calls/active');
  return conferenceSession;
}
export function removeParticipant(phone, partyId) {
  if (!partyId) {
    return null;
  }
  const conferenceBody = JSON.parse(
    JSON.stringify(
      Object.values(phone.conferenceCall.conferences)[0].conference,
    ),
  );
  const newConferenceParties = conferenceBody.parties.map(
    (item, index, arr) => {
      if (item.id === partyId) {
        item.status = { code: 'Disconnected' };
      }
      return item;
    },
  );
  conferenceBody.parties = newConferenceParties;
  return conferenceBody;
}
