import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import MessageList from '../../src/components/MessageList';
import SearchInput from '../../src/components/SearchInput';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
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
    searchInput.props().onChange({ currentTarget: { value: 'something-doesnt-exist' } });
    expect(searchInput.props().value).toEqual('something-doesnt-exist');
    expect(panel.find('.noMessages').text().trim()).toEqual('No matching records found');
  });
});
