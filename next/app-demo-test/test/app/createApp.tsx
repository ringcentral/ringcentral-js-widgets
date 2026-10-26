/* eslint-disable no-nested-ternary */
/**
 * Juno (non spring-ui) demo app the app-demo-test suite runs against.
 * `@ringcentral-integration/app-demo` is the spring-ui app and is covered by
 * its own tests; this suite targets the juno views.
 */
import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import {
  AccountInfo,
  Analytics,
  AnalyticsOptions,
  Auth,
  AvailabilityMonitor,
  ConnectivityMonitor,
  Environment,
  ExtensionInfo,
  ExtensionNumberAreaCode,
  FeatureConfiguration,
  Presence,
  RateLimiter,
  TierChecker,
  TierCheckerOptions,
  WebSocketSubscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { LoginViewOptions } from '@ringcentral-integration/micro-auth/src/app/views';
import {
  AccountContacts,
  AddressBook,
  AddressBookOptions,
  CompanyContacts,
  CompanyContactsOptions,
  ContactInitiator,
  ContactMatcher,
  ContactSearch,
  Contacts,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ContactDetailsView } from '@ringcentral-integration/micro-contacts/src/app/views';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Brand,
  BrandConfig,
  Locale,
  LocaleOptions,
  SleepDetector,
} from '@ringcentral-integration/micro-core/src/app/services';
import { ModalView } from '@ringcentral-integration/micro-core/src/app/views';
import { createAppWithCoworker } from '@ringcentral-integration/micro-coworker/src/bootstrap';
import type { RcVideoOptions } from '@ringcentral-integration/micro-meeting/src/app/services';
import { ComposeText } from '@ringcentral-integration/micro-message/src/app/services';
import {
  ActiveCallControl,
  AudioSettings,
  Call,
  CallMonitor,
  CallerId,
  CallingSettings,
  RingtoneConfiguration,
  Softphone,
  VolumeInspector,
  Webphone,
  WebphoneOptions,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  DialerView,
  MergeCallConfirmView,
} from '@ringcentral-integration/micro-phone/src/app/views';
import {
  QuickAccess,
  UserGuide,
} from '@ringcentral-integration/micro-setting/src/app/services';
import {
  IRouterOptions,
  RouterOptions,
  RouterPlugin,
  StoragePlugin,
  createMemoryHistory,
  render,
} from '@ringcentral-integration/next-core';

import type { AppConfig } from '../../../micro-core/config';

import { AppView } from './App.view';

export const createApp = (
  options?: Parameters<typeof createAppWithCoworker>[0]['share'],
) => {
  const config = process.env.APP_CONFIG as unknown as AppConfig;
  const {
    prefix,
    brandConfig,
    version,
    // analyticsKey,
    // sentryConfig,
  } = config;
  const sdkConfig = config.sdkConfig!;
  const { appVersion } = version;

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

  return createAppWithCoworker({
    modules: [
      TierChecker,
      {
        provide: 'TierCheckerOptions',
        // Use salesforce for demo example
        useValue: { crmFeature: 'SalesForce' } satisfies TierCheckerOptions,
      },
      CallerId,
      AvailabilityMonitor,
      RouterPlugin,
      ThemePlugin,
      Webphone,
      ContactDetailsView,
      CallingSettings,
      Presence,
      QuickAccess,
      UserGuide,
      Contacts,
      CompanyContacts,
      // TODO: add `CommunicationSetupPanel` and remove `AccountContacts` and `AddressBook` explicitly inject
      AccountContacts,
      AddressBook,
      {
        provide: 'ContactSources',
        deps: [AccountContacts, AddressBook],
        useFactory: (
          accountContacts: AccountContacts,
          addressBook: AddressBook,
        ) => [accountContacts, addressBook],
      },
      AccountInfo,
      ExtensionInfo,
      ExtensionNumberAreaCode,
      Auth,
      ConnectivityMonitor,
      Brand,
      Locale,
      Softphone,
      CallMonitor,
      Call,
      ContactMatcher,
      SleepDetector,
      AudioSettings,
      RingtoneConfiguration,
      VolumeInspector,
      ContactSearch,
      RateLimiter,
      ActiveCallControl,
      MergeCallConfirmView,
      ComposeText,
      DialerView,
      Environment,
      ModalView,
      {
        provide: 'WebphoneOptions',
        useFactory: (brandConfig: BrandConfig, sdkConfig: SDKConfig) =>
          ({
            appKey: sdkConfig.clientId!,
            appName: brandConfig.appName as string,
            appVersion: '0.0.1',
            webphoneLogLevel: 3,
          }) satisfies WebphoneOptions,
        deps: ['BrandConfig', 'SdkConfig'],
      },
      { provide: 'Subscription', useClass: WebSocketSubscription },
      {
        provide: RouterOptions,
        useValue: {
          createHistory: () => createMemoryHistory(),
        } satisfies IRouterOptions,
      },
      StoragePlugin,
      {
        provide: 'Prefix',
        useValue: prefix,
      },
      {
        provide: 'SdkConfig',
        useFactory: () =>
          ({
            ...sdkParameter,
          }) satisfies SDKConfig,
      },
      {
        provide: 'AvailabilityMonitorOptions',
        useValue: {
          enabled: true,
        },
      },
      {
        provide: 'BrandConfig',
        useValue: { ...brandConfig },
      },
      Analytics,
      {
        provide: 'AnalyticsOptions',
        useValue: {
          analyticsKey: '',
          appVersion: '',
        } satisfies AnalyticsOptions,
      },
      {
        provide: 'LoginViewOptions',
        useValue: {
          routeAfterLogin: '/dialer',
        } satisfies LoginViewOptions,
      },
      {
        provide: 'CompanyContactsOptions',
        useValue: {
          polling: false,
        } satisfies CompanyContactsOptions,
      },
      {
        provide: 'AddressBookOptions',
        useValue: {
          polling: false,
        } satisfies AddressBookOptions,
      },
      {
        provide: 'FeatureConfiguration',
        useValue: {
          CDC: true,
          EDP: brandConfig.enableEDP,
        } satisfies FeatureConfiguration,
      },
      {
        provide: 'ExtensionInfoOptions',
        useValue: {
          isMultipleSiteEnabled: true,
        },
      },
      {
        provide: 'MeetingOptions',
        useValue: {
          enablePersonalMeeting: true,
          enableServiceWebSettings: true,
        },
      },
      {
        provide: 'RcVideoOptions',
        useValue: {
          enablePersonalMeeting: true,
          enableInvitationApi: true,
          enableInvitationBridgesApi: true,
          enableInvitationApiFailedToast: true,
        } satisfies RcVideoOptions,
      },
      ContactInitiator,
    ],
    main: AppView,
    render,
    share: options ?? {
      name: 'app-demo',
      type: 'Base',
    },
  }).then((app) => {
    if (global.document) {
      app.bootstrap(document.getElementById('app'));
    }
  });
};
