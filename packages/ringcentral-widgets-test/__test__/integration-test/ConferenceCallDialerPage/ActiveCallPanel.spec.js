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
  jest.setTimeout(64000);
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
    toInput.props().onChange({ currentTarget: { value: 'Something1 New1' } });
    await phone.contactSearch.search({ searchString: 'Something1 New1' });
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
