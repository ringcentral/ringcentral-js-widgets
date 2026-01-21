import type { AppConfig } from '..';
import { brandConfig } from './brandConfig';

export default {
  brandConfig,
  sdkConfig: {
    clientId: process.env.RINGCENTRAL_CLIENT_ID,
    server: process.env.RINGCENTRAL_SERVER_URL,
  },
  analyticsKey: '',
  enableIDB: false,
  version: {
    buildHash: process.env.BUILD_HASH,
    releaseVersion: process.env.RELEASE_VERSION,
    appVersion: process.env.BUILD_HASH
      ? `${process.env.APP_VERSION} (${process.env.BUILD_HASH})`
      : process.env.RELEASE_VERSION,
  },
  prefix: 'micro-core',
} as AppConfig;
