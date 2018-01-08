import { getWrapper, timeout } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import MessageList from '../../src/components/MessageList';
import SearchInput from '../../src/components/SearchInput';
import MessageItem from '../../src/components/MessageItem';
import ConversationPanel from '../../src/components/ConversationPanel';
import LogButton from '../../src/components/LogButton';
import Button from '../../src/components/Button';
import Spinner from '../../src/components/Spinner';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/messages');
  wrapper.update()
  panel = wrapper.find(MessageList).first();
});

describe('messages', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });

  test('search but no match', () => {
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'something-doesnt-exist';
    domInput.simulate('change');
    panel = wrapper.find(MessageList).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('something-doesnt-exist');
    expect(panel.find('.noMessages').text().trim()).toEqual('No matching records found');
  });

  test('message list', () => {
    const firstMessage = panel.find(MessageItem).first();
    expect(firstMessage.props()).toBeDefined();
  });

  test('click a message', async () => {
    const firstMessage = panel.find(MessageItem).first();
    await firstMessage.find('div').first().simulate('click');
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
      panel = wrapper.find(MessageList).first();
      logButton = panel.find(MessageItem).at(messageItems.length - 1).find(LogButton).find(Button);
      expect(logButton.props().disabled).toBe(true);
      expect(logButton.find(Spinner).length).toBe(1);
      await timeout(3000);
      wrapper.update();
      panel = wrapper.find(MessageList).first();
      logButton = panel.find(MessageItem).at(messageItems.length - 1).find(LogButton).find(Button);
      expect(logButton.props().disabled).toBe(false);
      expect(logButton.find(Spinner).length).toBe(0);
    }
  });

  test('message log button', async () => {
    const firstMessage = panel.find(MessageItem).first();
    await firstMessage.find('div').first().simulate('click');
    const conversationPanel = wrapper.find(ConversationPanel);

    const logButton = conversationPanel.find(LogButton).first().find(Button);
    expect(logButton.props().disabled).toBe(false);
  });

  test('message click log button', async () => {
    const firstMessage = panel.find(MessageItem).first();
    await firstMessage.find('div').first().simulate('click');
    let conversationPanel = wrapper.find(ConversationPanel);
    let logButton = conversationPanel.find(LogButton).find(Button);
    logButton.simulate('click');
    conversationPanel = wrapper.find(ConversationPanel);
    logButton = conversationPanel.find(LogButton).find(Button);
    expect(logButton.props().disabled).toBe(true);
    expect(logButton.find(Spinner).length).toBe(1);
    await timeout(1000);
    wrapper.update();
    conversationPanel = wrapper.find(ConversationPanel);
    logButton = conversationPanel.find(LogButton).find(Button);
    expect(logButton.props().disabled).toBe(false);
    expect(logButton.find(Spinner).length).toBe(0);
  });
});
