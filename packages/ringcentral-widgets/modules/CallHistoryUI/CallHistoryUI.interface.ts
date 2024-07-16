import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { Call } from '@ringcentral-integration/commons/modules/Call';
import type { CallHistory } from '@ringcentral-integration/commons/modules/CallHistory';
import type { CallLogger } from '@ringcentral-integration/commons/modules/CallLogger';
import type { ComposeText } from '@ringcentral-integration/commons/modules/ComposeText';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import type { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import type { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import type { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import type {
  OnCreateContactOptions,
  OnLogCallOptions,
} from '../CallsListUI/CallsListUI.interface';
import type { ConnectivityManager } from '../ConnectivityManager';
import type { ContactDetailsUI } from '../ContactDetailsUI';
import type { OnViewContactOptions } from '../ConversationsUI';
import type { DialerUI } from '../DialerUI';
import type { RouterInteraction } from '../RouterInteraction';

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
