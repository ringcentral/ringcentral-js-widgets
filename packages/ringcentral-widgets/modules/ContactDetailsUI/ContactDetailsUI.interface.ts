import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Call } from '@ringcentral-integration/commons/modules/Call';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeText';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { Contacts } from '@ringcentral-integration/commons/modules/Contacts';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

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
