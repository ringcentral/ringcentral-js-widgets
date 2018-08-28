import actionTypes from 'ringcentral-integration/modules/ConferenceCall/actionTypes';
import * as mock from 'ringcentral-integration/integration-test/mock';
import prefix from 'ringcentral-widgets-demo/dev-server/prefix';

import { makeCall } from '../../support/callHelper';
import conferenceCallBody from './data/conferenceCall.json';
import deviceBody from './data/device';

import {
  mockActiveCalls,
  makeConferenceCall,
  mockGeneratePresenceApi,
  mockDetailedPresencePubnub,
  mockGenerateActiveCallsApi,
  mockGeneratePresenceUpdateApi
} from '../../support/callHelper';
import { timeout } from '../shared';

export async function makeOutboundCall(wrapper, phone) {
  mock.device(deviceBody);
  const session = await makeCall(phone);
  wrapper.update();
  return session;
}

export async function mockConferenceCallEnv(phone) {
  /* mock data */
  mock.device(deviceBody);
  const conferenceSession = await makeConferenceCall(phone);
  const activeCallsBody = mockActiveCalls([conferenceSession], []);
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
    conference: conferenceCallBody,
    sessionId: conferenceSession.id,
    parties: [],
  });
  /* update session status */
  conferenceSession.accept(phone.webphone.acceptOptions);
  return conferenceSession;
}
