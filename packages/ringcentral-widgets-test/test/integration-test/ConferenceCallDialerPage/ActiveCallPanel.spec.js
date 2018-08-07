import * as mock from 'ringcentral-integration/integration-test/mock';
import { CallCtrlPage } from 'ringcentral-widgets/containers/CallCtrlPage';
import MergeInfo from 'ringcentral-widgets/components/ActiveCallPanel/MergeInfo';
import CallAvatar from 'ringcentral-widgets/components/CallAvatar';
import DurationCounter from 'ringcentral-widgets/components/DurationCounter';
import deviceBody from './data/device';
import activeCallsBody from './data/activeCalls';
import extensionListBody from './data/extension';
import conferenceCallBody from './data/conferenceCall';
import conferenceCallBringInBody from './data/conferenceCallBringIn';

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

async function mockSub() {
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
  await timeout(2500);
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
}

async function mockContacts() {
  mock.extensionList(extensionListBody);
  await phone.accountExtension.fetchData();
}

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

describe('RCI-1071: simplified call control page', () => {
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

      const mergeInfo = wrapper.find(MergeInfo);
      expect(mergeInfo).toHaveLength(1);

      const callAvatarA = mergeInfo.find(CallAvatar).at(0);
      const callAvatarB = mergeInfo.find(CallAvatar).at(1);
      // TODO: mock contacts avatar
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

    const mergeInfo = wrapper.find(MergeInfo);
    expect(mergeInfo).toHaveLength(1);

    const callAvatarA = mergeInfo.find(CallAvatar).at(0);
    const callAvatarB = mergeInfo.find(CallAvatar).at(1);
    const domCalleeStatus = mergeInfo.find('.callee_status');
    // TODO: mock contacts avatar
    // expect(callAvatarA.props().avatarUrl).toEqual('');
    expect(mergeInfo.find('.callee_name').text()).toEqual(contactA.name);
    expect(domCalleeStatus.text()).toEqual('Disconnected');
    expect(domCalleeStatus.props().className).toContain('callee_status_disconnected');
    expect(callAvatarB.props().avatarUrl).toBeNull();
    expect(mergeInfo.find('.callee_name_active').text()).toEqual('Unknown');
    expect(mergeInfo.find(DurationCounter)).toHaveLength(1);
  })
});
