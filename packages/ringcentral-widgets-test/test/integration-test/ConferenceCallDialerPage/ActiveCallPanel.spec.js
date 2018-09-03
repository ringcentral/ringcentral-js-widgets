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
import { getWrapper, timeout } from '../shared';
import {
  mockGeneratePresenceApi,
  mockGeneratePresenceUpdateApi,
  mockGenerateActiveCallsApi,
  mockPubnub,
  generateActiveCallsData
} from './helper.js';

let wrapper = null;
let phone = null;

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  phone = wrapper.props().phone;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => { };
  phone.webphone._connect = () => { };

  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
});

async function call({
  phoneNumber,
  fromNumber
}) {
  mock.numberParser();
  mock.device(deviceBody, false);
  await phone.dialerUI.call({ phoneNumber, fromNumber });
  await timeout(500);
  wrapper.update();
  const currentSessionId = phone.webphone.activeSession.id;
  const currentSession = await phone.webphone._sessions.get(currentSessionId);
  currentSession.accept(incomingResponse);
}

async function mockSub(ttl = 100) {
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

async function mockAddCall(contactA, contactB) {
  await call({
    phoneNumber: contactA.phoneNumbers[0].phoneNumber
  });
  const sessionA = phone.webphone.sessions[0];
  await phone.webphone.hold(sessionA.id);
  const callCtrlPage = wrapper.find(CallCtrlPage);
  await callCtrlPage.props().onAdd(sessionA.id);
  await call({
    phoneNumber: contactB.phoneNumbers[0].phoneNumber,
    fromNumber: contactB.phoneNumbers[0].phoneNumber,
  });
  await mockSub();
  wrapper.update();
  await timeout(1000);
}

async function mockContacts() {
  mock.extensionList(extensionListBody);
  await phone.accountExtension.fetchData();
}
async function mockStartConference() {
  // HACK: `updateConference` should be mock at mockForLogin func.
  // mock.updateConferenceCall(conferenceUpdate.id, conferenceUpdate);
  mock.conferenceCallBringIn(conferenceCallBody.id);
  mock.terminateConferenceCall(conferenceCallBody.id);
  mock.conferenceCall();
  let contactA;
  let contactB;
  await mockContacts();
  contactA = phone.contacts.allContacts.find(item => item.type === 'company');
  contactB = phone.contacts.allContacts.find(item => item.type === 'company');
  await mockAddCall(contactA, contactB);
  expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  wrapper.update();
  const callCtrlPage = wrapper.find(CallCtrlPage);
  const sessionId = phone.webphone.activeSession.id;
  callCtrlPage.props().onMerge(sessionId);
  const fromSessionId = phone.conferenceCall.state.mergingPair.fromSessionId;
  const fromSession = phone.webphone._sessions.get(fromSessionId);
  const toSessionId = phone.conferenceCall.state.mergingPair.toSessionId;
  const toSession = phone.webphone._sessions.get(toSessionId);
  toSession.terminate();
  fromSession.terminate();
  await timeout(1000);
  toSession.reject();
  fromSession.reject();
  await timeout(1000);
  const conferenceSessionId = Object.values(phone.conferenceCall.conferences)[0].sessionId;
  const conferenceSession = phone.webphone._sessions.get(conferenceSessionId);
  conferenceSession.accept();
  await timeout(2000);
  wrapper.update();
}
describe('RCI-1071: simplified call control page #3', () => {
  let contactA = null;
  let contactB = null;

  test('#1 Check the Simplified Call control page'
    , async () => {
      // Prepare: Contacts has a internal contact with avatar and a external contact without avatar
      await mockContacts();
      contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
      contactB = phone.contacts.allContacts.find(item => item.type === 'personal' && !item.hasProfileImage);

      await mockAddCall(contactA, contactB);
      expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
      await timeout(3000);
      const mergeInfo = wrapper.find(MergeInfo);
      expect(mergeInfo).toHaveLength(1);

      const callAvatarA = mergeInfo.find(CallAvatar).at(0);
      const callAvatarB = mergeInfo.find(CallAvatar).at(1);
      // TODO: mock contactsA's data
      // expect(callAvatar.props().avatarUrl).toEqual('avatarUrl');
      expect(mergeInfo.find('.callee_name').text()).toEqual(contactA.name);
      expect(mergeInfo.find('.callee_status').text()).toEqual('On Hold');
      expect(callAvatarB.props().avatarUrl).toBeNull();
      expect(mergeInfo.find('.callee_name_active').text()).toEqual('Unknown');
      expect(mergeInfo.find(DurationCounter)).toHaveLength(1);
    });
  test('#2 Contact A hangs up the call', async () => {
    await mockContacts();
    contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
    contactB = phone.contacts.allContacts.find(item => item.type === 'personal' && !item.hasProfileImage);
    await mockAddCall(contactA, contactB);
    const sessionId = phone.webphone.sessions[1].id;
    const sessionA = phone.webphone._sessions.get(sessionId);
    sessionA.terminate();
    wrapper.update();
    await timeout(3000);

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
    expect(mergeInfo.find('.callee_name_active').text()).toEqual('Unknown');
    expect(mergeInfo.find(DurationCounter)).toHaveLength(1);
  });
  test('#3 && #4 user makes a conference call then make an outbound call, then hangup', async () => {
    await mockStartConference();
    const conferenceSessionId = Object.values(phone.conferenceCall.conferences)[0].sessionId;
    const conferenceSession = phone.webphone.sessions.find(x => x.id === conferenceSessionId);
    const conferenceId = Object.values(phone.conferenceCall.conferences)[0].conference.id;
    expect(phone.routerInteraction.currentPath.indexOf('/calls/active')).toEqual(0);
    const callCtrlPage = wrapper.find(CallCtrlPage);
    callCtrlPage.props().onAdd(conferenceSessionId);
    await timeout(500);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual(`/conferenceCall/dialer/${conferenceSession.fromNumber}/${conferenceSession.id}`);
    call({
      phoneNumber: contactA.phoneNumbers[0].phoneNumber,
    });
    await timeout(1000);
    await mockSub(1000);
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
  let contactA = null;
  let contactB = null;
  test('#5 User make an outbound call', async () => {
    await mockContacts();
    contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
    contactB = phone.contacts.allContacts.find(item => item.type === 'personal' && !item.hasProfileImage);
    await mockAddCall(contactA, contactB);
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
    await mockStartConference();
    phone.routerInteraction.push('/settings/calling');
    wrapper.update();
    const calling = wrapper.find(DropdownSelect);
    expect(calling.props().disabled).toBe(true);
  });
});

describe('RCI-1710156: Call control add call flow', () => {
  let contactA;
  let contactB;
  test('#1 User make an outbound call', async () => {
    await mockContacts();
    contactA = phone.contacts.allContacts.find(item => item.type === 'company' && item.hasProfileImage);
    contactB = phone.contacts.allContacts.find(item => item.type === 'personal' && !item.hasProfileImage);
    const phoneNumber = contactA.phoneNumbers[0].phoneNumber;
    call({
      phoneNumber,
    });
    await timeout(100);
    await mockSub();
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
