import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { CallHistory } from '@ringcentral-integration/commons/modules/CallHistory';
import { CallLogger } from '@ringcentral-integration/commons/modules/CallLogger';
import { Call } from '@ringcentral-integration/commons/modules/Call';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeText';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import {
  OnCreateContactOptions,
  OnLogCallOptions,
} from '../CallsListUI/CallsListUI.interface';
import { ConnectivityManager } from '../ConnectivityManager';
import { ContactDetailsUI } from '../ContactDetailsUI';
import { OnViewContactOptions } from '../ConversationsUI';
import { DialerUI } from '../DialerUI';
import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  locale: Locale;
  brand: Brand;
  callHistory: CallHistory;
  regionSettings: RegionSettings;
  connectivityMonitor: ConnectivityMonitor;
  connectivityManager: ConnectivityManager;
  rateLimiter: RateLimiter;
  appFeatures: AppFeatures;
  contactMatcher: ContactMatcher;
  routerInteraction: RouterInteraction;
  contactSearch: ContactSearch;
  callLogger?: CallLogger;
  call?: Call;
  composeText?: ComposeText;
  dialerUI?: DialerUI;
  contactDetailsUI?: ContactDetailsUI;
  extensionInfo?: ExtensionInfo;
  dateTimeFormat: DateTimeFormat;
  accountInfo: AccountInfo;
}

export interface CallHistoryUIComponentProps {
  enableContactFallback?: boolean;
  useNewList?: boolean;
  onCreateContact?: (options: OnCreateContactOptions) => any;
  dateTimeFormatter?: (
    ...args: Parameters<DateTimeFormat['formatDateTime']>
  ) => string;
  onLogCall?: (options: OnLogCallOptions) => any;
  isLoggedContact?: boolean;
  dialerRoute?: string;
  composeTextRoute?: string;
  formatPhone: (phoneNumber: string) => string | undefined;
  onViewContact: (options: OnViewContactOptions) => any;
}
