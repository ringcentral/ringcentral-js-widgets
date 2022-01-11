import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import ConversationList from '@ringcentral-integration/widgets/components/ConversationList';
import ConversationsPanel from '@ringcentral-integration/widgets/components/ConversationsPanel';
import ContactDisplay from '@ringcentral-integration/widgets/components/ContactDisplay';
import { SearchInput } from '@ringcentral-integration/widgets/components/SearchInput';
import MessageItem from '@ringcentral-integration/widgets/components/MessageItem';
import ConversationPanel from '@ringcentral-integration/widgets/components/ConversationPanel';
import LogButton from '@ringcentral-integration/widgets/components/LogButton';
import { Button } from '@ringcentral-integration/widgets/components/Button';
import Spinner from '@ringcentral-integration/widgets/components/Spinner';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';

import { getWrapper, timeout, tearDownWrapper } from '../shared';

let wrapper = null;
let panel = null;

describe('messages', () => {
  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
    wrapper = await getWrapper();
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/messages');
    wrapper.update();
    panel = wrapper.find(ConversationsPanel).first();
  });

  afterEach(async () => {
    await tearDownWrapper(wrapper);
  });

  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });

  test('search but no match', () => {
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'something-doesnt-exist';
    domInput.simulate('change');
    panel = wrapper.find(ConversationsPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('something-doesnt-exist');
    expect(panel.find('.noMessages').text().trim()).toEqual(
      'No matching records found',
    );
  });

  test('message list', () => {
    panel.find(MessageItem).forEach((item) => {
      const { conversation } = item.props();
      const { className } = item.find(ContactDisplay).first().props();
      if (conversation.unreadCounts > 0) {
        expect(className).toContain('unread');
      } else {
        expect(className).not.toContain('unread');
      }
    });
    const firstMessage = panel.find(MessageItem).first();
    expect(firstMessage.props()).toBeDefined();
  });

  test('click a message', async () => {
    const message = wrapper.props().phone.messageStore.allConversations[0];
    mock.updateMessageStatus(
      {
        ...message,
        readStatus: 'Read',
        lastModifiedTime: new Date().toISOString(),
      },
      false,
    );
    const firstMessage = panel.find(MessageItem).first();
    await firstMessage.find('.wrapper').first().simulate('click');
    await timeout(200); // wait conversation loaded
    const conversationPanel = wrapper.find(ConversationPanel);
    expect(conversationPanel.length > 0).toBe(true);
  });

  test('log button', async () => {
    const messageItems = panel.find(MessageItem);
    if (messageItems.length > 0) {
      const callItem = messageItems.at(messageItems.length - 1); // last item
      const logButton = callItem.find(LogButton).first().find(Button).first();
      expect(logButton.props().disabled).toBe(false);
    }
  });

  test('click log button', async () => {
    const messageItems = panel.find(MessageItem);
    if (messageItems.length > 0) {
      const callItem = messageItems.at(messageItems.length - 1); // last item
      let logButton = callItem.find(LogButton).find(Button);
      logButton.simulate('click');
      panel = wrapper.find(ConversationList).first();
      logButton = panel
        .find(MessageItem)
        .at(messageItems.length - 1)
        .find(LogButton)
        .find(Button);
      expect(logButton.props().disabled).toBe(true);
      expect(logButton.find(Spinner).length).toBe(1);
      await timeout(2000);
      wrapper.update();
      panel = wrapper.find(ConversationList).first();
      logButton = panel
        .find(MessageItem)
        .at(messageItems.length - 1)
        .find(LogButton)
        .find(Button);
      expect(logButton.props().disabled).toBe(false);
      expect(logButton.find(Spinner).length).toBe(0);
    }
  });

  test('message log button', async () => {
    const message = wrapper.props().phone.messageStore.allConversations[0];
    mock.updateMessageStatus(
      {
        ...message,
        readStatus: 'Read',
        lastModifiedTime: new Date().toISOString(),
      },
      false,
    );
    const firstMessage = panel.find(MessageItem).first();
    await firstMessage.find('.wrapper').first().simulate('click');
    await timeout(200); // wait conversation loaded
    const conversationPanel = wrapper.find(ConversationPanel);
    const logButton = conversationPanel.find(LogButton).first().find(Button);
    expect(logButton.props().disabled).toBe(false);
  });

  test('message click log button', async () => {
    const message = wrapper.props().phone.messageStore.allConversations[0];
    mock.updateMessageStatus(
      {
        ...message,
        readStatus: 'Read',
        lastModifiedTime: new Date().toISOString(),
      },
      false,
    );
    const firstMessage = panel.find(MessageItem).first();
    await firstMessage.find('.wrapper').first().simulate('click');
    await timeout(200); // wait conversation loaded
    let conversationPanel = wrapper.find(ConversationPanel);
    let logButton = conversationPanel.find(LogButton).find(Button);
    logButton.simulate('click');
    conversationPanel = wrapper.find(ConversationPanel);
    logButton = conversationPanel.find(LogButton).find(Button);
    expect(logButton.props().disabled).toBe(true);
    expect(logButton.find(Spinner).length).toBe(1);
    await timeout(200);
    wrapper.update();
    conversationPanel = wrapper.find(ConversationPanel);
    logButton = conversationPanel.find(LogButton).find(Button);
    expect(logButton.props().disabled).toBe(false);
    expect(logButton.find(Spinner).length).toBe(0);
  });
});
