import { Brand } from 'ringcentral-integration/modules/BrandV2';
import Locale from 'ringcentral-integration/modules/Locale';
import { CallHistory } from 'ringcentral-integration/modules/CallHistoryV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { ConnectivityMonitor } from 'ringcentral-integration/modules/ConnectivityMonitorV2';
import { RateLimiter } from 'ringcentral-integration/modules/RateLimiterV2';
import { DateTimeFormat } from 'ringcentral-integration/modules/DateTimeFormatV2';
import { RolesAndPermissions } from 'ringcentral-integration/modules/RolesAndPermissionsV2';
import { ContactMatcher } from 'ringcentral-integration/modules/ContactMatcherV2';
// import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';
import { ContactSearch } from 'ringcentral-integration/modules/ContactSearchV2';
// import ConnectivityManager from 'ringcentral-widgets/modules/ConnectivityManager';

export interface Deps {
  brand: Brand;
  callHistory: CallHistory;
  locale: Locale;
  regionSettings: RegionSettings;
  connectivityMonitor: ConnectivityMonitor;
  rateLimiter: RateLimiter;
  dateTimeFormat: DateTimeFormat;
  rolesAndPermissions: RolesAndPermissions;
  contactMatcher: ContactMatcher;
  // routerInteraction: RouterInteraction;
  contactSearch: ContactSearch;
  // connectivityManager: ConnectivityManager;
}
