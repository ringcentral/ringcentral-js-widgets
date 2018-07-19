import messageTypes from 'ringcentral-integration/enums/messageTypes';
import * as mock from 'ringcentral-integration/integration-test/mock';
import ClientHistoryRequest from 'ringcentral-integration/integration-test/utils/ClientHistoryRequest';
import messageSyncBody from 'ringcentral-integration/integration-test/mock/data/messageSync.json';
import { ensureLogin, containsErrorMessage } from 'ringcentral-integration/integration-test/utils/HelpUtil';

import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import ConversationsPanel from 'ringcentral-widgets/components/ConversationsPanel';
import MessageItem from 'ringcentral-widgets/components/MessageItem';
import ContactDisplay from 'ringcentral-widgets/components/ContactDisplay';
import { MarkButton, PreviewButton } from 'ringcentral-widgets/components/ActionMenuList';
import EntityButton from 'ringcentral-widgets/components/EntityButton';

import { getWrapper, timeout } from '../shared';
import { mockGenerateMessageApi, mockUpdateMessageStatusApi, mockPubnub } from './helper.js';

let wrapper = null;
let panel = null;
let navigationBar = null;
let phone = null;

describe('fax messages', () => {
  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  });
  describe('fax messages list', () => {
    test('initial state', async () => {
      wrapper = await getWrapper();
      phone = wrapper.props().phone;
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      expect(panel).toBeDefined();
      expect(panel.props()).toBeDefined();
    });
    test('when have no fax permission should not show fax sub tab', async () => {
      wrapper = await getWrapper();
      phone = wrapper.props().phone;
      Object.defineProperty(phone.rolesAndPermissions, 'readFaxPermissions', {
        value: false
      });
      wrapper.setProps({ phone });
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      expect(panel.props().readFaxPermission).toEqual(false);
      const faxTabs = panel.find(NavigationBar).props().tabs.filter(tab => tab.path === messageTypes.fax);
      expect(faxTabs.length).toEqual(0);
    });
    test('when have fax permission should show fax sub tab', async () => {
      wrapper = await getWrapper();
      phone = wrapper.props().phone;
      Object.defineProperty(phone.rolesAndPermissions, 'readFaxPermissions', {
        value: true
      });
      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      expect(panel.props().readFaxPermission).toEqual(true);
      const faxTabs = panel.find(NavigationBar).props().tabs.filter(tab => tab.path === messageTypes.fax);
      expect(faxTabs.length).toEqual(1);
    });
    test('when fax message sent before today should display date', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false});
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      const record = messageSyncBody.records[0];
      mock.messageSync({
        records: [{
          ...record,
          type: 'Fax',
          creationTime: ((new Date(Date.now() - 24 * 60 * 60 * 1000))).toISOString(),
          lastModifiedTime: ((new Date(Date.now() - 24 * 60 * 60 * 1000))).toISOString(),
        }]
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
     await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });


      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find('.creationTime').text()).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/g);
    });
    test('when fax message sent in today should display time', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false});
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      const record = messageSyncBody.records[0];
      mock.messageSync({
        records: [{
          ...record,
          type: 'Fax',
          creationTime: (new Date()).toISOString(),
          lastModifiedTime: (new Date()).toISOString(),
        }]
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });
      wrapper.setProps({ phone });
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find('.creationTime').text()).toMatch(/\d\d:\d\d/g);
    });
    test('when fax message is received should show received direction', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false});
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      const record = messageSyncBody.records[0];
      mock.messageSync({
        records: [{
          ...record,
          type: 'Fax',
          direction: 'Inbound',
          messageStatus: 'Received',
          from: {
            extensionNumber: '101',
            name: 'Something1 New5'
          },
          creationTime: (new Date()).toISOString(),
          lastModifiedTime: (new Date()).toISOString(),
        }]
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });
      wrapper.setProps({ phone });
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find('.details').text()).toMatch(/^Fax received/g);
    });
    test('when fax message is sent should show show sent direction', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false});
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      const record = messageSyncBody.records[0];
      mock.messageSync({
        records: [{
          ...record,
          type: 'Fax',
          direction: 'Outbound',
          messageStatus: 'Delivered',
          to: {
            extensionNumber: '101',
            name: 'Something1 New1'
          },
          creationTime: (new Date()).toISOString(),
          lastModifiedTime: (new Date()).toISOString(),
        }]
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });
      wrapper.setProps({ phone });
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find('.details').text()).toMatch(/^Fax sent/g);
    });
    test('when authorize should display google contact in fax list', async () => {
      mock.restore();
      // mock.subscription();
      wrapper = await getWrapper({ shouldMockForLogin: false});
      phone = wrapper.props().phone;
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      Object.defineProperty(phone.contactMatcher, 'dataMapping', {
        value: {
          '+12345678': [{
            type: 'google',
            phoneNumbers: [
              {
                phoneNumber: '+12345678',
                phoneType: 'homePhone'
              },
              {
                phoneNumber: '+15856234100',
                phoneType: 'homePhone2'
              },
              {
                phoneNumber: '+17322764403',
                phoneType: 'businessPhone'
              }
            ],
            emails: [],
            availability: 'Alive',
            firstName: 'test',
            lastName: 'user',
            id: '391595004',
            homePhone: '+12345678',
            homePhone2: '+15856234100',
            businessPhone: '+17322764403',
            name: 'test user',
            entityType: 'rcContact'
          }]
        }
      });
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      const record = messageSyncBody.records[0];
      mock.messageSync({
        records: [{
          ...record,
          type: 'Fax',
          direction: 'Outbound',
          messageStatus: 'Delivered',
          to: [{
            phoneNumber: '+12345678',
            location: ''
          }],
          creationTime: (new Date()).toISOString(),
          lastModifiedTime: (new Date()).toISOString(),
        }]
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });
      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find(ContactDisplay).find('.currentName').at(0).text()).toMatch(/^test user$/g);
    });
  });
  describe('fax messages unread count', async () => {
    test('should not show unread count displayed on fax tab when there are 0 unread fax', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false });
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'Read', direction: 'Inbound'
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });

      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      expect(phone.messageStore.faxUnreadCounts).toEqual(0);
      const notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notice');
      expect(notice.length).toEqual(0);
    });
    test('should show 3 unread count displayed on fax tab when there are 3 unread fax', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false });
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 3, messageType: 'Fax', readStatus: 'Unread', direction: 'Inbound'
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });

      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      const notice = panel.find(NavigationBar).find('.active').find('.notice').at(0);
      expect(notice.text()).toEqual('3');
    });
    test('should show 99 unread count displayed on fax tab when there are 99 unread fax', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false });
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 99, messageType: 'Fax', readStatus: 'Unread', direction: 'Inbound'
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });

      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');

      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      expect(phone.messageStore.faxUnreadCounts).toEqual(99);
      const notice = panel.find(NavigationBar).find('.active').find('.notice').at(0);
      expect(notice.text()).toEqual('99');
    });
    test('should show 99+ unread count displayed on fax tab when there are 100 unread fax', async () => {
      wrapper = await getWrapper();
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 100, messageType: 'Fax', readStatus: 'Unread', direction: 'Inbound'
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });

      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      const notice = panel.find(NavigationBar).find('.active').find('.notices').at(0);
      expect(notice.text()).toEqual('99+');
    });
    test('when click to view unread message the unread count displayed with fax tab should reduce from 1 to null', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false });
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'Unread', direction: 'Inbound'
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });

      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      mockUpdateMessageStatusApi({
        id: 0,
        readStatus: 'Read',
        messageType: 'Fax',
      });
      let notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notice');
      expect(notice.at(0).text()).toEqual('1');
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem);
      await messageItem.find(PreviewButton).props().onClick();
      await timeout(1000);
      wrapper.update();
      notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notice');
      expect(notice.length).toEqual(0);
    });
    test('when mark as unread the unread count displayed with fax tab should add from null to 1', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false });
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'Read', direction: 'Inbound'
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      Object.defineProperty(phone.rolesAndPermissions, 'readFaxPermissions', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });

      Object.defineProperty(phone.contactMatcher, 'ready', {
        value: true
      });
      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      mockUpdateMessageStatusApi({
        id: 0,
        readStatus: 'Unread',
        messageType: 'Fax',
      });
      let notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notice');
      expect(notice.length).toEqual(0);
      const markButton = wrapper.find(ConversationsPanel).find(MessageItem).find(MarkButton);
      expect(markButton).toBeDefined();
      await markButton.simulate('click');
      await timeout(2000);
      wrapper.update();
      expect(phone.messageStore.faxUnreadCounts).toEqual(1);
      notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notice');
      expect(notice.at(0).text()).toEqual('1');
    });
    test('when mark as read unread message the unread count displayed with fax tab should reduce from 99+ to 99', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false });
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 100, messageType: 'Fax', readStatus: 'Unread', direction: 'Inbound'
      });
      mockUpdateMessageStatusApi({
        id: 0,
        readStatus: 'Read',
        messageType: 'Fax',
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });

      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      let notice = panel.find(NavigationBar).find('.active').find('.notices').at(0);
      expect(notice.text()).toEqual('99+');

      const markButton = wrapper.find(ConversationsPanel).find(MessageItem).at(0).find(MarkButton);
      expect(markButton).toBeDefined();
      await markButton.simulate('click');
      await timeout(1000);
      wrapper.update();
      expect(phone.messageStore.faxUnreadCounts).toEqual(99);
      notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notice');
      expect(notice.at(0).text()).toEqual('99');
    });
    test('when mark as unread a read message the unread count displayed with fax tab should add from 99 to 99+', async () => {
      wrapper = await getWrapper({ shouldMockForLogin: false });
      phone = wrapper.props().phone;
      mock.restore();
      mock.mockForLogin({ mockMessageSync: false });
      mockGenerateMessageApi({
        count: 100, messageType: 'Fax', readStatus: 'Unread', direction: 'Inbound'
      });
      mockUpdateMessageStatusApi({
        id: 0,
        readStatus: 'Read',
        messageType: 'Fax',
      });
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      await ensureLogin(phone.auth, {
        username: 'test',
        password: 'test'
      });
      wrapper.setProps({ phone });
      wrapper.update();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel);
      await panel.find(NavigationBar).props().goTo('Fax');
      wrapper.update();
      let markButton = wrapper.find(ConversationsPanel).find(MessageItem).at(0).find(MarkButton);
      expect(markButton).toBeDefined();
      await markButton.simulate('click');
      await timeout(1000);
      wrapper.update();
      let notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notice');
      expect(notice.at(0).text()).toEqual('99');

      wrapper.update();
      mockUpdateMessageStatusApi({
        id: 0,
        readStatus: 'Unread',
        messageType: 'Fax',
      });
      markButton = wrapper.find(ConversationsPanel).find(MessageItem).at(0).find(MarkButton);
      expect(markButton).toBeDefined();
      await markButton.simulate('click');
      await timeout(1000);
      wrapper.update();
      phone = wrapper.props().phone;
      expect(phone.messageStore.faxUnreadCounts).toEqual(100);
      notice = wrapper.find(ConversationsPanel).find(NavigationBar).find('.active').find('.notices');
      expect(notice.at(0).text()).toEqual('99+');
    });
  });
  describe('fax messages action', () => {
    beforeEach(async () => {
      wrapper = await getWrapper();
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/messages');
      navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('Fax');
      wrapper.update();
      panel = wrapper.find(ConversationsPanel).first();
      phone = wrapper.props().phone;
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      mock.restore();
      mock.subscription();
    });
    test('should have preview btn', async () => {
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'read', direction: 'Outbound'
      });
      await phone.subscription.subscribe(['/account/~/extension/~/message-sync']);
      await timeout(4500);
      await mockPubnub();

      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find(PreviewButton)).toBeDefined();
      expect(messageItem.find(PreviewButton).props().title).toEqual('View');
      expect(messageItem.find(PreviewButton).find('span').props().title).toEqual('View');
    });
    test('should have download btn', async () => {
      Object.defineProperty(phone.tabManager, 'active', {
        value: true
      });
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'read', direction: 'Outbound'
      });
      await phone.subscription.subscribe(['/account/~/extension/~/message-sync']);
      await timeout(2500);
      await mockPubnub();
      wrapper.update();

      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find('a').props().title).toEqual('Download');
    });
    test('when fax message is received and read should show mark as unread btn and tooltip', async () => {
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'Read', direction: 'Inbound'
      });
      await phone.subscription.subscribe(['/account/~/extension/~/message-sync']);
      await timeout(2500);
      await mockPubnub();

      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find(MarkButton).find('span').props().title).toEqual('Mark as Unread');
    });
    test('when fax message is received and unread should show mark as read btn and tooltip', async () => {
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'Unread', direction: 'Inbound'
      });
      await phone.subscription.subscribe(['/account/~/extension/~/message-sync']);
      await timeout(2500);
      await mockPubnub();

      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find(MarkButton).find('span').props().title).toEqual('Mark as Read');
    });
    test('when fax message is sent should show not mark as read/unread btn', async () => {
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'read', direction: 'Outbound'
      });
      await phone.subscription.subscribe(['/account/~/extension/~/message-sync']);
      await timeout(2500);
      await mockPubnub();

      wrapper.update();
      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem).toBeDefined();
      expect(messageItem.find(MarkButton).length).toEqual(0);
    });
    test('should have view contact detail btn when current number matches contact', async () => {
      mockGenerateMessageApi({
        count: 1, messageType: 'Fax', readStatus: 'read', direction: 'Outbound'
      });
      await phone.subscription.subscribe(['/account/~/extension/~/message-sync']);
      await timeout(2500);
      await mockPubnub();
      wrapper.update();

      const messageItem = wrapper.find(ConversationsPanel).find(MessageItem).at(0);
      expect(messageItem.find(EntityButton)).toBeDefined();
      expect(messageItem.find(EntityButton).find('span').props().title).toEqual('View Details');
    });
  });
});
