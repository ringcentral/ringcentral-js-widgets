import * as mock from 'ringcentral-integration/integration-test/mock';
import { CallCtrlPage } from 'ringcentral-widgets/containers/CallCtrlPage';
import MergeInfo from 'ringcentral-widgets/components/ActiveCallPanel/MergeInfo';
import CallAvatar from 'ringcentral-widgets/components/CallAvatar';
import DurationCounter from 'ringcentral-widgets/components/DurationCounter';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad/';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import CombinIcon from 'ringcentral-widgets/assets/images/Combine.svg';
import Answer from 'ringcentral-widgets/assets/images/Answer.svg';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import FromField from 'ringcentral-widgets/components/FromField';
import BackHeader from 'ringcentral-widgets/components/BackHeader';
import BackButton from 'ringcentral-widgets/components/BackButton';
import RecipientsInput from 'ringcentral-widgets/components/RecipientsInput';
import ContactDropdownList from 'ringcentral-widgets/components/ContactDropdownList';
import ContactItem from 'ringcentral-widgets/components/ContactItem';
import LinkLine from 'ringcentral-widgets/components/LinkLine';
import DropdownSelect from 'ringcentral-widgets/components/DropdownSelect';
import deviceBody from './data/device';
import activeCallsBody from './data/activeCalls';
import extensionListBody from './data/extension';
import conferenceCallBody from './data/conferenceCall';
import conferenceCallBringInBody from './data/conferenceCallBringIn';
import incomingResponse from './data/incomingResponse';
import numberParser from './data/numberParser';
import { initPhoneWrapper, timeout } from '../shared';
import {
  mockGeneratePresenceApi,
  mockGeneratePresenceUpdateApi,
  mockGenerateActiveCallsApi,
  mockPubnub,
  generateActiveCallsData
} from './helper.js';

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

async function call(phone, wrapper, {
  phoneNumber,
  fromNumber
}) {
  mock.numberParser(numberParser, false);
  mock.device(deviceBody, false);
  await phone.dialerUI.call({ phoneNumber, fromNumber });
  await timeout(500);
  wrapper.update();
  const currentSessionId = phone.webphone.activeSession.id;
  const currentSession = await phone.webphone._sessions.get(currentSessionId);
  currentSession.accept(incomingResponse);
}

async function mockSub(phone, ttl = 100) {
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
  await mockPubnub({
    activeCalls
  });
}

async function mockAddCall(phone, wrapper, contactA, contactB) {
  await call(phone, wrapper, {
    phoneNumber: contactA.phoneNumbers[0].phoneNumber
  });
  const sessionA = phone.webphone.sessions[0];
  debugger;
  await phone.webphone.hold(sessionA.id);
  const callCtrlPage = wrapper.find(CallCtrlPage);
  await callCtrlPage.props().onAdd(sessionA.id);
  await call(phone, wrapper, {
    phoneNumber: contactB.phoneNumbers[0].phoneNumber,
  });
  await mockSub(phone);
  wrapper.update();
  await timeout(1000);
}

async function mockContacts(phone) {
  mock.extensionList(extensionListBody);
  await phone.accountExtension.fetchData();
}

async function mockStartConference(phone, wrapper) {
  mock.conferenceCallBringIn(conferenceCallBody.id);
  mock.terminateConferenceCall(conferenceCallBody.id);
  mock.conferenceCall();
  await mockContacts(phone);
  const contactA = phone.contacts.allContacts.find(item => item.type === 'company');
  const contactB = phone.contacts.allContacts.find(item => item.type === 'company');
  await mockAddCall(phone, wrapper, contactA, contactB);
  expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  wrapper.update();
  const callCtrlPage = wrapper.find(CallCtrlPage);
  const mergeButton = callCtrlPage.find(CircleButton).at(3);
  mergeButton.simulate('click');
  const fromSessionId = phone.conferenceCall.state.mergingPair.fromSessionId;
  const fromSession = phone.webphone._sessions.get(fromSessionId);
  const toSessionId = phone.conferenceCall.state.mergingPair.toSessionId;
  const toSession = phone.webphone._sessions.get(toSessionId);
  toSession.terminate();
  fromSession.terminate();
  await timeout(100);
  toSession.reject();
  fromSession.reject();
  await timeout(100);
  const conferenceSessionId = Object.values(phone.conferenceCall.conferences)[0].sessionId;
  const conferenceSession = phone.webphone._sessions.get(conferenceSessionId);
  conferenceSession.accept();
  await timeout(200);
  wrapper.update();
}

