import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { Call } from '@ringcentral-integration/commons/modules/Call';
import type { ComposeText } from '@ringcentral-integration/commons/modules/ComposeText';
import type { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import type { Contacts } from '@ringcentral-integration/commons/modules/Contacts';
import type { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import type { ConnectivityManager } from '../ConnectivityManager';
import type { DialerUI } from '../DialerUI';
import type { RouterInteraction } from '../RouterInteraction';

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
  accountInfo?: AccountInfo;
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
