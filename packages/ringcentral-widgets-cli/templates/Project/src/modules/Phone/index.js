import { SDK } from '@ringcentral/sdk';
import { RingCentralClient } from '@ringcentral-integration/commons/lib/RingCentralClient';

import { ModuleFactory } from '@ringcentral-integration/commons/lib/di';
import RcModule from '@ringcentral-integration/commons/lib/RcModule';
import { LocalForageStorage } from '@ringcentral-integration/commons/lib/LocalForageStorage';

import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { AlertUI } from '@ringcentral-integration/widgets/modules/AlertUI';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Auth } from '@ringcentral-integration/commons/modules/Auth';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { DataFetcherV2 } from '@ringcentral-integration/commons/modules/DataFetcherV2';
import { DialingPlan } from '@ringcentral-integration/commons/modules/DialingPlan';
import { Environment } from '@ringcentral-integration/commons/modules/Environment';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import { ExtensionPhoneNumber } from '@ringcentral-integration/commons/modules/ExtensionPhoneNumber';
import { ExtensionNumberAreaCode } from '@ringcentral-integration/commons/modules/ExtensionNumberAreaCode';
import { GlobalStorage } from '@ringcentral-integration/commons/modules/GlobalStorage';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Storage } from '@ringcentral-integration/commons/modules/Storage';
import { SleepDetector } from '@ringcentral-integration/commons/modules/SleepDetector';
import { TabManager } from '@ringcentral-integration/commons/modules/TabManager';
import { RingCentralExtensions } from '@ringcentral-integration/commons/modules/RingCentralExtensions';
import { WebSocketSubscription as Subscription } from '@ringcentral-integration/commons/modules/WebSocketSubscription';
import { ConnectivityBadgeUI } from '@ringcentral-integration/widgets/modules/ConnectivityBadgeUI';
import { ConnectivityManager } from '@ringcentral-integration/widgets/modules/ConnectivityManager';
import { LoginUI } from '@ringcentral-integration/widgets/modules/LoginUI';
import { OAuth } from '@ringcentral-integration/widgets/modules/OAuth';
import { RegionSettingsUI } from '@ringcentral-integration/widgets/modules/RegionSettingsUI';
import { RouterInteraction } from '@ringcentral-integration/widgets/modules/RouterInteraction';
import { SettingsUI } from '@ringcentral-integration/widgets/modules/SettingsUI';

// user Dependency Injection with decorator to create a phone class
// https://github.com/ringcentral/ringcentral-js-integration-commons/blob/master/docs/dependency-injection.md
@ModuleFactory({
  providers: [
    { provide: 'Alert', useClass: Alert },
    { provide: 'AlertUI', useClass: AlertUI },
    { provide: 'RegionSettingsUI', useClass: RegionSettingsUI },
    { provide: 'Brand', useClass: Brand },
    { provide: 'Locale', useClass: Locale },
    { provide: 'DataFetcherV2', useClass: DataFetcherV2 },
    { provide: 'SleepDetector', useClass: SleepDetector },
    { provide: 'GlobalStorage', useClass: GlobalStorage },
    { provide: 'ConnectivityMonitor', useClass: ConnectivityMonitor },
    { provide: 'ConnectivityManager', useClass: ConnectivityManager },
    { provide: 'ConnectivityBadgeUI', useClass: ConnectivityBadgeUI },
    { provide: 'SettingsUI', useClass: SettingsUI },
    { provide: 'LoginUI', useClass: LoginUI },
    { provide: 'Auth', useClass: Auth },
    { provide: 'OAuth', useClass: OAuth },
    { provide: 'AuthOptions', useValue: { usePKCE: true } },
    { provide: 'Storage', useClass: Storage },
    {
      provide: 'StorageOptions',
      useValue: {
        StorageProvider: LocalForageStorage, // IndexedDB
        disableInactiveTabsWrite: true,
      },
    },
    { provide: 'RateLimiter', useClass: RateLimiter },
    { provide: 'TabManager', useClass: TabManager },
    { provide: 'RingCentralExtensions', useClass: RingCentralExtensions },
    {
      provide: 'RingCentralExtensionsOptions',
      useValue: { disconnectOnInactive: true },
    },
    { provide: 'Subscription', useClass: Subscription },
    { provide: 'DateTimeFormat', useClass: DateTimeFormat },
    { provide: 'RouterInteraction', useClass: RouterInteraction },
    { provide: 'AccountInfo', useClass: AccountInfo },
    { provide: 'Environment', useClass: Environment },
    { provide: 'RegionSettings', useClass: RegionSettings },
    { provide: 'ExtensionFeatures', useClass: ExtensionFeatures },
    { provide: 'AppFeatures', useClass: AppFeatures },
    { provide: 'ExtensionInfo', useClass: ExtensionInfo },
    { provide: 'ExtensionPhoneNumber', useClass: ExtensionPhoneNumber },
    { provide: 'ExtensionNumberAreaCode', useClass: ExtensionNumberAreaCode },
    { provide: 'DialingPlan', useClass: DialingPlan },
    {
      provide: 'Client',
      useFactory: ({ sdkConfig }) => new RingCentralClient(new SDK(sdkConfig)),
      deps: [{ dep: 'SdkConfig', useParam: true }],
    },
  ],
})
export default class BasePhone extends RcModule {
  constructor(options) {
    super(options);
    const { appConfig } = options;
    this._appConfig = appConfig;
  }

  initialize() {
    this.store.subscribe(() => {
      if (this.auth.ready) {
        if (this.routerInteraction.currentPath !== '/' && !this.auth.loggedIn) {
          this.routerInteraction.push('/');
        } else if (
          this.routerInteraction.currentPath === '/' &&
          this.auth.loggedIn
        ) {
          this.routerInteraction.push('/settings');
        }
      }
    });
  }

  get name() {
    return this._appConfig.name;
  }

  get version() {
    return this._appConfig.version;
  }

  get _actionTypes() {
    return null;
  }
}

export function createPhone({
  prefix,
  apiConfig,
  brandConfig,
  appVersion,
  redirectUri,
}) {
  @ModuleFactory({
    providers: [
      {
        provide: 'Prefix',
        useValue: prefix,
      },
      {
        provide: 'SdkConfig',
        useValue: {
          ...apiConfig,
          cachePrefix: `sdk-${prefix}`,
          clearCacheOnRefreshError: false,
        },
      },
      {
        provide: 'AppConfig',
        useValue: { name: brandConfig.appName, version: appVersion },
      },
      { provide: 'BrandConfig', useValue: brandConfig },
      { provide: 'OAuthOptions', useValue: { redirectUri } },
    ],
  })
  class Phone extends BasePhone {}
  return Phone.create();
}
