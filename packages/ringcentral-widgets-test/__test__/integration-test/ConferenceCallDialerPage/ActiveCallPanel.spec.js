import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import updateConferenceCallBody from '@ringcentral-integration/commons/integration-test/mock/data/updateConference.json';
import { sleep, waitUntilTo } from '@ringcentral-integration/commons/utils';
import ActiveCallButton from '@ringcentral-integration/widgets/components/ActiveCallButton';
import ActiveCallPad from '@ringcentral-integration/widgets/components/ActiveCallPad';
import MergeInfo from '@ringcentral-integration/widgets/components/ActiveCallPanel/MergeInfo';
import BackButton from '@ringcentral-integration/widgets/components/BackButton';
import BackHeader from '@ringcentral-integration/widgets/components/BackHeader';
import CallAvatar from '@ringcentral-integration/widgets/components/CallAvatar';
import CircleButton from '@ringcentral-integration/widgets/components/CircleButton';
import DropdownSelect from '@ringcentral-integration/widgets/components/DropdownSelect';
import DurationCounter from '@ringcentral-integration/widgets/components/DurationCounter';
import FromField from '@ringcentral-integration/widgets/components/FromField';
import { CallCtrlContainer } from '@ringcentral-integration/widgets/containers/CallCtrlPage';

import {
  CONFERENCE_SESSION_ID,
  makeCall,
  mockActiveCalls,
  mockPresencePubnub,
} from '../../support/callHelper';
import { initPhoneWrapper, tearDownWrapper } from '../shared';
import extensionsListBody from './data/extensions.json';

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

async function call(phone, wrapper, phoneNumber) {
  const outboundSession = await makeCall(phone, {
    homeCountryId: '1',
    toNumber: phoneNumber,
    fromNumber: '+16505819954',
  });
  outboundSession.accept(phone.webphone.acceptOptions);
  await sleep(100);
  wrapper.update();
  return outboundSession;
}

async function mockSub(phone) {
  await waitUntilTo(() => {
    expect(phone.subscription._subscription._pubnub).not.toEqual(null);
  });
  const activeCallsBody = mockActiveCalls(phone.webphone.sessions, []);
  mock.activeCalls(activeCallsBody);
  await phone.subscription.subscribe(
    ['/restapi/v1.0/account/~/extension/~/presence'],
    10,
  );
  await sleep(100);
  await mockPresencePubnub(activeCallsBody);
}

async function mockAddCall(phone, wrapper, contactA, contactB) {
  const sessionA = await call(
    phone,
    wrapper,
    contactA.phoneNumbers[0].phoneNumber,
  );
  await phone.webphone.hold(sessionA.id);
  const callCtrlContainer = wrapper.find(CallCtrlContainer);
  await callCtrlContainer.props().onAdd(sessionA.id);
  const sessionB = await call(
    phone,
    wrapper,
    contactB.phoneNumbers[0].phoneNumber,
  );
  await mockSub(phone);
  wrapper.update();
  return {
    sessionA,
    sessionB,
  };
}

async function mockContacts(phone) {
  mock.companyContactList(extensionsListBody);
  await phone.companyContacts.fetchData();
}

async function mockStartConference(phone, wrapper) {
  mock.updateConferenceCall(
    updateConferenceCallBody.id,
    updateConferenceCallBody,
  );
  mock.conferenceCallBringIn(CONFERENCE_SESSION_ID);
  mock.terminateConferenceCall(CONFERENCE_SESSION_ID);
  mock.conferenceCall();
  mock.device();
  mock.numberParserV2();
  await mockContacts(phone);
  const contactA = phone.contacts.allContacts.find(
    (item) => item.type === 'company',
  );
  const contactB = phone.contacts.allContacts.find(
    (item) => item.type === 'company',
  );
  const { sessionB } = await mockAddCall(phone, wrapper, contactA, contactB);
  expect(phone.routerInteraction.currentPath).toEqual(
    `/calls/active/${sessionB.id}`,
  );
  wrapper.update();
  const mergeButton = wrapper.find(CallCtrlContainer).find(CircleButton).at(3);
  mergeButton.find('g').simulate('click');
  await sleep(100);
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

describe('Simplified Call Control Page:', () => {
  test('Check buttons in Conference Call Ctrl Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper({
      mockNumberParser: false,
      mockRecentActivity: true,
    });
    const contactA = phone.contacts.allContacts[0];
    await mockAddCall(phone, wrapper, contactA, contactA);
    wrapper.update();
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
    const buttons = wrapper.find(ActiveCallPad).find(ActiveCallButton);
    expect(buttons.at(0).text()).toEqual('Mute');
    expect(buttons.at(1).text()).toEqual('Keypad');
    expect(buttons.at(2).text()).toEqual('Hold');
    expect(buttons.at(3).text()).toEqual('Merge');
    expect(buttons.at(4).text()).toEqual('Record');
    expect(buttons.at(5).text()).toEqual('Call Actions');
    const handupButton = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    await tearDownWrapper(wrapper);
  });
});

