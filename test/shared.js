import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import getIntlDateTimeFormatter from 'ringcentral-integration/lib/getIntlDateTimeFormatter';

import Phone from '../dev-server/Phone';
import App from '../dev-server/containers/App';
import brandConfig from '../dev-server/brandConfig';
import version from '../dev-server/version';
import prefix from '../dev-server/prefix';
import state from './state.json';

const apiConfig = {
  appKey: process.env.appKey,
  appSecret: process.env.appSecret,
  server: process.env.server,
};

const getPhone = async () => {
  const phone = new Phone({
    apiConfig,
    brandConfig,
    prefix,
    appVersion: version,
  });
  if (window.authData === null) {
    await phone.client.service.platform().login({
      username: process.env.username,
      extension: process.env.extension,
      password: process.env.password
    });
    window.authData = phone.client.service.platform().auth().data();
  } else {
    phone.client.service.platform().auth().setData(window.authData);
  }
  state.storage.status = 'module-initializing';
  const store = createStore(phone.reducer, state);
  phone.setStore(store);
  phone.dateTimeFormat._defaultFormatter = getIntlDateTimeFormatter();
  return phone;
};

export const getWrapper = async () => {
  const phone = await getPhone();
  return mount(<App phone={phone} />);
};


export const timeout = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));
