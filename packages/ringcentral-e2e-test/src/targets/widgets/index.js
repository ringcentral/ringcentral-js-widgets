import React from 'react';
import { createStore } from 'redux';

import getIntlDateTimeFormatter from 'ringcentral-integration/lib/getIntlDateTimeFormatter';
import * as mock from 'ringcentral-integration/integration-test/mock';
import { ensureLogin, containsErrorMessage } from 'ringcentral-integration/integration-test/utils/HelpUtil';
import ClientHistoryRequest from 'ringcentral-integration/integration-test/utils/ClientHistoryRequest';

import { createPhone } from 'ringcentral-widgets-demo/dev-server/Phone';
import App from 'ringcentral-widgets-demo/dev-server/containers/App';
import brandConfig from 'ringcentral-widgets-demo/dev-server/brandConfig';
import version from 'ringcentral-widgets-demo/dev-server/version';
import prefix from 'ringcentral-widgets-demo/dev-server/prefix';

import LocalStorage from '../../__mocks__/localStorage';

const apiConfig = {
  appKey: 'testKey',
  appSecret: 'testSecret',
  server: 'testServer',
};

const getPhone = async (shouldMockForLogin = true) => {
  jest.mock('pubnub');
  jest.mock('ringcentral-web-phone');
  localStorage.clear();
  const phone = createPhone({
    apiConfig,
    brandConfig,
    prefix,
    version,
  });
  const store = createStore(phone.reducer);
  phone.setStore(store);
  mock.mockClient(phone.client);
  const clientHistoryRequest = new ClientHistoryRequest(new Map(), phone.client);
  clientHistoryRequest.debugHistoryRequest();
  global.clientHistoryRequest = clientHistoryRequest;
  Object.defineProperties(phone.webphone, {
    connected: { value: true },
    connectionStatus: { value: 'connectionStatus-connected' },
  });
  if (shouldMockForLogin) {
    mock.restore();
    mock.mockForLogin();
    phone.connectivityMonitor._checkConnectionFunc = () => true;
    // await ensureLogin(phone.auth, {
    //   username: 'test',
    //   password: 'test'
    // });
  }
  return phone;
};

export default async ({ shouldMockForLogin = true } = {}) => {
  window.localStorage = new LocalStorage();
  const phone = await getPhone(shouldMockForLogin);
  return <App phone={phone} />;
};