describe('RCI-1071: simplified call control page #3', () => {
  test('#1 Check the merge info in Simplified Call control page', async () => {
    const { wrapper, phone } = await initPhoneWrapper({
      mockNumberParser: false,
      mockRecentActivity: true,
    });
    // Prepare: Contacts has a internal contact with avatar and a external contact without avatar
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(
      (item) => item.type === 'company' && item.hasProfileImage,
    );
    const { sessionB } = await mockAddCall(phone, wrapper, contactA, contactA);
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${sessionB.id}`,
    );
    await sleep(300);
    const mergeInfo = wrapper.find(MergeInfo);
    expect(mergeInfo).toHaveLength(1);

    const callAvatarB = mergeInfo.find(CallAvatar).at(1);
    // TODO: mock contactsA's data
    // expect(callAvatar.props().avatarUrl).toEqual('avatarUrl');

    expect(mergeInfo.find('.callee_name').text()).toEqual(contactA.name);
    expect(mergeInfo.find('.callee_status').text()).toEqual('On Hold');
    expect(callAvatarB.props().avatarUrl).toBeNull();
    expect(mergeInfo.find('.callee_name_active').text()).toEqual(contactA.name);
    expect(mergeInfo.find(DurationCounter)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('#2 Contact A hangs up the call', async () => {
    const { wrapper, phone } = await initPhoneWrapper({
      mockNumberParser: false,
      mockRecentActivity: true,
    });
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(
      (item) => item.type === 'company',
    );
    await mockAddCall(phone, wrapper, contactA, contactA);
    const sessionId = phone.webphone.sessions[1].id;
    const sessionA = phone.webphone._sessions.get(sessionId);
    sessionA.terminate();
    wrapper.update();
    await sleep(300);

    const mergeInfo = wrapper.find(MergeInfo);
    expect(mergeInfo).toHaveLength(1);

    const callAvatarB = mergeInfo.find(CallAvatar).at(1);

    const domCalleeStatus = mergeInfo.find('.callee_status');

    // TODO: mock contactsA's data
    // expect(callAvatarA.props().avatarUrl).toEqual('');
    expect(mergeInfo.find('.callee_name').text()).toEqual(contactA.name);
    expect(domCalleeStatus.text()).toEqual('Disconnected');
    expect(domCalleeStatus.props().className).toContain(
      'callee_status_disconnected',
    );
    expect(callAvatarB.props().avatarUrl).toBeNull();
    expect(mergeInfo.find('.callee_name_active').text()).toEqual(contactA.name);
    expect(mergeInfo.find(DurationCounter)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('#3 && #4 user makes a conference call then make an outbound call, then hangup', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    // Prepare: Contacts has a internal contact with avatar and a external contact without avatar
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(
      (item) => item.type === 'company' && item.hasProfileImage,
    );
    await mockStartConference(phone, wrapper);
    phone.webphone._updateSessions();
    const conferenceSessionId = Object.values(
      phone.conferenceCall.conferences,
    )[0].sessionId;
    const conferenceSession = phone.webphone.sessions.find(
      (x) => x.id === conferenceSessionId,
    );
    expect(
      phone.routerInteraction.currentPath.indexOf('/calls/active'),
    ).toEqual(0);
    const callCtrlContainer = wrapper.find(CallCtrlContainer);
    const addButton = callCtrlContainer.find(CircleButton).at(3);
    addButton.find('g').simulate('click');
    await sleep(500);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual(
      `/conferenceCall/dialer/${conferenceSession.fromNumber}/${conferenceSession.id}`,
    );
    const session = await call(
      phone,
      wrapper,
      contactA.phoneNumbers[0].phoneNumber,
    );
    await mockSub(phone);
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${session.id}`,
    );
    wrapper.update();
    const mergeInfo = wrapper.find(MergeInfo);
    expect(mergeInfo).toHaveLength(1);
    expect(mergeInfo.find('.callee_name').text()).toEqual('Conference Call');
    expect(mergeInfo.find('.callee_status').text()).toEqual('On Hold');
    // FIXME: temporarily disable these lines.
    // await phone.webphone.hangup(conferenceSessionId);
    // await sleep(1000);
    // phone.webphone._updateSessions();

    // expect(mergeInfo.find('.callee_status').text()).toEqual('Disconnected');
    await tearDownWrapper(wrapper);
  });
});

