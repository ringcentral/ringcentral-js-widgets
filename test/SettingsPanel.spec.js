import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { getPhone } from './shared';
import SettingsPage from '../src/containers/SettingsPage';
import LinkLine from '../src/components/LinkLine';

let wrapper = null;
beforeEach(() => {
  const phone = getPhone();
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
    expect(linkLines.length).toBeGreaterThan(1);
    expect(linkLines.at(0).props().children).toEqual('calling');
    expect(linkLines.at(1).props().children).toEqual('region');
  });
});
