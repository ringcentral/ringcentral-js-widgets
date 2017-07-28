import { getWrapper } from '../shared';
import CallsPanel from '../../src/components/CallsPanel';
import NavigationBar from '../../src/components/NavigationBar';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/history');
  panel = wrapper.find(CallsPanel).first();
});

describe('history', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });
});
