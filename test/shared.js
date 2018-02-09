import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import getIntlDateTimeFormatter from 'ringcentral-integration/lib/getIntlDateTimeFormatter';
import * as mock from 'ringcentral-integration/integration-test/mock';
import ClientHistoryRequest from 'ringcentral-integration/integration-test/utils/ClientHistoryRequest';

import { createPhone } from '../dev-server/Phone';
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
  const phone = createPhone({
    apiConfig,
    brandConfig,
    prefix,
    version,
  });
  mock.mockClient(phone.client);
  mock.mockForLogin();
  const clientHistoryRequest = new ClientHistoryRequest(new Map(), phone.client);
  clientHistoryRequest.debugHistoryRequest();
  await phone.client.service.platform().login({
    username: process.env.username,
    extension: process.env.extension,
    password: process.env.password
  });
  state.storage.status = 'module-initializing';
  const store = createStore(phone.reducer, state);
  phone.setStore(store);
  phone.dateTimeFormat._defaultFormatter = getIntlDateTimeFormatter();
  return phone;
};

export const timeout = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));

export const getWrapper = async () => {
  const phone = await getPhone();
  return mount(<App phone={phone} />);
};