describe('RCI-1071: simplified call control page #3', () => {
  test('#1 Check the Simplified Call control page'
    , async () => {
      const { wrapper, phone } = await initPhoneWrapper({ mockNumberParser: false, mockRecentActivity: true });
      // Prepare: Contacts has a internal contact with avatar and a external contact without avatar
      await mockContacts(phone);
      const contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
      await mockAddCall(phone, wrapper, contactA, contactA);
      debugger;
      expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
      await timeout(300);
      const mergeInfo = wrapper.find(MergeInfo);
      expect(mergeInfo).toHaveLength(1);

      const callAvatarA = mergeInfo.find(CallAvatar).at(0);
      const callAvatarB = mergeInfo.find(CallAvatar).at(1);
      // TODO: mock contactsA's data
      // expect(callAvatar.props().avatarUrl).toEqual('avatarUrl');

      expect(mergeInfo.find('.callee_name').text()).toEqual(contactA.name);
      expect(mergeInfo.find('.callee_status').text()).toEqual('On Hold');
      expect(callAvatarB.props().avatarUrl).toBeNull();
      expect(mergeInfo.find('.callee_name_active').text()).toEqual(contactA.name);
      expect(mergeInfo.find(DurationCounter)).toHaveLength(1);
    });
  test('#2 Contact A hangs up the call', async () => {
    const { wrapper, phone } = await initPhoneWrapper({ mockNumberParser: false, mockRecentActivity: true });
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
    await mockAddCall(phone, wrapper, contactA, contactA);
    // debugger;
    const sessionId = phone.webphone.sessions[1].id;
    const sessionA = phone.webphone._sessions.get(sessionId);
    sessionA.terminate();
    wrapper.update();
    await timeout(300);

    const mergeInfo = wrapper.find(MergeInfo);
    expect(mergeInfo).toHaveLength(1);

    const callAvatarA = mergeInfo.find(CallAvatar).at(0);
    const callAvatarB = mergeInfo.find(CallAvatar).at(1);
    const domCalleeStatus = mergeInfo.find('.callee_status');
    // TODO: mock contactsA's data
    // expect(callAvatarA.props().avatarUrl).toEqual('');
    expect(mergeInfo.find('.callee_name').text()).toEqual(contactA.name);
    expect(domCalleeStatus.text()).toEqual('Disconnected');
    expect(domCalleeStatus.props().className).toContain('callee_status_disconnected');
    expect(callAvatarB.props().avatarUrl).toBeNull();
    expect(mergeInfo.find('.callee_name_active').text()).toEqual(contactA.name);
    expect(mergeInfo.find(DurationCounter)).toHaveLength(1);
  });
  test('#3 && #4 user makes a conference call then make an outbound call, then hangup', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    // Prepare: Contacts has a internal contact with avatar and a external contact without avatar
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
    await mockStartConference(phone, wrapper);
    phone.webphone._updateSessions();
    const conferenceSessionId = Object.values(phone.conferenceCall.conferences)[0].sessionId;
    const conferenceSession = phone.webphone.sessions.find(x => x.id === conferenceSessionId);
    const conferenceId = Object.values(phone.conferenceCall.conferences)[0].conference.id;
    expect(phone.routerInteraction.currentPath.indexOf('/calls/active')).toEqual(0);
    const callCtrlPage = wrapper.find(CallCtrlPage);
    const addButton = callCtrlPage.find(CircleButton).at(3);
    addButton.simulate('click');
    await timeout(500);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual(`/conferenceCall/dialer/${conferenceSession.fromNumber}/${conferenceSession.id}`);
    call(phone, wrapper, {
      phoneNumber: contactA.phoneNumbers[0].phoneNumber,
    });
    await timeout(1000);
    await mockSub(phone, 1000);
    await timeout(1000);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    wrapper.update();
    const mergeInfo = wrapper.find(MergeInfo);
    expect(mergeInfo).toHaveLength(1);
    expect(mergeInfo.find('.callee_name').text()).toEqual('Conference Call');
    expect(mergeInfo.find('.callee_status').text()).toEqual('On Hold');
    // FIXME: temporarily disable these lines.
    // await phone.webphone.hangup(conferenceSessionId);
    // await timeout(1000);
    // phone.webphone._updateSessions();

    // expect(mergeInfo.find('.callee_status').text()).toEqual('Disconnected');
  });
});

