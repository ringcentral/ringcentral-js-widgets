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

import { CoreAppView } from './app/App.view';
import { ThemePlugin } from './app/plugins';
import { Brand, Locale, LocaleOptions, SleepDetector } from './app/services';

const { brandConfig } = process.env.APP_CONFIG as unknown as AppConfig;

export default exposeMicroApp({
  modules: [
    RouterPlugin,
    ThemePlugin,
    Brand,
    Locale,
    SleepDetector,
    {
      provide: RouterOptions,
      useValue: {
        ...(isSharedWorker
          ? {}
          : { createHistory: () => createMemoryHistory() }),
      } as IRouterOptions,
    },
    StoragePlugin,
    {
      provide: 'BrandConfig',
      useValue: brandConfig,
    },
    {
      provide: 'Prefix',
      useValue: brandConfig.code,
    },
  ],
  main: CoreAppView,
  share: {
    name: 'micro-core',
    type: 'Base',
  },
  renderRoot: () => document.getElementById('app'),
});
