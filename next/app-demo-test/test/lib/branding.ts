import { processI18n } from '@ringcentral-integration/i18n/lib/processI18n';

import type { BrandConfig } from '../../../app-demo/config';
import baseRc from '../../../micro-core/config/rc';

/**
 * The suite asserts the values of RingCentral's internal demo app (app name,
 * Jupiter app name, OAuth code flow), so override those on top of the public
 * rc config. The client secret is a dummy that only switches OAuth to the
 * authorization code flow; every request is served by `@ringcentral-integration/mock`.
 */
const rc: typeof baseRc = {
  ...baseRc,
  brandConfig: {
    ...baseRc.brandConfig,
    appName: 'RingCentral Integrations Internal Demo',
    application: 'Integrations Internal Demo',
    callWithJupiter: {
      ...baseRc.brandConfig.callWithJupiter!,
      name: 'RingCentral app',
    },
  },
  sdkConfig: {
    ...baseRc.sdkConfig,
    clientSecret: 'app-demo-test-client-secret',
    discoveryServer: baseRc.sdkConfig?.server,
  },
};

export const configMap = {
  rc,
};

export type BrandCode = keyof typeof configMap;

export const getAppConfig = (brandCode: BrandCode) => {
  return configMap[brandCode];
};
