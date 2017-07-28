import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import ConferencePanel from '../../src/components/ConferencePanel';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/conference');
  panel = wrapper.find(ConferencePanel).first();
});

describe('conference', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });
});
