import { createStore } from 'redux';

import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import ClientHistoryRequest from '@ringcentral-integration/commons/integration-test/utils/ClientHistoryRequest';
import SimulateWindowObject from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import { waitUntilEqual } from '@ringcentral-integration/commons/integration-test/utils/WaitUtil';
import { mount } from '@ringcentral-integration/test-utils/lib/render';
import { brandConfig } from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import App from '@ringcentral-integration/widgets-demo/dev-server/containers/App';
import RcIcon from '@ringcentral-integration/widgets-demo/dev-server/Icon.svg';
import { createPhone } from '@ringcentral-integration/widgets-demo/dev-server/Phone';
import prefix from '@ringcentral-integration/widgets-demo/dev-server/prefix';
import version from '@ringcentral-integration/widgets-demo/dev-server/version';

jest.setTimeout(30 * 1000);

const apiConfig = {
  appKey: 'testKey',
  appSecret: 'testSecret',
  server: 'testServer',
};

SimulateWindowObject();

export const getInstance = async ({
  shouldMockForLogin = true,
  shouldMockWebphone = true,
  ...options
} = {}) => {
  jest.mock('pubnub');
  jest.mock('ringcentral-web-phone');
  jest.mock('ringcentral-call');

  // Mock phone
  mock.discoveryInitial();
  const clientService = mock.createSDK({
    enableDiscovery: true,
    discoveryServer: 'http://whatever',
    cachePrefix: `sdkPrefix-${Date.now()}`, // storage with different prefix in different case
  });
  const phone = createPhone({
    ...brandConfig,
    apiConfig,
    brandConfig,
    prefix: `${prefix}-${Date.now()}`, // storage with different prefix in different case
    version,
    clientService,
    enableDiscovery: true,
  });
  phone.webphone._deps.webphoneOptions.webphoneLogLevel = 0;
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

    // await ensureLogin(phone.auth, {
    //   username: 'test',
    //   password: 'test',
    // });
    if (shouldMockWebphone) {
      await waitUntilEqual(
        () => !!phone.webphone._webphone,
        '_webphone',
        true,
        5,
        10,
      );
      if (phone.webphone.connecting && phone.webphone._webphone) {
        phone.webphone._webphone.userAgent.trigger?.('registered');
      }
    }
  }
  const app = mount(App, { phone, icon: RcIcon }, true);
  return {
    phone,
    app,
  };
};
