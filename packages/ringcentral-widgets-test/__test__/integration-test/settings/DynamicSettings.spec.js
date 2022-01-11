import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import { SettingsPanel } from '@ringcentral-integration/widgets/components/SettingsPanel';
import LinkLine from '@ringcentral-integration/widgets/components/LinkLine';

import { getWrapper } from '../shared';

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
// TODO: refactor to UT for SettingsUI module
describe.skip('dynamic setting page', () => {
  // TODO: consider removing this page since the definition of "normal" is vague and can change
  test('setting page should be normal when has permissions', async () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.appFeatures, 'isCallingEnabled', {
      value: true,
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
    Object.defineProperty(phone.appFeatures, 'isCallingEnabled', {
      value: false,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/settings');
    wrapper.update();
    const settingsPanel = wrapper.find(SettingsPanel).first();
    expect(settingsPanel.find(LinkLine).contains('Calling')).toBeFalsy();
    expect(settingsPanel.find(LinkLine).contains('Region')).toBeFalsy();
    expect(settingsPanel.find(LinkLine).contains('Audio')).toBeFalsy();
  });
});
