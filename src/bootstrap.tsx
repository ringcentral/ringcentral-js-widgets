import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { filterMessages } from '@ringcentral-integration/commons/lib/messageHelper';
import {
  AccountInfo,
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  AvailabilityMonitorOptions,
  Client,
  ConnectivityManager,
  ConnectivityMonitor,
  DataFetcher,
  DialingPlan,
  Environment,
  EnvironmentOptions,
  ErrorLogger,
  ExtensionDevice,
  ExtensionFeatures,
  ExtensionInfo,
  ExtensionNumberAreaCode,
  ExtensionPhoneNumber,
  OAuth,
  Presence,
  PresenceOptions,
  RateLimiter,
  RegionSettings,
  RingCentralExtensions,
  WebSocketSubscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ConnectivityBadgeView,
  LoginView,
  type LoginViewOptions,
} from '@ringcentral-integration/micro-auth/src/app/views';
import {
  ActivityMatcher,
  ActivityMatcherOptions,
  CompanyContacts,
  ContactMatcher,
  ContactMatcherOptions,
  ContactSearch,
  NumberValidate,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Brand,
  DateTimeFormat,
  Locale,
  SleepDetector,
  Theme,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import { ModalView } from '@ringcentral-integration/micro-core/src/app/views';

import {
  ComposeText,
  ConversationLogger,
  ConversationLoggerOptions,
  ConversationMatcher,
  ConversationMatcherOptions,
  Conversations,
  MessageSender,
  MessageStore,
  MessageStoreOptions,
} from '@ringcentral-integration/micro-message/src/app/services';
import {
  ComposeTextView,
  ConversationsView,
  ConversationView,
} from '@ringcentral-integration/micro-message/src/app/views';
import {
  ActiveCallControl,
  Call,
  CallHistory,
  CallingSettings,
  CallLog,
  CallLogger,
  CallLoggerOptions,
  CallMonitor,
  ForwardingNumber,
  Ringout,
  Softphone,
  Webphone,
  AudioSettings,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  ActiveCallsView,
  CallLogCallCtrlView,
  CallLogSection,
  CallLogView,
  DialerAndCallsTabView,
  DialerView,
  SimpleCallControlView,
  TransferView,
} from '@ringcentral-integration/micro-phone/src/app/views';
import {
  CallingSettingsView,
  RegionSettingsView,
  SettingsView,
} from '@ringcentral-integration/micro-setting/src/app/views';
import {
  createMemoryHistory,
  IRouterOptions,
  isSharedWorker,
  RouterOptions,
  RouterPlugin,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import { exposeMicroApp } from '@ringcentral-integration/next-micro';

import type { AppConfig } from '../config';

function getCurrentDateTimeStamp() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
    dd = `0${dd}`;
  }
  if (mm < 10) {
    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
    mm = `0${mm}`;
  }
  // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'Date'.
  today = `${mm}/${dd}/${yyyy}`;
  return new Date(today).getTime();
}

const appConfig = process.env.APP_CONFIG as unknown as AppConfig;

