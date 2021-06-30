import { Brand } from '@ringcentral-integration/commons/modules/BrandV2';
import { CallHistory } from '@ringcentral-integration/commons/modules/CallHistoryV2';
import { CallLogger } from '@ringcentral-integration/commons/modules/CallLoggerV2';
import { Call } from '@ringcentral-integration/commons/modules/CallV2';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormatV2';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { Locale } from '@ringcentral-integration/commons/modules/LocaleV2';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettingsV2';
import {
  OnCreateContactOptions,
  OnLogCallOptions,
} from '../CallsListUI/CallsListUI.interface';
import { ConnectivityManager } from '../ConnectivityManager';
import { ContactDetailsUI } from '../ContactDetailsUI';
import { OnViewContactOptions } from '../ConversationsUI';
import DialerUI from '../DialerUI';
import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  locale: Locale;
  brand: Brand;
  callHistory: CallHistory;
  regionSettings: RegionSettings;
  connectivityMonitor: ConnectivityMonitor;
  connectivityManager: ConnectivityManager;
  rateLimiter: RateLimiter;
  extensionFeatures: ExtensionFeatures;
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
  onViewContact: (options: OnViewContactOptions) => any;
}
