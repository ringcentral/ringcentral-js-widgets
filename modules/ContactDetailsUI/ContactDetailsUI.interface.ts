import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { ContactSearch } from 'ringcentral-integration/modules/ContactSearchV2';
import { Contacts } from 'ringcentral-integration/modules/ContactsV2';
import { ExtensionInfo } from 'ringcentral-integration/modules/ExtensionInfoV2';
import { RolesAndPermissions } from 'ringcentral-integration/modules/RolesAndPermissionsV2';
import { RateLimiter } from 'ringcentral-integration/modules/RateLimiterV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { Call } from 'ringcentral-integration/modules/CallV2';
import { ComposeText } from 'ringcentral-integration/modules/ComposeTextV2';
import ConnectivityManager from '../ConnectivityManager';
import RouterInteraction from '../RouterInteraction';
import DialerUI from '../DialerUI';

export interface ContactDetailsUIOptions {
  composeTextRoute?: string;
  dialerRoute?: string;
}

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  contactSearch: ContactSearch;
  contacts: Contacts;
  extensionInfo: ExtensionInfo;
  rolesAndPermissions: RolesAndPermissions;
  rateLimiter: RateLimiter;
  connectivityManager: ConnectivityManager;
  regionSettings: RegionSettings;
  call: Call;
  dialerUI: DialerUI;
  composeText: ComposeText;
  contactDetailsUIOptions?: ContactDetailsUIOptions;
}

export interface RouteParams {
  type: string;
  id: string;
  direct?: boolean;
}

export interface InitParams {
  contactType: string;
  contactId: string;
}

export interface GetUIFunctions {
  params: InitParams;
}
