import React from 'react';
import { mount } from 'enzyme';
import Perf from 'react-addons-perf';
import { createMockStore } from 'redux-logic-test';

import Phone from '../dev-server/Phone';
import App from '../dev-server/containers/App';
import apiConfig from '../dev-server/api-config';
import brandConfig from '../dev-server/brandConfig';
import version from '../dev-server/version';
import prefix from '../dev-server/prefix';

window.Perf = Perf;

const phone = new Phone({
  apiConfig,
  brandConfig,
  prefix,
  appVersion: version,
});

const store = createMockStore({
  reducer: phone.reducer
});

phone.setStore(store);

window.phone = phone;

const wrapper = mount(<App phone={phone} />);

export default wrapper;
