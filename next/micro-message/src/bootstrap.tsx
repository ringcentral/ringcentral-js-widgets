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
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Brand,
  Locale,
  LocaleOptions,
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
import {
  exposeMicroApp,
  globalTransport,
  type GlobalTransport,
} from '@ringcentral-integration/next-micro';

import { AppConfig } from '../config';

import { type IInteractions, MessageAppView } from './app/App.view';
import { ConversationLogger, ConversationLoggerOptions } from './app/services';

const { brandConfig } = process.env.APP_CONFIG as unknown as AppConfig;

export default exposeMicroApp({
  modules: [
    ContactMatcher,
    ConversationLogger,
    {
      provide: 'ConversationLoggerOptions',
      useValue: {
        async logFunction(data: any) {
          await (globalTransport as GlobalTransport<IInteractions>).emit(
            'logConversation',
            data,
          );
        },
        readyCheckFunction() {
          return true;
        },
        isAutoUpdate: false,
        isLoggedContact(conversation, lastActivity, item) {
          return lastActivity && item && lastActivity.id === item.id;
        },
        accordWithLogRequirement(conversation: any) {
          return true;
        },
      } satisfies ConversationLoggerOptions,
    },
    Auth,
    ExtensionInfo,
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
        routeAfterLogin: '/messages',
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
    CompanyContacts,
    ContactSearch,
    RateLimiter,
    AccountInfo,
  ],
  main: MessageAppView,
  share: {
    name: 'micro-message',
    type: 'Base',
  },
  renderRoot: () => document.getElementById('app'),
});
