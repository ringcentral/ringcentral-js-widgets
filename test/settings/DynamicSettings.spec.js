import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import SettingsPanel from '../../src/components/SettingsPanel';
import LinkLine from '../../src/components/LinkLine';

let originalPhone = null;
let wrapper = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  originalPhone = wrapper.props().phone;
});

afterEach(async () => {
  wrapper.setProps({ phone: originalPhone });
  wrapper.update();
});

describe('dynamic setting page', () => {
  test('setting page should be normal when has permissions', async () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions, 'callingEnabled', {
      value: true
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/settings');
    wrapper.update();
    const settingsPanel = wrapper.find(SettingsPanel).first();
    expect(settingsPanel.find(LinkLine).at(0).text()).toEqual('Calling');
    expect(settingsPanel.find(LinkLine).at(1).text()).toEqual('Region');
    expect(settingsPanel.find(LinkLine).at(2).text()).toEqual('Audio');
  });

  test('should hide Calling, Region, Audio when not has calling permissions', async () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions, 'callingEnabled', {
      value: false
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/settings');
    wrapper.update();
    const settingsPanel = wrapper.find(SettingsPanel).first();
    const calling = settingsPanel.find(LinkLine).findWhere(n => n.text() === 'Calling');
    const region = settingsPanel.find(LinkLine).findWhere(n => n.text() === 'Region');
    const audio = settingsPanel.find(LinkLine).findWhere(n => n.text() === 'Audio');
    expect(calling).toHaveLength(0);
    expect(region).toHaveLength(0);
    expect(audio).toHaveLength(0);
  });
});
