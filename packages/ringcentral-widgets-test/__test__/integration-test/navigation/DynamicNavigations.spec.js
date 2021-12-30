import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import TabNavigationButton from '@ringcentral-integration/widgets/components/TabNavigationButton';
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

/**
 * This IT test suite used many UT techniques that just breaks on implementation changes.
 * TODO: Consider generalize getTabs functions in each app into a NavigationTabsUI module,
 * and apply UT to the module.
 */
describe.skip('dynamic navigation bar', () => {
  test('navigation bar should be normal when has permissions', async () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: true },
      hasReadMessagesPermission: { value: true },
      hasComposeTextPermission: { value: true },
    });
    Object.defineProperties(phone.extensionFeatures.features, {
      Meetings: { value: { available: true } },
      ReadExtensionCallLog: { value: { available: true } },
      Conferencing: { value: { available: true } },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    const moreMenu = navigationBar
      .find(TabNavigationButton)
      .find({ label: 'More Menu' });
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(5);
    expect(moreMenu).toHaveLength(1);
    // TODO: test dropdown as well
  });

  test('navigation bar should be dynamically customizable by permissions', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: false },
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: false },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(4);
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'History' }),
    ).toHaveLength(1);
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Dial Pad' }),
    ).toHaveLength(0);
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Messages' }),
    ).toHaveLength(0);
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Compose Text' }),
    ).toHaveLength(0);
  });

  test('should hide breadcrumbs when the number of nav items are less than or equals to 5', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: false },
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: false },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'More Menu' }),
    ).toHaveLength(0);
  });

  test('should hide dialpad when no calling permission', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: false },
      hasReadMessagesPermission: { value: true },
      hasComposeTextPermission: { value: true },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(5);
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Dial Pad' }),
    ).toHaveLength(0);
  });

  test('should hide composeText when no composeText permission', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: true },
      hasReadMessagesPermission: { value: true },
      hasComposeTextPermission: { value: false },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Compose Text' }),
    ).toHaveLength(0);
  });

  test('should hide messages when no hasReadMessagesPermission', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: true },
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: false },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Messages' }),
    ).toHaveLength(0);
  });

  test('should hide meeting when no meeting permissions', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: false },
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: false },
    });
    Object.defineProperties(phone.extensionFeatures.features, {
      Meetings: { value: { available: false } },
      ReadExtensionCallLog: { value: { available: false } },
      Conferencing: { value: { available: true } },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(
      navigationBar
        .find(TabNavigationButton)
        .find({ label: 'Schedule Meeting' }),
    ).toHaveLength(0);
  });

  test('should hide history when no ReadExtensionCallLog feature', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: true },
      hasReadMessagesPermission: { value: true },
      hasComposeTextPermission: { value: true },
    });
    Object.defineProperties(phone.extensionFeatures.features, {
      Meetings: { value: { available: true } },
      ReadExtensionCallLog: { value: { available: false } },
      Conferencing: { value: { available: true } },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(5);
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'History' }),
    ).toHaveLength(0);
  });

  test('should hide contacts when no calling and read messages permission', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: true },
      hasReadMessagesPermission: { value: true },
      hasComposeTextPermission: { value: true },
    });
    Object.defineProperties(phone.extensionFeatures.features, {
      Meetings: { value: { available: true } },
      ReadExtensionCallLog: { value: { available: false } },
      Conferencing: { value: { available: true } },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    let navigationBar = wrapper.find(NavigationBar).first();
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Contacts' }),
    ).toHaveLength(1);
    Object.defineProperties(phone.appFeatures, {
      isCallingEnabled: { value: false },
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: true },
    });
    Object.defineProperties(phone.extensionFeatures.features, {
      Meetings: { value: { available: true } },
      ReadExtensionCallLog: { value: { available: true } },
      Conferencing: { value: { available: true } },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    navigationBar = wrapper.find(NavigationBar).first();
    expect(
      navigationBar.find(TabNavigationButton).find({ label: 'Contacts' }),
    ).toHaveLength(0);
  });
});
