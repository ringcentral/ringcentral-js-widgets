import { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import {
  CallHistory,
  HistoryCall,
} from '@ringcentral-integration/commons/modules/CallHistoryV2';
import { CallLogger } from '@ringcentral-integration/commons/modules/CallLoggerV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { Call } from '@ringcentral-integration/commons/modules/CallV2';
import {
  ComposeText,
  ToNumber,
} from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import {
  DateTimeFormat,
  FormatDateTimeOptions,
} from '@ringcentral-integration/commons/modules/DateTimeFormatV2';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettingsV2';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import { ContactDetailsUI, RouteParams } from '../ContactDetailsUI';
import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  brand: Brand;
  callLogger?: CallLogger;
  callMonitor: CallMonitor;
  locale: Locale;
  regionSettings: RegionSettings;
  appFeatures: AppFeatures;
  callHistory: CallHistory;
  connectivityMonitor: ConnectivityMonitor;
  rateLimiter: RateLimiter;
  dateTimeFormat: DateTimeFormat;
  call: Call;
  composeText?: ComposeText;
  extensionInfo: ExtensionInfo;
  contactMatcher: ContactMatcher;
  contactSearch: ContactSearch;
  webphone?: Webphone;
  routerInteraction: RouterInteraction;
  contactDetailsUI: ContactDetailsUI;
  // TODO: refactor dialerUI
  dialerUI?: any;
  callsListUIOptions?: CallsListUIOptions;
}

export interface CallsListUIOptions {
  //
}

export interface UIPropsOptions {
  showContactDisplayPlaceholder?: boolean;
  enableContactFallback?: boolean;
}

export interface CallsListUIProps {
  currentSiteCode: string;
  isMultipleSiteEnabled: boolean;
  currentLocale: string;
  activeRingCalls: ICall[];
  activeOnHoldCalls: ICall[];
  activeCurrentCalls: ICall[];
  otherDeviceCalls: ICall[];
  areaCode: string;
  countryCode: string;
  outboundSmsPermission: boolean;
  internalSmsPermission: boolean;
  brand: string;
  showContactDisplayPlaceholder: boolean;
  autoLog: boolean;
  enableContactFallback: boolean;
  calls: HistoryCall[];
  disableLinks: boolean;
  disableClickToDial: boolean;
  loggingMap: Record<string, boolean>;
  showSpinner: boolean;
  readTextPermission: boolean;
  enableCDC: boolean;
}

export interface OnCreateContactOptions {
  phoneNumber: string;
  name: string;
  entityType: string;
}

export interface OnLogCallOptions {
  call: any;
  contact: any;
  redirect?: boolean;
}

export interface UIFunctionsOptions {
  composeTextRoute?: string;
  callCtrlRoute?: string;
  onCreateContact?: (options: OnCreateContactOptions) => Promise<void>;
  onLogCall?(options: OnLogCallOptions): Promise<void>;
  isLoggedContact?(...args: any): boolean;
  onViewContact?(options: { contact: RouteParams }): void;
  dateTimeFormatter?(options: Partial<FormatDateTimeOptions>): string;
  dialerRoute?: string;
}

export interface CallsListUIFunctions {
  formatPhone: (phoneNumber: string) => string;
  webphoneAnswer: (sessionId: string) => Promise<void>;
  webphoneToVoicemail: (sessionId: string) => Promise<void>;
  webphoneReject: (sessionId: string) => Promise<void>;
  webphoneHangup: (sessionId: string) => Promise<void>;
  webphoneResume(sessionId: string): Promise<void>;
  onCreateContact: (options: OnCreateContactOptions) => Promise<void>;
  isLoggedContact: (...args: any) => boolean;
  onLogCall: (options: OnLogCallOptions) => Promise<void>;
  dateTimeFormatter: (options: Partial<FormatDateTimeOptions>) => string;
  onViewContact: (options: { contact: RouteParams }) => void;
  onClickToDial: (recipient: any) => void;
  onClickToSms: (
    contact: ToNumber & {
      name?: string;
    },
    isDummyContact?: boolean,
  ) => Promise<void>;
}
