import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import {
  WebSocketSubscription,
  Auth,
  ExtensionInfo,
  AccountInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { LoginViewOptions } from '@ringcentral-integration/micro-auth/src/app/views';
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

import type { AppConfig } from '../config';

import { ContactsAppView } from './app/App.view';
import { AccountContacts, AddressBook, Contacts } from './app/services';

const { brandConfig } = process.env.APP_CONFIG as unknown as AppConfig;

export default exposeMicroApp({
  modules: [
    AccountInfo,
    ExtensionInfo,
    Auth,
    SleepDetector,
    RouterPlugin,
    ThemePlugin,
    Brand,
    Locale,
    {
      provide: 'Subscription',
      useClass: WebSocketSubscription,
    },
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
      provide: 'ContactSources',
      deps: [AccountContacts, AddressBook],
      useFactory: (
        accountContacts: AccountContacts,
        addressBook: AddressBook,
      ) => [accountContacts, addressBook],
    },
    {
      provide: 'LoginViewOptions',
      useValue: {
        routeAfterLogin: '/contacts',
      } satisfies LoginViewOptions,
    },
    Contacts,
  ],
  main: ContactsAppView,
  share: {
    name: 'micro-contacts',
    type: 'Base',
  },
  renderRoot: () => document.getElementById('app'),
});
