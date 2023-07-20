import { createStore } from 'redux';
import SimulateWindowObject from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import { renderComponent } from '@ringcentral-integration/test-utils';
import { brandConfig } from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import App from '@ringcentral-integration/widgets-demo/dev-server/containers/App';
// @ts-ignore
import RcIcon from '@ringcentral-integration/widgets-demo/dev-server/Icon.svg';
// @ts-ignore
import { createPhone } from '@ringcentral-integration/widgets-demo/dev-server/Phone';
// @ts-ignore
import prefix from '@ringcentral-integration/widgets-demo/dev-server/prefix';
// @ts-ignore
import version from '@ringcentral-integration/widgets-demo/dev-server/version';
import type { StepFunction } from '../lib/step';
import { connectionStatus } from '@ringcentral-integration/commons/modules/Webphone';

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
  enableWebphone?: boolean;
}

export const CreateInstance: StepFunction<CreateInstanceProps> = async (
  {
    shouldMockWebphone = true,
    shouldMockDevices = true,
    shouldInitMock = true,
    enableWebphone = true,
  },
  { rcMock },
) => {
  if (shouldInitMock) {
    rcMock.init();
  }
  SimulateWindowObject(shouldMockDevices);
  const phone = createPhone({
    ...brandConfig,
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
  if (enableWebphone) {
    phone.webphone._setConnectionStatus(connectionStatus.connected);
  }
  if (shouldMockWebphone && phone.webphone.connecting) {
    phone.webphone._webphone?.userAgent.trigger?.('registered');
  }
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => {};
  phone.webphone._connect = () => {};
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
