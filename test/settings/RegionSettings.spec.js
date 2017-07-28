import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import SettingsPanel from '../../src/components/SettingsPanel';
import RegionSettings from '../../src/components/RegionSettingsPanel';
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

test('region settings', async () => {
  const regionLinkLine = panel.find(LinkLine).at(1);
  await regionLinkLine.props().onClick();
  const regionSettings = wrapper.find(RegionSettings).first();

  expect(regionSettings.find('div.label').first().props().children).toEqual('Region');

  const saveIcon = regionSettings.find('i.fa-floppy-o').first();
  const saveButton = saveIcon.closest(HeaderButton).first();
  expect(saveButton.props().disabled).toEqual(true);
  const input = regionSettings.find('input.input').first();
  await input.props().onChange({ currentTarget: { value: '853' } });
  expect(saveButton.props().disabled).toEqual(undefined);
});
