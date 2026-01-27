import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Locale,
  SleepDetector,
  Brand,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  createMemoryHistory,
  RouterPlugin,
  RouterOptions,
  StoragePlugin,
  IRouterOptions,
  isSharedWorker,
} from '@ringcentral-integration/next-core';
import { exposeMicroApp } from '@ringcentral-integration/next-micro';

import { AppConfig } from '../config';

import { AuthAppView } from './app/App.view';
import {
  Auth,
  Environment,
  RateLimiter,
  WebSocketSubscription,
} from './app/services';

const { brandConfig } = process.env.APP_CONFIG as unknown as AppConfig;

export default exposeMicroApp({
  modules: [
    RouterPlugin,
    ThemePlugin,
    Brand,
    Locale,
    {
      provide: 'Subscription',
      useClass: WebSocketSubscription,
    },
    SleepDetector,
    RateLimiter,
    Environment,
    {
      provide: RouterOptions,
      useValue: {
        ...(isSharedWorker
          ? {}
          : { createHistory: () => createMemoryHistory() }),
      } as IRouterOptions,
    },
    StoragePlugin,
    Auth,
    {
      provide: 'Prefix',
      useValue: brandConfig.code,
    },
    {
      provide: 'SdkConfig',
      useValue: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        server: process.env.SERVER,
        cachePrefix: `sdk-${brandConfig.code}`,
      } as SDKConfig,
    },
    {
      provide: 'BrandConfig',
      useValue: brandConfig,
    },
  ],
  main: AuthAppView,
  share: {
    name: 'micro-auth',
    type: 'Base',
  },
  renderRoot: () => document.getElementById('app'),
});
