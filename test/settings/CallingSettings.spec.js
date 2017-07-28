import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import SettingsPanel from '../../src/components/SettingsPanel';
import CallingSettings from '../../src/components/CallingSettingsPanel';
import LinkLine from '../../src/components/LinkLine';
import { HeaderButton } from '../../src/components/Header';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  panel = wrapper.find(SettingsPanel).first();
});

test('calling settings', async () => {
  const callingLinkLine = panel.find(LinkLine).at(0);
  await callingLinkLine.props().onClick();
  const callingSettings = wrapper.find(CallingSettings).first();

  expect(callingSettings.find('div.label').first().props().children).toEqual('Calling');

  const saveIcon = callingSettings.find('i.fa-floppy-o').first();
  const saveButton = saveIcon.closest(HeaderButton).first();
  expect(saveButton.props().disabled).toEqual(true);
});
