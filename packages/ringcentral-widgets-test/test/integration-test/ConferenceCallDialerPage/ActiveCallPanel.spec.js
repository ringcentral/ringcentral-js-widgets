import * as mock from 'ringcentral-integration/integration-test/mock';
import { CallCtrlPage } from 'ringcentral-widgets/containers/CallCtrlPage';
import MergeInfo from 'ringcentral-widgets/components/ActiveCallPanel/MergeInfo';
import CallAvatar from 'ringcentral-widgets/components/CallAvatar';
import DurationCounter from 'ringcentral-widgets/components/DurationCounter';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import deviceBody from './data/device';
import activeCallsBody from './data/activeCalls';
import extensionListBody from './data/extension';
import conferenceCallBody from './data/conferenceCall';
import conferenceCallBringInBody from './data/conferenceCallBringIn';
import conferenceUpdate from './data/conferenceUpdate';
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
  mock.reset();
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
}

async function mockSub(ttl = 2500) {
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
  await phone.subscription.subscribe(['/account/~/extension/~/presence']);
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
      expect(phone.routerInteraction.currentPath).toEqual('/conferenceCall/mergeCtrl');
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
  // test('#3 && #4 user makes a conference call then make an outbound call, then hangup', async () => {
  //   // expect.assertions(1);
  //   await mockContacts();
  //   contactA = phone.contacts.allContacts.find(item => item.type === 'company');
  //   contactB = phone.contacts.allContacts.find(item => item.type === 'company');
  //   await mockAddCall(contactA, contactB);
  //   await mock.updateConferenceCall(conferenceCallBody.id, conferenceUpdate);
  //   await mock.conferenceCallBringIn(conferenceCallBody.id);
  //   await mock.terminateConferenceCall(conferenceCallBody.id);
  //   expect(phone.routerInteraction.currentPath).toEqual('/conferenceCall/mergeCtrl');
  //   await mock.conferenceCall();
  //   const callCtrlPage = wrapper.find(CallCtrlPage);
  //   const sessionId = phone.webphone.activeSession.id;
  //   callCtrlPage.props().onMerge(sessionId);
  //   const fromSessionId = phone.conferenceCall.state.mergingPair.fromSessionId;
  //   const fromSession = phone.webphone._sessions.get(fromSessionId);
  //   const toSessionId = phone.conferenceCall.state.mergingPair.toSessionId;
  //   const toSession = phone.webphone._sessions.get(toSessionId);
  //   toSession.terminate();
  //   fromSession.terminate();
  //   await timeout(1000);
  //   toSession.reject();
  //   fromSession.reject();
  //   await timeout(1000);
  //   const conferenceSessionId = Object.values(phone.conferenceCall.conferences)[0].sessionId;
  //   const conferenceSession = phone.webphone._sessions.get(conferenceSessionId);
  //   conferenceSession.accept();
  //   await timeout(2000);
  //   const conferenceId = Object.values(phone.conferenceCall.conferences)[0].conference.id;
  //   expect(phone.routerInteraction.currentPath).toEqual(`/calls/active/${conferenceSessionId}`);
  //   callCtrlPage.props().onAdd(conferenceSessionId);
  //   await timeout(500);
  //   expect(phone.routerInteraction.currentPath).toEqual(`/conferenceCall/dialer/${conferenceSession.fromNumber}`);
  //   call({
  //     phoneNumber: contactA.phoneNumbers[0].phoneNumber,
  //   });
  //   await timeout(1000);
  //   await mockSub(1000);
  //   await timeout(5000);
  //   expect(phone.routerInteraction.currentPath).toEqual('/conferenceCall/mergeCtrl');
  //   wrapper.update();
  //   const mergeInfo = wrapper.find(MergeInfo);
  //   expect(mergeInfo).toHaveLength(1);
  //   expect(mergeInfo.find('.callee_name').text()).toEqual('Conference Call');
  //   expect(mergeInfo.find('.callee_status').text()).toEqual('On Hold');
  //   await phone.webphone.hangup(conferenceSessionId);
  //   phone.webphone._updateSessions();
  //   await timeout(3000);
  //   wrapper.update();
  //   expect(mergeInfo.find('.callee_status').text()).toEqual('Disconnected');
  //   await timeout(2000);
  //   expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  // });
});