describe('RCI-1710156: Call control add call flow', () => {
  test('#5 User make an outbound call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(
      (item) => item.type === 'company' && item.hasProfileImage,
    );
    const { sessionB } = await mockAddCall(phone, wrapper, contactA, contactA);
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${sessionB.id}`,
    );
    const activeCallButtons = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton);
    expect(activeCallButtons.at(0).props().title).toEqual('Mute');
    expect(activeCallButtons.at(1).props().title).toEqual('Keypad');
    expect(activeCallButtons.at(2).props().title).toEqual('Hold');
    expect(activeCallButtons.at(3).props().title).toEqual('Merge');
    const hangupBtn = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(hangupBtn.props().className).toEqual('stopButton');
    await tearDownWrapper(wrapper);
  });
});

describe('RCI-1710156: Call control add call flow #6&#7', () => {
  test('#6 && #7 User clicked Merge button then go to Settings -> Calling page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockStartConference(phone, wrapper);
    phone.routerInteraction.push('/settings/calling');
    wrapper.update();
    const calling = wrapper.find(DropdownSelect);
    expect(calling.props().disabled).toBe(true);
    await tearDownWrapper(wrapper);
  });
});

describe('RCI-1710156: Call control add call flow', () => {
  test('#1 User make an outbound call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(
      (item) => item.type === 'company' && item.hasProfileImage,
    );
    const session = await call(
      phone,
      wrapper,
      contactA.phoneNumbers[0].phoneNumber,
    );
    await mockSub(phone);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${session.id}`,
    );
    const activeCallPad = wrapper.find(ActiveCallPad);
    expect(activeCallPad).toBeDefined();
    const buttons = activeCallPad.find(ActiveCallButton);
    const addButton = buttons.at(3);
    const addCircleButton = addButton.find(CircleButton);
    expect(addButton.find(CircleButton)).toHaveLength(1);
    expect(addButton.find('.buttonTitle').text()).toEqual('Add');
    // #2 user selected add button
    await sleep(400);
    addCircleButton.find('g').simulate('click');
    wrapper.update();
    const fromNumber = phone.webphone.activeSession.fromNumber;
    expect(phone.routerInteraction.currentPath).toEqual(
      `/conferenceCall/dialer/${fromNumber}/${phone.webphone.activeSession.id}`,
    );
    expect(wrapper.find(FromField)).toHaveLength(0);
    expect(wrapper.find(BackHeader)).toHaveLength(1);
    expect(wrapper.find(BackButton).find('.backLabel').text()).toEqual(
      'Active Call',
    );
    // #3 User input SfB/<$brand> contact name in To field
    const toInput = wrapper.find("input[name='receiver']");
    expect(toInput).toHaveLength(1);
    toInput.props().onFocus();
    await phone.contactSearch.search({ searchString: 'Something1 New1' });
    toInput.props().onChange({ currentTarget: { value: 'Something1 New1' } });
    await sleep(100);
    wrapper.update();
    const dropdownList = wrapper.find('DropdownList');
    expect(dropdownList.props().visibility).toBe(true);
    expect(dropdownList.props().recipientOptions[0].name).toEqual(
      'Something1 New1',
    );
    await tearDownWrapper(wrapper);
    // #4 TODO
  });
});
