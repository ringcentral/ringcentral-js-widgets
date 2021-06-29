import { SDK } from '@ringcentral/sdk';
import { RingCentralClient } from '@ringcentral-integration/commons/lib/RingCentralClient';

import { ModuleFactory } from '@ringcentral-integration/commons/lib/di';
import RcModule from '@ringcentral-integration/commons/lib/RcModule';

import Alert from '@ringcentral-integration/commons/modules/Alert';
import Auth from '@ringcentral-integration/commons/modules/Auth';
import { Brand } from '@ringcentral-integration/commons/modules/BrandV2';
import AccountInfo from '@ringcentral-integration/commons/modules/AccountInfo';
import ConnectivityMonitor from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import DateTimeFormat from '@ringcentral-integration/commons/modules/DateTimeFormat';
import DialingPlan from '@ringcentral-integration/commons/modules/DialingPlan';
import ExtensionInfo from '@ringcentral-integration/commons/modules/ExtensionInfo';
import Environment from '@ringcentral-integration/commons/modules/Environment';
import GlobalStorage from '@ringcentral-integration/commons/modules/GlobalStorage';
import Locale from '@ringcentral-integration/commons/modules/Locale';
import RolesAndPermissions from '@ringcentral-integration/commons/modules/RolesAndPermissions';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import RegionSettings from '@ringcentral-integration/commons/modules/RegionSettings';
import RateLimiter from '@ringcentral-integration/commons/modules/RateLimiter';
import Subscription from '@ringcentral-integration/commons/modules/Subscription';
import Storage from '@ringcentral-integration/commons/modules/Storage';

import OAuth from '@ringcentral-integration/widgets/modules/ProxyFrameOAuth';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';
import { ConnectivityManager } from '@ringcentral-integration/widgets/modules/ConnectivityManager';
import ConnectivityBadgeUI from '@ringcentral-integration/widgets/modules/ConnectivityBadgeUI';
import SettingsUI from '@ringcentral-integration/widgets/modules/SettingsUI';
import RegionSettingsUI from '@ringcentral-integration/widgets/modules/RegionSettingsUI';
import LoginUI from '@ringcentral-integration/widgets/modules/LoginUI';
import { AlertUI } from '@ringcentral-integration/widgets/modules/AlertUI';

// user Dependency Injection with decorator to create a phone class
// https://github.com/ringcentral/ringcentral-js-integration-commons/blob/master/docs/dependency-injection.md
@ModuleFactory({
  providers: [
    { provide: 'Alert', useClass: Alert },
    { provide: 'AlertUI', useClass: AlertUI },
    { provide: 'RegionSettingsUI', useClass: RegionSettingsUI },
    { provide: 'Brand', useClass: Brand },
    { provide: 'Locale', useClass: Locale },
    { provide: 'GlobalStorage', useClass: GlobalStorage },
    { provide: 'ConnectivityMonitor', useClass: ConnectivityMonitor },
    { provide: 'ConnectivityManager', useClass: ConnectivityManager },
    { provide: 'ConnectivityBadgeUI', useClass: ConnectivityBadgeUI },
    { provide: 'SettingsUI', useClass: SettingsUI },
    { provide: 'LoginUI', useClass: LoginUI },
    { provide: 'Auth', useClass: Auth },
    { provide: 'OAuth', useClass: OAuth },
    { provide: 'Storage', useClass: Storage },
    { provide: 'RateLimiter', useClass: RateLimiter },
    { provide: 'Subscription', useClass: Subscription },
    { provide: 'DateTimeFormat', useClass: DateTimeFormat },
    { provide: 'RouterInteraction', useClass: RouterInteraction },
    { provide: 'AccountInfo', useClass: AccountInfo },
    { provide: 'Environment', useClass: Environment },
    { provide: 'RegionSettings', useClass: RegionSettings },
    { provide: 'RolesAndPermissions', useClass: RolesAndPermissions },
    { provide: 'ExtensionFeatures', useClass: ExtensionFeatures },
    { provide: 'ExtensionInfo', useClass: ExtensionInfo },
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
      { provide: 'OAuthOptions', useValue: { redirectUri }, spread: true },
    ],
  })
  class Phone extends BasePhone {}
  return Phone.create();
}
