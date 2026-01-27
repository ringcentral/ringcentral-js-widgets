import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import {
  AccountInfo,
  Auth,
  ExtensionInfo,
  RateLimiter,
  WebSocketSubscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { LoginViewOptions } from '@ringcentral-integration/micro-auth/src/app/views';
import {
  AccountContacts,
  AddressBook,
  CompanyContacts,
  ContactMatcher,
  Contacts,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Brand,
  Locale,
  LocaleOptions,
  SleepDetector,
} from '@ringcentral-integration/micro-core/src/app/services';
import { ModalView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  createMemoryHistory,
  IRouterOptions,
  isSharedWorker,
  RouterOptions,
  RouterPlugin,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import { exposeMicroApp } from '@ringcentral-integration/next-micro';

import type { AppConfig, BrandConfig } from '../config';

import { PhoneAppView } from './app/App.view';
import {
  ActiveCallControl,
  AudioSettings,
  Call,
  CallingSettings,
  CallLogger,
  type CallLoggerOptions,
  CallMonitor,
  Softphone,
  Webphone,
  type WebphoneOptions,
} from './app/services';
import { DialerView } from './app/views';

const { brandConfig } = process.env.APP_CONFIG as unknown as AppConfig;

export default exposeMicroApp({
  modules: [
    CallLogger,
    {
      provide: 'CallLoggerOptions',
      useValue: {
        logFunction: async () => {
          // TODO: implement log function
        },
        readyCheckFunction: () => true,
      } satisfies CallLoggerOptions,
    },
    AccountInfo,
    Auth,
    ActiveCallControl,
    CallMonitor,
    ContactSearch,
    ContactMatcher,
    AudioSettings,
    Webphone,
    CompanyContacts,
    Softphone,
    Call,
    RateLimiter,
    DialerView,
    ExtensionInfo,
    CallingSettings, // TODO: check optional injections
    ModalView,
    SleepDetector,
    RouterPlugin,
    ThemePlugin,
    Brand,
    Locale,
    Contacts,
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
      provide: 'WebphoneOptions',
      useFactory: (brandConfig: BrandConfig, sdkConfig: SDKConfig) =>
        ({
          appKey: sdkConfig.clientId!,
          appName: brandConfig.appName as string,
          appVersion: '0.0.1',
          webphoneLogLevel: 3,
        } satisfies WebphoneOptions),
      deps: ['BrandConfig', 'SdkConfig'],
    },
    {
      provide: 'LoginViewOptions',
      useValue: {
        routeAfterLogin: '/dialer',
      } satisfies LoginViewOptions,
    },
    {
      provide: 'ContactSources',
      deps: [AccountContacts, AddressBook],
      useFactory: (
        accountContacts: AccountContacts,
        addressBook: AddressBook,
      ) => [accountContacts, addressBook],
    },
  ],
  main: PhoneAppView,
  share: {
    name: 'micro-phone',
    type: 'Base',
  },
  renderRoot: () => document.getElementById('app'),
});
