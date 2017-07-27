import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { getPhone } from './shared';
import SettingsPage from '../src/containers/SettingsPage';
import LinkLine from '../src/components/LinkLine';
import IconLine from '../src/components/IconLine';
import PresenceSettingSection, { PresenceItem } from '../src/components/PresenceSettingSection';
import Eula from '../src/components/Eula';

let wrapper = null;
let phone = null;
beforeEach(async () => {
  phone = await getPhone();
  wrapper = mount(<Provider store={phone.store}>
    <SettingsPage
      auth={phone.auth}
      extensionInfo={phone.extensionInfo}
      accountInfo={phone.accountInfo}
      regionSettings={phone.regionSettings}
      version={phone.version}
      locale={phone.locale}
      brand={phone.brand}
      router={phone.router}
      rolesAndPermissions={phone.rolesAndPermissions}
      presence={phone.presence}
      regionSettingsUrl="/settings/region"
      callingSettingsUrl="/settings/calling"
    />
  </Provider>);
});

describe('settings panel', () => {
  test('initial state', () => {
    const linkLines = wrapper.find(LinkLine);
    expect(linkLines.length).toBe(2);
    expect(linkLines.at(0).props().children).toEqual('calling');
    expect(linkLines.at(1).props().children).toEqual('region');

    expect(wrapper.find(PresenceSettingSection).length).toBe(1);
    expect(wrapper.find(Eula).length).toBe(1);
    expect(wrapper.find('span.logout').length).toBe(1);
    expect(wrapper.find('div.versionContainer').length).toBe(1);
  });

  test('logout', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 16000;
    const logoutIcon = wrapper.find('span.logout').first();
    const logoutLines = logoutIcon.closest(IconLine);
    expect(logoutLines.length).toBe(1);
    const logoutLine = logoutLines.at(0);
    expect(phone.store.getState().auth.loginStatus).toMatch(/-loggedIn$/);
    await logoutLine.props().onClick();
    expect(phone.store.getState().auth.loginStatus).toMatch(/-loggingOut$/);

    // need to login again, otherwise other tests will fail
    window.authData = null; // set it to null will trigger login
  });

  test('change status', async () => {
    const presenceSettingSection = wrapper.find(PresenceSettingSection).first();

    const presenceItems = presenceSettingSection.find('.presenceList').first().find(PresenceItem);
    expect(presenceItems.length).toBe(4);
    const availableItem = presenceItems.at(0);
    const busyItem = presenceItems.at(1);
    const noDisturbItem = presenceItems.at(2);
    const invisibleItem = presenceItems.at(3);

    await availableItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Available');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');

    await busyItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Busy');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');

    await noDisturbItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Busy');
    expect(presenceSettingSection.props().dndStatus).toEqual('DoNotAcceptAnyCalls');

    await invisibleItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Offline');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');
  });
});
