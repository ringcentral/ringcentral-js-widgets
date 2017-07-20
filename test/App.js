import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import AlertContainer from '../src/containers/AlertContainer';

export default function App({ phone }) {
  return (
    <Provider store={phone.store} >
      <AlertContainer
        locale={phone.locale}
        alert={phone.alert}
        rateLimiter={phone.rateLimiter}
        brand={phone.brand}
        router={phone.router}
        callingSettingsUrl="/settings/calling"
        regionSettingsUrl="/settings/region"
      />
    </Provider>
  );
}

App.propTypes = {
  phone: PropTypes.object.isRequired
};
