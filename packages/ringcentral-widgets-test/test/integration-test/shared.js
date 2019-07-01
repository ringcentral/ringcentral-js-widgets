import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import * as mock from 'ringcentral-integration/integration-test/mock';
import { ensureLogin } from 'ringcentral-integration/integration-test/utils/HelpUtil';
import SimulateWindowObject from 'ringcentral-integration/integration-test/utils/SimulateWindowObject';
import ClientHistoryRequest from 'ringcentral-integration/integration-test/utils/ClientHistoryRequest';

import { createPhone } from 'ringcentral-widgets-demo/dev-server/Phone';
import App from 'ringcentral-widgets-demo/dev-server/containers/App';
import brandConfig from 'ringcentral-widgets-demo/dev-server/brandConfig';
import version from 'ringcentral-widgets-demo/dev-server/version';
import prefix from 'ringcentral-widgets-demo/dev-server/prefix';

/* global jest */

export const timeout = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));

const apiConfig = {
  appKey: 'testKey',
  appSecret: 'testSecret',
  server: 'testServer',
};

SimulateWindowObject();
const getPhone = async ({
  shouldMockForLogin = true, shouldMockWebphone = true, ...options
} = {}) => {
  jest.mock('pubnub');
  jest.mock('ringcentral-web-phone');
  localStorage.clear();

  // Mock phone
  const clientService = mock.createSDK({});
  const phone = createPhone({
    apiConfig,
    brandConfig,
    prefix,
    version,
    clientService,
  });

  const store = createStore(phone.reducer);
  phone.setStore(store);
  // mock.mockClient(phone.client);
  const clientHistoryRequest = new ClientHistoryRequest(new Map(), phone.client);
  clientHistoryRequest.debugHistoryRequest();
  global.clientHistoryRequest = clientHistoryRequest;

  if (shouldMockForLogin) {
    mock.restore();
    mock.mockForLogin(options);
    phone.connectivityMonitor._checkConnectionFunc = () => true;

    await ensureLogin(phone.auth, {
      username: 'test',
      password: 'test'
    });
    if (shouldMockWebphone) {
      if (phone.webphone.connecting) {
        phone.webphone._webphone.userAgent._events.registered();
      }
    }
  }
  return phone;
};

export const getWrapper = async ({
  shouldMockForLogin = true, shouldMockWebphone = true, ...options
} = {}) => {
  const phone = await getPhone({
    shouldMockForLogin, shouldMockWebphone, ...options
  });
  return mount(<App phone={phone} />);
};

export const initPhoneWrapper = async (options = {}) => {
  const wrapper = await getWrapper(options);
  const phone = wrapper.props().phone;
  return { wrapper, phone };
};
