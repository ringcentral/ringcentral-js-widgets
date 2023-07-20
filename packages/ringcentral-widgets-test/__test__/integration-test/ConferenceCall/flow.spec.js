import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import updateConferenceCallBody from '@ringcentral-integration/commons/integration-test/mock/data/updateConference.json';
import { sleep } from '@ringcentral-integration/commons/utils';
import ActiveCallButton from '@ringcentral-integration/widgets/components/ActiveCallButton';
import { ActiveCallItem } from '@ringcentral-integration/widgets/components/ActiveCallItemV2';
import ActiveCallPad from '@ringcentral-integration/widgets/components/ActiveCallPad';
import ConferenceInfo from '@ringcentral-integration/widgets/components/ActiveCallPanel/ConferenceInfo';
import MergeInfo from '@ringcentral-integration/widgets/components/ActiveCallPanel/MergeInfo';
import CallsOnholdPanel from '@ringcentral-integration/widgets/components/CallsOnholdPanel';
import CircleButton from '@ringcentral-integration/widgets/components/CircleButton';
import ConfirmMergeModal from '@ringcentral-integration/widgets/components/ConfirmMergeModal';
import DialerPanel from '@ringcentral-integration/widgets/components/DialerPanel';

import {
  CONFERENCE_SESSION_ID,
  makeCall,
  mockActiveCalls,
  mockPresencePubnub,
} from '../../support/callHelper';
import { mockConferenceCallEnv } from '../CallCtrlPage/helper';
import { initPhoneWrapper, tearDownWrapper } from '../shared';
import deviceBody from './data/device.json';

beforeEach(async () => {
  jest.setTimeout(64000);
});

async function enterToNumber(domInput, number) {
  domInput.instance().value = number;
  await domInput.simulate('change');
}

async function updateCallMonitorCalls(phone) {
  const activeCallsBody = mockActiveCalls(phone.webphone.sessions, []);
  mock.activeCalls(activeCallsBody);
  await phone.subscription.subscribe(
    ['/restapi/v1.0/account/~/extension/~/presence'],
    10,
  );
  await sleep(100);
  await mockPresencePubnub(activeCallsBody);
}

async function dialAnotherOutboundCall(phone, wrapper) {
  /* mock data */
  mock.numberParser();
  mock.numberParserV2();
  mock.device(deviceBody);
  for (const session of phone.webphone.sessions) {
    await phone.webphone.hold(session.id);
  }
  /* click action */
  const domInput = wrapper.find(DialerPanel).find('input');
  enterToNumber(domInput, '987654321');
  const callButton = wrapper.find(DialerPanel).find('.callBtn').first();
  callButton.find(CircleButton).find('g').simulate('click');
  await sleep(100);
  const webphoneSession =
    phone.webphone._webphone.userAgent.sessions[
      phone.webphone.activeSession.id
    ];
  webphoneSession.trigger('accepted', {});
  /* pubnub push message */
  await updateCallMonitorCalls(phone);
  wrapper.update();
  return phone.webphone.activeSession;
}

async function clickMergeButtonIn(wrapper, phone, pageName) {
  /* mock data */
  mock.updateConferenceCall(
    updateConferenceCallBody.id,
    updateConferenceCallBody,
  );
  mock.conferenceCallBringIn(CONFERENCE_SESSION_ID);
  mock.device(deviceBody, false);
  mock.conferenceCall();
  mock.numberParserV2();
  let confirmMergeButton = null;
  let mergeButton = null;
  let callItem = null;
  /* click action */
  switch (pageName) {
    case 'OnholdPage':
      expect(wrapper.find(CallsOnholdPanel).find(ActiveCallItem)).toHaveLength(
        1,
      );
      callItem = wrapper.find(CallsOnholdPanel).find(ActiveCallItem).first();
      mergeButton = callItem.find('.webphoneButton').first();
      mergeButton.find(CircleButton).find('g').simulate('click');
      await sleep(100);
      break;
    case 'SimplifiedCallCtrlPage':
      mergeButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
      mergeButton.find(CircleButton).find('g').simulate('click');
      await sleep(100);
      break;
    case 'NormalCallCtrlPage':
      mergeButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
      mergeButton.find(CircleButton).find('g').simulate('click');
      await sleep(100);
      wrapper.update();
      confirmMergeButton = wrapper.find(ConfirmMergeModal).find(CircleButton);
      confirmMergeButton.find('g').simulate('click');
      await sleep(100);
      break;
    default:
      console.error('pageName might be error');
      return;
  }
  /* manual terminate normal session, accept conference session */
  phone.webphone.sessions.forEach((x) => {
    const session = phone.webphone._sessions.get(x.id);
    if (!session.isConferenceSession()) {
      session.terminate();
      session.reject();
    }
  });
  await sleep(1000);
  const conferenceSessionId = Object.values(phone.conferenceCall.conferences)[0]
    .sessionId;
  const conferenceSession = phone.webphone._sessions.get(conferenceSessionId);
  conferenceSession.accept(phone.webphone.acceptOptions);
  await sleep(1000);
  wrapper.update();
}

describe.skip('Merge Call Flow: Conference Call Ctrl -> click Merge -> on hold list', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + active conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeCall(phone, undefined, 'connected');
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf(
        '/conferenceCall/callsOnhold',
      ),
    ).toBe(0);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await makeCall(phone, undefined, 'connected');
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf(
        '/conferenceCall/callsOnhold',
      ),
    ).toBe(0);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
});

describe('Merge Call Flow: Conference Call Ctrl -> click Merge -> dialer', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer'),
    ).toBe(0);
    // make another call
    const anotherSession = await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe(
      `/calls/active/${anotherSession.id}`,
    );
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCINT-8377 Active Conference Call when merged(active outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer'),
    ).toBe(0);
    // make another call
    const anotherSession = await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe(
      `/calls/active/${anotherSession.id}`,
    );
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
});

describe('Merge Call Flow: Normal Call Ctrl -> click Merge -> popup', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'NormalCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCINT-8377 Active Conference Call when merged(active outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'NormalCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
});

describe('Add Call Flow: Normal Call Ctrl -> click Add -> dialer', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + active outbound):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeCall(phone, undefined, 'connected');
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer'),
    ).toBe(0);
    // make another call
    const anotherSession = await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe(
      `/calls/active/${anotherSession.id}`,
    );
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld outbound)-1', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await makeCall(phone, undefined, 'connected');
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer'),
    ).toBe(0);
    // make another call
    const anotherSession = await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe(
      `/calls/active/${anotherSession.id}`,
    );
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
});

describe('Add Call Flow: Normal Call Ctrl -> click Add -> on hold list', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + active outbound):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const sessionA = await makeCall(phone);
    const sessionB = await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf(
        '/conferenceCall/callsOnhold',
      ),
    ).toBe(0);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld outbound)-2', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    const sessionA = await makeCall(phone);
    const sessionB = await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await sleep(100);
    expect(
      phone.routerInteraction.currentPath.indexOf(
        '/conferenceCall/callsOnhold',
      ),
    ).toBe(0);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
});
