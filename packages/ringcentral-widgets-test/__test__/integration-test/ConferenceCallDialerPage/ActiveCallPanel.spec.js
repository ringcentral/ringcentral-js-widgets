import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { sleep, waitUntilTo } from '@ringcentral-integration/commons/utils';
import ActiveCallButton from '@ringcentral-integration/widgets/components/ActiveCallButton';
import ActiveCallPad from '@ringcentral-integration/widgets/components/ActiveCallPad';
import BackButton from '@ringcentral-integration/widgets/components/BackButton';
import BackHeader from '@ringcentral-integration/widgets/components/BackHeader';
import CircleButton from '@ringcentral-integration/widgets/components/CircleButton';
import FromField from '@ringcentral-integration/widgets/components/FromField';

import {
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
  await phone.subscription.subscribe([
    '/restapi/v1.0/account/~/extension/~/presence',
  ]);
  await sleep(100);
  await mockPresencePubnub(activeCallsBody);
}

async function mockContacts(phone) {
  mock.companyContactList(extensionsListBody);
  await phone.companyContacts.fetchData();
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
