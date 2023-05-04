import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import messageSyncBody from '@ringcentral-integration/commons/integration-test/mock/data/messageSync.json';
import { sleep } from '@ringcentral-integration/commons/utils';
import { ConversationsPanel } from '@ringcentral-integration/widgets/components/ConversationsPanel';
import MessageItem from '@ringcentral-integration/widgets/components/MessageItem';
import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import { SearchInput } from '@ringcentral-integration/widgets/components/SearchInput';

import { getWrapper, tearDownWrapper } from '../shared';
import { mockPubnub } from './helper';

let wrapper = null;
let panel = null;
let navigationBar = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/messages');
  wrapper.update();
  panel = wrapper.find(ConversationsPanel).first();
  const phone = wrapper.props().phone;
  Object.defineProperty(phone.appFeatures, 'hasReadFaxPermission', {
    value: true,
  });
  // Object.defineProperty(phone.tabManager, 'active', {
  //   value: true,
  // });

  mock.restore();
  mock.subscription();
  mock.messageSync({
    records: [
      {
        ...messageSyncBody.records[0],
        type: 'Fax',
        direction: 'Outbound',
        messageStatus: 'Delivered',
        to: {
          phoneNumber: '987654321',
          name: 'Colin Liu',
        },
        creationTime: new Date().toISOString(),
        lastModifiedTime: new Date().toISOString(),
      },
      {
        ...messageSyncBody.records[1],
        type: 'Fax',
        direction: 'Outbound',
        messageStatus: 'Delivered',
        to: {
          phoneNumber: '123456789',
          name: 'Samuel Huang',
        },
        creationTime: new Date().toISOString(),
        lastModifiedTime: new Date().toISOString(),
      },
    ],
  });
  mock.messageList();
  await phone.subscription.subscribe([
    '/restapi/v1.0/account/~/extension/~/message-sync',
  ]);

  await mockPubnub();
  navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/messages');
  await panel.find(NavigationBar).props().goTo('Fax');
  wrapper.update();
  panel = wrapper.find(ConversationsPanel).at(0);
});

afterEach(async () => {
  mock.logout();
  await tearDownWrapper(wrapper);
});

describe('messages', () => {
  test('search will not start when input less than two letters or two numbers', async () => {
    expect(panel.find(MessageItem).length).toEqual(2);
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'o';
    domInput.simulate('change');
    panel = wrapper.find(ConversationsPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('o');
    expect(panel.find(MessageItem).length).toEqual(2);

    domInput.instance().value = '34';
    domInput.simulate('change');
    panel = wrapper.find(ConversationsPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('34');
    expect(panel.find(MessageItem).length).toEqual(2);
  });
  test('search but no match', async () => {
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'olia';
    domInput.simulate('change');
    wrapper.update();
    panel = wrapper.find(ConversationsPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('olia');
    await sleep(200);
    wrapper.update();
    panel = wrapper.find(ConversationsPanel).first();
    expect(panel.find('.noMessages').text().trim()).toEqual(
      'No matching records found',
    );

    domInput.instance().value = '12344444';
    domInput.simulate('change');
    panel = wrapper.find(ConversationsPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('12344444');
    expect(panel.find('.noMessages').text().trim()).toEqual(
      'No matching records found',
    );
  });
  test('could search by phone number', () => {
    expect(panel.find(MessageItem).length).toEqual(2);
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = '23456';
    domInput.simulate('change');
    panel = wrapper.find(ConversationsPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('23456');
    expect(panel.find(MessageItem).length).toEqual(1);
  });
  test('could search by contact name', () => {
    expect(panel.find(MessageItem).length).toEqual(2);
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'oli';
    domInput.simulate('change');
    panel = wrapper.find(ConversationsPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('oli');
    expect(panel.find(MessageItem).length).toEqual(1);
  });
});
