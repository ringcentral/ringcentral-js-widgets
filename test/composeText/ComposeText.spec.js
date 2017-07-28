import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import ComposeTextPanel from '../../src/components/ComposeTextPanel';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/composeText');
  panel = wrapper.find(ComposeTextPanel).first();
});

describe('compose text panel', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });

  test('send button status', () => {
  });
});
