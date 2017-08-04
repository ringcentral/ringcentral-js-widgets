import { getWrapper, timeout } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import CallsPanel from '../../src/components/CallsPanel';
import CallItem from '../../src/components/CallItem';

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
  test('initial state', async () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();

    const callItems = panel.find(CallItem);
    await timeout(20); // because there is a setTimeout in CallItem implementation
    for (let i = 0; i < callItems.length; i += 1) {
      expect(callItems.at(i).text().trim().length > 0).toEqual(true);
    }
  });
});
