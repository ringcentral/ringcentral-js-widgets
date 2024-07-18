import SimulateWindowObject from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import { renderComponent } from '@ringcentral-integration/test-utils';
// @ts-ignore
import RcIcon from '@ringcentral-integration/widgets-demo/dev-server/Icon.svg';
// @ts-ignore
import { createPhone } from '@ringcentral-integration/widgets-demo/dev-server/Phone';
import { brandConfig } from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import App from '@ringcentral-integration/widgets-demo/dev-server/containers/App';
// @ts-ignore
import prefix from '@ringcentral-integration/widgets-demo/dev-server/prefix';
// @ts-ignore
import version from '@ringcentral-integration/widgets-demo/dev-server/version';
import { createStore } from 'redux';

import type { StepFunction } from '../lib/step';

const apiConfig = {
  appKey: 'test key',
  appSecret: 'testSecret',
  server: 'http://whatever',
  discoveryServer: 'http://whatever',
};

export interface CreateInstanceProps {
  shouldMockWebphone?: boolean;
  shouldMockDevices?: boolean;
  shouldInitMock?: boolean;
}

export const CreateInstance: StepFunction<CreateInstanceProps> = async (
  {
    shouldMockWebphone = true,
    shouldMockDevices = true,
    shouldInitMock = true,
  },
  { rcMock },
) => {
  if (shouldInitMock) {
    rcMock.init();
  }
  SimulateWindowObject(shouldMockDevices);
  const phone = createPhone({
    ...brandConfig,
    analyticsKey: 'xxx',
    apiConfig,
    brandConfig,
    prefix: `${prefix}-${Date.now()}`, // storage with different prefix in different case
    version,
    enableDiscovery: true,
  });
  phone.webphone._deps.webphoneOptions.webphoneLogLevel = 0;
  const store = createStore(phone.reducer);
  phone.setStore(store);
  phone.connectivityMonitor._checkConnectionFunc = () => true;
  phone.webphone._removeWebphone = () => {};
  const app = renderComponent(
    App,
    { phone, icon: RcIcon },
    { disableAutoThemeProvider: true },
  );
  global.instance = {
    ...global.instance,
    phone,
    app,
    rcMock,
  };
};