describe('RCI-1710156: Call control add call flow', () => {
  test('#5 User make an outbound call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
    await mockAddCall(phone, wrapper, contactA, contactA);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    const activeCallButtons = wrapper.find(ActiveCallPad).find(ActiveCallButton);
    expect(activeCallButtons.at(0).props().title).toEqual('Mute');
    expect(activeCallButtons.at(1).props().title).toEqual('Keypad');
    expect(activeCallButtons.at(2).props().title).toEqual('Hold');
    expect(activeCallButtons.at(3).props().title).toEqual('Merge');
    const hangupBtn = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(hangupBtn.props().className).toEqual('stopButton');
  });
});

describe('RCI-1710156: Call control add call flow #6&#7', () => {
  test('#6 && #7 User clicked Merge button then go to Settings ->Calling page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockStartConference(phone, wrapper);
    phone.routerInteraction.push('/settings/calling');
    wrapper.update();
    const calling = wrapper.find(DropdownSelect);
    expect(calling.props().disabled).toBe(true);
  });
});

describe('RCI-1710156: Call control add call flow', () => {
  test('#1 User make an outbound call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockContacts(phone);
    const contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
    const phoneNumber = contactA.phoneNumbers[0].phoneNumber;
    call(phone, wrapper, {
      phoneNumber,
    });
    await timeout(100);
    await mockSub(phone);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    const activeCallPad = wrapper.find(ActiveCallPad);
    expect(activeCallPad).toBeDefined();
    const buttons = activeCallPad.find(ActiveCallButton);
    const addButton = buttons.at(3);
    const addCircleButton = addButton.find(CircleButton);
    expect(addButton.find(CircleButton)).toHaveLength(1);
    expect(addButton.find('.buttonTitle').text()).toEqual('Add');
    // #2 user selected add button
    await timeout(400);
    addCircleButton.simulate('click');
    wrapper.update();
    const fromNumber = phone.webphone.activeSession.fromNumber;
    expect(phone.routerInteraction.currentPath).toEqual(`/conferenceCall/dialer/${fromNumber}/${phone.webphone.activeSession.id}`);
    expect(wrapper.find(FromField)).toHaveLength(0);
    expect(wrapper.find(BackHeader)).toHaveLength(1);
    expect(wrapper.find(BackButton).find('.backLabel').text()).toEqual('Active Call');
    // #3 User input SfB/<$brand> contact name in To field
    const toInput = wrapper.find(RecipientsInput).find("input[name='receiver']");
    expect(toInput).toHaveLength(1);
    toInput.props().onFocus();
    await phone.contactSearch.search({ searchString: 'Something1 New1' });
    toInput.props().onChange({ currentTarget: { value: 'Something1 New1' } });
    await timeout(100);
    wrapper.update();
    const dropdownList = wrapper.find(ContactDropdownList);
    expect(dropdownList.props().visibility).toBe(true);
    expect(dropdownList.props().items[0].name).toEqual('Something1 New1');
    // #4 TODO
  });
});
