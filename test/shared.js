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
  appKey: 'testKey',
  appSecret: 'testSecret',
  server: 'testServer',
};

const getPhone = async () => {
  const phone = createPhone({
    apiConfig,
    brandConfig,
    prefix,
    version,
  });
  jest.mock('pubnub');
  jest.mock('ringcentral-web-phone');
  mock.mockClient(phone.client);
  mock.mockForLogin();
  const clientHistoryRequest = new ClientHistoryRequest(new Map(), phone.client);
  clientHistoryRequest.debugHistoryRequest();
  global.clientHistoryRequest = clientHistoryRequest;
  await phone.client.service.platform().login({
    username: 'testName',
    extension: '',
    password: 'testPassword'
  });
  state.storage.status = 'module-initializing';
  const store = createStore(phone.reducer, JSON.parse(JSON.stringify(state)));
  phone.setStore(store);
  phone.dateTimeFormat._defaultFormatter = getIntlDateTimeFormatter();
  return phone;
};

export const timeout = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));

export const getWrapper = async () => {
  const phone = await getPhone();
  return mount(<App phone={phone} />);
};

