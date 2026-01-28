import type { BrandConfig as BaseBrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import {
  AccountInfo,
  Analytics,
  AvailabilityMonitor,
  type AvailabilityMonitorOptions,
  ConnectivityMonitor,
  Environment,
  ExtensionInfo,
  ExtensionNumberAreaCode,
  Presence,
  RateLimiter,
  WebSocketSubscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AccountContacts,
  AddressBook,
  CompanyContacts,
  ContactInitiator,
  Contacts,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ContactDetailsView } from '@ringcentral-integration/micro-contacts/src/app/views';
import {
  BlockPlugin,
  SpringThemePlugin,
  ThemePlugin,
} from '@ringcentral-integration/micro-core/src/app/plugins';
import type {
  BrandConfig,
  BrowserLoggerOptions,
  LocaleOptions,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  Brand,
  Locale,
  SleepDetector,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  ModalView,
  ModalViewOptions,
} from '@ringcentral-integration/micro-core/src/app/views';
import type { createAppWithCoworker } from '@ringcentral-integration/micro-coworker/src/bootstrap';
import {
  ComposeText,
  FaxSender,
} from '@ringcentral-integration/micro-message/src/app/services';
import type { WebphoneOptions } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  ActiveCallControl,
  AudioSettings,
  Call,
  CallerId,
  CallingSettings,
  CallMonitor,
  RingtoneConfiguration,
  Softphone,
  VolumeInspector,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import {
  QuickAccess,
  UserGuide,
} from '@ringcentral-integration/micro-setting/src/app/services';
import type {
  InitiatorOptions,
  IRouterOptions,
  ISharedAppOptions,
} from '@ringcentral-integration/next-core';
import {
  createMemoryHistory,
  createSharedApp,
  render,
  RouterOptions,
  RouterPlugin,
  StoragePlugin,
} from '@ringcentral-integration/next-core';

import { AppView } from './App.view';

interface CreateAppEntryOptions<
  T extends typeof createAppWithCoworker | typeof createSharedApp,
> {
  appVersion: string;
  prefix?: string;
  brandConfig: BaseBrandConfig;
  sdkConfig: SDKConfig;
  modules: Parameters<T>[0]['modules'];
  share: ISharedAppOptions;
}

/**
 * create app entry config
 */
export const getCommonAppConfig = <
  T extends typeof createAppWithCoworker | typeof createSharedApp,
>({
  appVersion,
  prefix,
  brandConfig,
  sdkConfig,
  modules = [],
  share,
}: CreateAppEntryOptions<T>) => {
  const { defaultLocale } = brandConfig;

  if (process.env.NODE_ENV !== 'production') {
    if (!prefix) {
      throw new Error('prefix is required');
    }
  }

  const sdkParameter: SDKConfig = {
    ...sdkConfig,
    clientId: sdkConfig.clientId,
    clientSecret: sdkConfig.clientSecret,
    appVersion,
    appName: brandConfig.appName as string,
    cachePrefix: `sdk-${prefix}`,
    clearCacheOnRefreshError: false,
    discoveryServer: sdkConfig.discoveryServer,
    enableDiscovery: sdkConfig.enableDiscovery ?? true,
  };

  return {
    modules: [
      // plugin
      SpringThemePlugin,
      StoragePlugin,
      RouterPlugin,
      ThemePlugin,
      BlockPlugin,
      // services
      Analytics,
      CallerId,
      AvailabilityMonitor,
      Webphone,
      CallingSettings,
      Presence,
      QuickAccess,
      UserGuide,
      Contacts,
      CompanyContacts,
      AccountContacts,
      AddressBook,
      AccountInfo,
      ExtensionInfo,
      ExtensionNumberAreaCode,
      ConnectivityMonitor,
      Brand,
      Locale,
      Softphone,
      CallMonitor,
      Call,
      SleepDetector,
      AudioSettings,
      RingtoneConfiguration,
      VolumeInspector,
      ContactSearch,
      RateLimiter,
      ActiveCallControl,
      ComposeText,
      FaxSender,
      Environment,
      ContactInitiator,
      // views
      ContactDetailsView,
      DialerView,
      ModalView,
      // options
      {
        provide: 'Version',
        useValue: appVersion,
      },
      {
        provide: 'WebphoneOptions',
        useFactory: (brandConfig_2: BrandConfig, sdkConfig_1: SDKConfig) =>
          ({
            // enableContactMatchWhenNewCall: true,
            appKey: sdkConfig_1.clientId!,
            appName: brandConfig_2.appName as string,
            appVersion,
          } satisfies WebphoneOptions),
        deps: ['BrandConfig', 'SdkConfig'],
      },
      { provide: 'Subscription', useClass: WebSocketSubscription },
      {
        provide: RouterOptions,
        useValue: {
          createHistory: () => createMemoryHistory(),
        } satisfies IRouterOptions,
      },
      {
        provide: 'LocaleOptions',
        useValue: {
          defaultLocale,
        } satisfies LocaleOptions,
      },
      {
        provide: 'Prefix',
        useValue: prefix,
      },
      {
        provide: 'SdkConfig',
        useValue: {
          ...sdkParameter,
        } satisfies SDKConfig,
      },
      {
        provide: 'AvailabilityMonitorOptions',
        useValue: {
          enabled: true,
        } satisfies AvailabilityMonitorOptions,
      },
      {
        provide: 'BrandConfig',
        useValue: { ...brandConfig },
      },
      {
        provide: 'BrowserLoggerOptions',
        useValue: {
          worker: share.worker,
        } satisfies BrowserLoggerOptions,
      },
      {
        provide: 'InitiatorOptions',
        useFactory: (locale: Locale) =>
          ({
            enableNewHostDetection: true,
            getCurrentLocale: () => locale.currentLocale,
          } satisfies InitiatorOptions),
        deps: [Locale],
      },
      {
        provide: 'ModalViewOptions',
        useValue: {
          isCompact: true,
        } satisfies ModalViewOptions,
      },
      ...modules,
    ],
    main: AppView,
    render,
    share,
  };
};