export default exposeMicroApp({
  modules: [
    DialerAndCallsTabView,
    RegionSettingsView,
    Client,
    Brand,
    Environment,
    Toast,
    Theme,
    Softphone,
    Locale,
    DateTimeFormat,
    Auth,
    OAuth,
    Ringout,
    ConnectivityMonitor,
    ConnectivityManager,
    ConnectivityBadgeView,
    LoginView,
    RateLimiter,
    StoragePlugin,
    AvailabilityMonitor,
    {
      provide: 'AvailabilityMonitorOptions',
      useValue: {
        enabled: true,
      } satisfies AvailabilityMonitorOptions,
    },
    ContactMatcher,
    {
      provide: 'ContactMatcherOptions',
      useValue: {
        ttl: 24 * 60 * 60 * 1000,
        noMatchTtl: 60 * 60 * 1000,
      } satisfies ContactMatcherOptions,
    },
    ExtensionDevice,
    CompanyContacts,
    AccountInfo,
    ExtensionInfo,
    ExtensionFeatures,
    AppFeatures,
    DialingPlan,
    ExtensionPhoneNumber,
    ForwardingNumber,
    RegionSettings,
    NumberValidate,
    CallingSettings,
    CallingSettingsView,
    SettingsView,
    ConversationView,
    ConversationsView,
    SimpleCallControlView,
    Call,
    ExtensionNumberAreaCode,
    {
      provide: 'Subscription',
      useClass: WebSocketSubscription,
    },
    RingCentralExtensions,
    RouterPlugin,
    ThemePlugin,
    CallLog,
    CallHistory,
    DialerView,
    Presence,
    {
      provide: 'PresenceOptions',
      useValue: {
        disableCache: true,
      } satisfies PresenceOptions,
    },
    CallMonitor,
    ActivityMatcher,
    {
      provide: 'ActivityMatcherOptions',
      useValue: {
        ttl: 24 * 60 * 60 * 1000,
        noMatchTtl: 60 * 60 * 1000,
      } satisfies ActivityMatcherOptions,
    },
    CallLogger,
    {
      provide: 'CallLoggerOptions',
      useValue: {
        autoLog: false,
        readyCheckFunction: () => true,
        logFunction: async () => {},
      } satisfies CallLoggerOptions,
    },
    CallLogSection,
    ErrorLogger,
    ActiveCallControl,
    ContactSearch,
    ActiveCallsView,
    TransferView,
    MessageStore,
    Webphone,
    AudioSettings,
    {
      provide: 'MessageStoreOptions',
      useValue: {
        conversationLoadLength: 50,
        messagesFilter: filterMessages,
      } satisfies MessageStoreOptions,
    },
    Conversations,
    MessageSender,
    ComposeTextView,
    ComposeText,
    ConversationLogger,
    {
      provide: 'ConversationLoggerOptions',
      useValue: {
        async logFunction() {},
        readyCheckFunction() {
          return true;
        },
        isAutoUpdate: false,
        isLoggedContact(conversation, lastActivity, item) {
          return lastActivity && item && lastActivity.id === item.id;
        },
        accordWithLogRequirement(conversation: any) {
          const { date } = conversation;
          const dateTimeStamp = new Date(date).getTime();
          const currentDateTimeStamp = getCurrentDateTimeStamp();
          return currentDateTimeStamp === dateTimeStamp;
        },
      } satisfies ConversationLoggerOptions,
    },
    ConversationMatcher,
    {
      provide: 'ConversationMatcherOptions',
      useValue: {
        ttl: 24 * 60 * 60 * 1000,
        noMatchTtl: 60 * 60 * 1000,
      } satisfies ConversationMatcherOptions,
    },
    CallLogCallCtrlView,
    CallLogView,
    SleepDetector,
    DataFetcher,
    ModalView,
    {
      provide: RouterOptions,
      useValue: {
        ...(isSharedWorker
          ? {}
          : { createHistory: () => createMemoryHistory() }),
      } as IRouterOptions,
    },
    {
      provide: 'SdkConfig',
      deps: ['Version'],
      useFactory({ version: appVersion }: { version: string }) {
        return {
          ...appConfig.sdkConfig,
          appVersion,
          appName: appConfig.brandConfig.appName as string,
          cachePrefix: `${appConfig.prefix}-sdk`,
          clearCacheOnRefreshError: false,
          discoveryServer: appConfig.sdkConfig!.discoveryServer,
        } satisfies SDKConfig;
      },
    },
    { provide: 'BrandConfig', useValue: appConfig.brandConfig },
    {
      provide: 'ErrorLoggerOptions',
      useValue: {
        environment: appConfig.environment,
        appVersion: appConfig.version.appVersion,
        sentryConfig: null,
      },
    },
    {
      provide: 'EnvironmentOptions',
      useValue: {
        defaultRecordingHost:
          'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html',
      } satisfies EnvironmentOptions,
    },
    {
      provide: 'Version',
      useValue: appConfig.version.appVersion,
    },
    {
      provide: 'Prefix',
      useValue: appConfig.prefix,
    },
    {
      provide: 'LocaleOptions',
      useValue: {
        defaultLocale: appConfig.defaultLocale,
      },
    },
    {
      provide: 'LoginViewOptions',
      useValue: {
        routeAfterLogin: false,
      } satisfies LoginViewOptions,
    },
  ],
  share: {
    name: 'micro-next-commons',
    type: 'Base',
  },
  renderRoot: () => document.getElementById('viewport'),
});
