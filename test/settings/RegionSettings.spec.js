import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import SettingsPanel from '../../src/components/SettingsPanel';
import RegionSettings from '../../src/components/RegionSettingsPanel';
import LinkLine from '../../src/components/LinkLine';
import Button from '../../src/components/Button';

let wrapper = null;
let panel = null;
let regionSettings = null;
let store = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  store = wrapper.props().phone.store;
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  panel = wrapper.find(SettingsPanel).first();
  const regionLinkLine = panel.find(LinkLine).at(1);
  await regionLinkLine.simulate('click');
  regionSettings = wrapper.find(RegionSettings).first();
});

const enterAreaCode = async (areaCode) => {
  const input = regionSettings.find('input.input').first();
  input.get(0).value = areaCode;
  await input.simulate('change');
};

describe('region settings', async () => {
  test('initial state', () => {
    expect(regionSettings.find('div.label').first().props().children).toEqual('Region');
  });

  test('button state', async () => {
    const saveButton = regionSettings.find(Button).first();
    expect(saveButton.props().disabled).toEqual(true);
    await enterAreaCode('853');
    expect(saveButton.props().disabled).toEqual(false);
  });

  test('save', async () => {
    const saveButton = regionSettings.find(Button).first();
    await enterAreaCode('853');
    await saveButton.simulate('click');
    const messages = store.getState(wrapper).alert.messages;
    expect(messages.length).toEqual(1);
    const message = messages[0];
    expect(message.level).toEqual('info');
    expect(message.message).toMatch(/saveSuccess/);
  });

  test('invalid area code', async () => {
    const saveButton = regionSettings.find(Button).first();
    await enterAreaCode('000');
    await saveButton.simulate('click');
    const messages = store.getState(wrapper).alert.messages;
    expect(messages.length).toEqual(1);
    const message = messages[0];
    expect(message.level).toEqual('danger');
    expect(message.message).toMatch(/areaCodeInvalid/);
  });
});
