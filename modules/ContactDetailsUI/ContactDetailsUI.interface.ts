import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Call } from '@ringcentral-integration/commons/modules/CallV2';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { Contacts } from '@ringcentral-integration/commons/modules/ContactsV2';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import { ConnectivityManager } from '../ConnectivityManager';
import { DialerUI } from '../DialerUI';
import { RouterInteraction } from '../RouterInteraction';

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
  appFeatures: AppFeatures;
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
