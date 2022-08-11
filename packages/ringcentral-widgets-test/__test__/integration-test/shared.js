import React from 'react';

import { mount } from 'enzyme';
import { createStore } from 'redux';

import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import ClientHistoryRequest from '@ringcentral-integration/commons/integration-test/utils/ClientHistoryRequest';
import { ensureLogin } from '@ringcentral-integration/commons/integration-test/utils/HelpUtil';
import SimulateWindowObject from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import { waitUntilTo } from '@ringcentral-integration/utils';
import { brandConfig } from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import App from '@ringcentral-integration/widgets-demo/dev-server/containers/App';
import { createPhone } from '@ringcentral-integration/widgets-demo/dev-server/Phone';
import prefix from '@ringcentral-integration/widgets-demo/dev-server/prefix';
import version from '@ringcentral-integration/widgets-demo/dev-server/version';

const apiConfig = {
  appKey: 'testKey',
  appSecret: 'testSecret',
  server: 'testServer',
};

SimulateWindowObject();
const getPhone = async ({
  shouldMockForLogin = true,
  shouldMockWebphone = true,
  ...options
} = {}) => {
  jest.mock('pubnub');
  jest.mock('ringcentral-web-phone');
  jest.mock('ringcentral-call');

  // Mock phone
  const clientService = mock.createSDK({
    cachePrefix: `sdkPrefix-${Date.now()}`, // storage with different prefix in different case
  });
  const phone = createPhone({
    apiConfig,
    brandConfig,
    prefix: `${prefix}-${Date.now()}`, // storage with different prefix in different case
    version,
    clientService,
    subscriptionRegisterDelay: 10,
    enableDiscovery: false,
  });
  const store = createStore(phone.reducer);
  phone.setStore(store);
  // mock.mockClient(phone.client);
  const clientHistoryRequest = new ClientHistoryRequest(
    new Map(),
    phone.client,
  );
  clientHistoryRequest.debugHistoryRequest();
  global.clientHistoryRequest = clientHistoryRequest;

  if (shouldMockForLogin) {
    mock.restore();
    mock.mockForLogin(options);
    phone.connectivityMonitor._checkConnectionFunc = () => true;

    await ensureLogin(phone.auth, {
      username: 'test',
      password: 'test',
    });
    if (shouldMockWebphone) {
      await waitUntilTo(() => {
        expect(phone.webphone._webphone).not.toEqual(null);
      });

      if (phone.webphone.connecting && phone.webphone._webphone) {
        phone.webphone._webphone.userAgent.trigger('registered');
      }
    }
  }
  return phone;
};

export const getWrapper = async ({
  shouldMockForLogin = true,
  shouldMockWebphone = true,
  ...options
} = {}) => {
  const phone = await getPhone({
    shouldMockForLogin,
    shouldMockWebphone,
    ...options,
  });
  return mount(<App phone={phone} />);
};

export const initPhoneWrapper = async (options = {}) => {
  const wrapper = await getWrapper(options);
  const phone = wrapper.props().phone;
  return { wrapper, phone };
};

export const tearDownWrapper = async (wrapper) => {
  const phone = wrapper.props().phone;
  await phone.auth.logout();
  jest.clearAllTimers();
  global.clientHistoryRequest = null;
  mock.restore();
  wrapper.unmount();
};
