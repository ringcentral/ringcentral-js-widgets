import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import SettingsPanel from '../../src/components/SettingsPanel';
import CallingSettings from '../../src/components/CallingSettingsPanel';
import LinkLine from '../../src/components/LinkLine';
import Button from '../../src/components/Button';

let wrapper = null;
let panel = null;
let callingSettings = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  panel = wrapper.find(SettingsPanel).first();
  const callingLinkLine = panel.find(LinkLine).at(0);
  await callingLinkLine.props().onClick();
  callingSettings = wrapper.find(CallingSettings).first();
});

describe('calling settings', () => {
  test('initial state', async () => {
    expect(callingSettings.find('div.label').first().props().children).toEqual('Calling');
  });

  test('button state', () => {
    const saveButton = callingSettings.find(Button).first();
    expect(saveButton.props().disabled).toEqual(true);
  });
});
