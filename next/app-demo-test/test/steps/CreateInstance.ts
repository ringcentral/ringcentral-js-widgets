import { createApp } from '@ringcentral-integration/app-demo/src/createApp';
import SimulateWindowObject from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import {
  type StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { DEFAULT_DEVICES } from '../__mock__/mockAudioDevices';
import { getAppConfig } from '../lib/branding';

import { MockDeviceProps } from './Mock/MockDevice';

export interface CreateInstanceProps {
  shouldMockDevices?: boolean;
  mockDevices?: MockDeviceProps['devices'];
  shouldInitMock?: boolean;
  enableDiscovery?: boolean;
  /**
   * Enable webphone or not
   */
  enableWebphone?: boolean;
  /**
   * Brand name
   */
  brand?: string;
}

const ensureAppContainer = () => {
  if (!global.document || document.getElementById('app')) {
    return;
  }

  const appContainer = document.createElement('div');
  appContainer.id = 'app';
  document.body.appendChild(appContainer);
};

export const CreateInstance: StepFunction<CreateInstanceProps> = async (
  {
    shouldMockDevices = true,
    mockDevices = DEFAULT_DEVICES,
    shouldInitMock = true,
    enableDiscovery = false,
    enableWebphone = true,
    brand = 'rc',
  },
  { rcMock },
) => {
  if (enableWebphone) {
    SimulateWindowObject(shouldMockDevices, mockDevices);
  }
  if (shouldInitMock) {
    rcMock.init();
  }

  const appConfig = getAppConfig(brand as never) || getAppConfig('rc');
  appConfig.sdkConfig = {
    ...appConfig.sdkConfig,
    enableDiscovery,
  };

  process.env = {
    ...process.env,
    APP_CONFIG: JSON.parse(JSON.stringify(appConfig)),
  };

  ensureAppContainer();
  const app = await createApp({
    name: 'internal-widgets-demo',
    type: 'Base',
  });
  const renderedApp = app ?? global.instance?.app ?? global.app;
  if (renderedApp) {
    global.app = renderedApp;
    global.instance = {
      ...global.instance,
      app: renderedApp,
    };
  }
  await waitForRenderReady();
};
