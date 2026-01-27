import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import {
  AccountInfo,
  Auth,
  WebSocketSubscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { LoginViewOptions } from '@ringcentral-integration/micro-auth/src/app/views';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Brand,
  Locale,
  SleepDetector,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  createMemoryHistory,
  IRouterOptions,
  isSharedWorker,
  RouterOptions,
  RouterPlugin,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import { exposeMicroApp } from '@ringcentral-integration/next-micro';

import { AppConfig } from '../config';

import { SettingAppView } from './app/App.view';

const { brandConfig } = process.env.APP_CONFIG as unknown as AppConfig;

export default exposeMicroApp({
  modules: [
    Auth,
    SleepDetector,
    RouterPlugin,
    ThemePlugin,
    Brand,
    Locale,
    {
      provide: RouterOptions,
      useValue: {
        ...(isSharedWorker
          ? {}
          : { createHistory: () => createMemoryHistory() }),
      } as IRouterOptions,
    },
    {
      provide: 'Subscription',
      useClass: WebSocketSubscription,
    },
    StoragePlugin,
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
    {
      provide: 'LoginViewOptions',
      useValue: {
        routeAfterLogin: '/settings',
      } satisfies LoginViewOptions,
    },
    AccountInfo,
  ],
  main: SettingAppView,
  share: {
    name: 'micro-setting',
    type: 'Base',
  },
  renderRoot: () => document.getElementById('app'),
});
