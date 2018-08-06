import * as mock from 'ringcentral-integration/integration-test/mock';
import { CallCtrlPage } from 'ringcentral-widgets/containers/CallCtrlPage';
import MergeInfo from 'ringcentral-widgets/components/ActiveCallPanel/MergeInfo';
import CallAvatar from 'ringcentral-widgets/components/CallAvatar';
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
  const sessionA = phone.webphone._sessions.values().next().value;
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

      const callinfo = wrapper.find(MergeInfo);
      expect(callinfo).toHaveLength(1);

      const {
        currentCallAvatarUrl,
        currentCallTitle,
        lastCallInfo
      } = callinfo.props();

      expect(lastCallInfo.calleeType).toEqual('calleeTypes-contacts');
      // TODO: mock contacts avatar
      // const callAvatar = callinfo.find(CallAvatar).first();
      // expect(callAvatar.props().avatarUrl).toEqual('avatarUrl');
      expect(currentCallAvatarUrl).toBeNull();
      expect(currentCallTitle).toEqual('Unknown');
    });
});
