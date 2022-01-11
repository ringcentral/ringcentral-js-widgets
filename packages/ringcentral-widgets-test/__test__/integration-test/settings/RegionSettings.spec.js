import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import { SettingsPanel } from '@ringcentral-integration/widgets/components/SettingsPanel';
import RegionSettings from '@ringcentral-integration/widgets/components/RegionSettingsPanel';
import LinkLine from '@ringcentral-integration/widgets/components/LinkLine';

import { getWrapper, timeout } from '../shared';

let wrapper = null;
let panel = null;
let regionSettings = null;

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  wrapper.update();
  panel = wrapper.find(SettingsPanel).first();
  const regionLinkLine = panel.find(LinkLine).at(1);
  await regionLinkLine.simulate('click');
  regionSettings = wrapper.find(RegionSettings).first();
});

const enterAreaCode = async (areaCode) => {
  const input = regionSettings.find('input.input').first();
  input.instance().value = areaCode;
  await input.simulate('change');
};

describe('region settings', () => {
  test('initial state', () => {
    expect(regionSettings.find('div.label').first().props().children).toEqual(
      'Region',
    );
  });

  test('button state', async () => {
    let saveButton = regionSettings.find('SaveButton').first();
    expect(saveButton.props().disabled).toEqual(true);
    await enterAreaCode('853');
    regionSettings = wrapper.find(RegionSettings).first();
    saveButton = regionSettings.find('SaveButton').first();
    expect(saveButton.props().disabled).toEqual(false);
  });

  test('save', async () => {
    const saveButton = regionSettings.find('SaveButton').first();
    await enterAreaCode('853');
    await saveButton.simulate('click');
    const store = wrapper.props().phone.store;
    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'info',
          message: 'regionSettingsMessages-saveSuccess',
        }),
      ]),
    );
  });

  test('invalid area code', async () => {
    const saveButton = regionSettings.find('SaveButton').first();
    await enterAreaCode('000');
    await saveButton.simulate('click');
    const store = wrapper.props().phone.store;
    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'danger',
          message: 'regionSettingsMessages-areaCodeInvalid',
        }),
      ]),
    );
  });
});
