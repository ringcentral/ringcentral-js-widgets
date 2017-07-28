import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import MessageList from '../../src/components/MessageList';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/messages');
  panel = wrapper.find(MessageList).first();
});

describe('history', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });
});
