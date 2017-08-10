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
  panel = wrapper.find(MessageList).first();
});

describe('messages', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });

  test('search but no match', () => {
    const searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.get(0).value = 'something-doesnt-exist';
    domInput.simulate('change');
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
      const logButton = callItem.find(LogButton).first().find(Button).first();
      logButton.simulate('click');
      expect(logButton.props().disabled).toBe(true);
      expect(logButton.find(Spinner).length).toBe(1);
      await timeout(3000);
      expect(logButton.props().disabled).toBe(false);
      expect(logButton.find(Spinner).length).toBe(0);
    }
  });
});
