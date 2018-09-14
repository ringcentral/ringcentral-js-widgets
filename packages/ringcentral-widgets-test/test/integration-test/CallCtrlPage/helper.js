import actionTypes from 'ringcentral-integration/modules/ConferenceCall/actionTypes';
import * as mock from 'ringcentral-integration/integration-test/mock';
import prefix from 'ringcentral-widgets-demo/dev-server/prefix';

import getConferenceCallBody from './data/getConferenceCall';
import deviceBody from './data/device';
import {
  makeCall,
  mockActiveCalls,
  makeConferenceCall,
  mockGeneratePresenceApi,
  mockDetailedPresencePubnub,
  mockGenerateActiveCallsApi,
  mockGeneratePresenceUpdateApi
} from '../../support/callHelper';
import { timeout } from '../shared';

export async function makeOutboundCall(phone) {
  mock.device(deviceBody);
  for (const session of phone.webphone.sessions) {
    await phone.webphone.hold(session.id);
  }
  const outboundSession = await makeCall(phone);
  return outboundSession;
}

export async function updateConferenceCallEnv(phone, {
  conferencePartiesCount,
  conferenceCallBody
}) {
  const currentConference =
    phone.conferenceCall.conferences[phone.conferenceCall.currentConferenceId];
  const conferenceBodyData = conferencePartiesCount
    ? getConferenceCallBody(conferencePartiesCount) : conferenceCallBody;
  phone.store.dispatch({
    type: `${prefix}-${actionTypes.updateConferenceSucceeded}`,
    conference: conferenceBodyData,
    sessionId: currentConference.sessionId,
  });
}

export async function mockConferenceCallEnv(phone, params = {
  conferencePartiesCount: 3
}) {
  for (const session of phone.webphone.sessions) {
    await phone.webphone.hold(session.id);
  }
  const conferenceBodyData = getConferenceCallBody(params.conferencePartiesCount);
  /* mock data */
  mock.device(deviceBody);
  const conferenceSession = await makeConferenceCall(phone);
  const activeCallsBody = mockActiveCalls(phone.webphone.sessions, []);
  mockGeneratePresenceApi({
    activeCalls: activeCallsBody
  });
  mockGeneratePresenceUpdateApi({
    activeCalls: activeCallsBody
  });
  mockGenerateActiveCallsApi({
    sessions: phone.webphone.sessions
  });
  mock.activeCalls(activeCallsBody);
  await phone.subscription.subscribe(['/account/~/extension/~/presence'], 10);
  await timeout(100);
  await mockDetailedPresencePubnub(activeCallsBody);
  /* mock redux datas */
  phone.store.dispatch({
    type: `${prefix}-${actionTypes.makeConferenceSucceeded}`,
    conference: conferenceBodyData,
    sessionId: conferenceSession.id,
    parties: [],
  });
  phone.store.dispatch({
    type: `${prefix}-${actionTypes.updateCurrentConferenceId}`,
    conferenceId: conferenceBodyData.id,
  });
  /* update session status */
  conferenceSession.accept(phone.webphone.acceptOptions);
  /* HACK: Force the CallCtrlPage layout refresh to callCtrlLayouts.conferenceCtrl */
  phone.routerInteraction.push('/dialer');
  phone.routerInteraction.push('/calls/active');
  return conferenceSession;
}
