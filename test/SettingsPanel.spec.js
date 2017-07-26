import React from 'react';
import { Provider } from 'react-redux';

import { getPhone } from './shared';
import SettingsPage from '../src/containers/SettingsPage';

let wrapper = null;
beforeEach(() => {
  const phone = getPhone();
  wrapper = (<Provider store={phone.store}>
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
    // expect(wrapper).toMatchSnapshot();
  });
});
