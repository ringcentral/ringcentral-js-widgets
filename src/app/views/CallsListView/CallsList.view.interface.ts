import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { RouteParams } from '@ringcentral-integration/micro-contacts/src/app/views';
import type { FormatDateTimeOptions } from '@ringcentral-integration/micro-core/src/app/services';
import type { ToNumber } from '@ringcentral-integration/micro-message/src/app/services';
import type CallsListPanel from '@ringcentral-integration/widgets/components/CallsListPanel';

import type { HistoryCall } from '../../services';

export interface CallsListViewOptions {
  component?: typeof CallsListPanel;
}

export interface UIPropsOptions {
  showContactDisplayPlaceholder?: boolean;
  enableContactFallback?: boolean;
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

export interface CallsListPanelProps {
  adaptive?: boolean;
  useNewList?: boolean;
  maxExtensionLength?: number;
  composeTextRoute?: string;
  callCtrlRoute?: string;
  dialerRoute?: string;
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
  loggingMap: Record<string, boolean> | undefined;
  showSpinner: boolean;
  readTextPermission: boolean;
  enableCDC: boolean;

  onLogCall?(options: OnLogCallOptions): Promise<void>;
  isLoggedContact?(...args: any): boolean;
  onViewContact?(options: { contact: RouteParams }): void;
  dateTimeFormatter?(options: Partial<FormatDateTimeOptions>): string | null;
  formatPhone: (phoneNumber: string) => string;
  webphoneAnswer: (sessionId: string) => Promise<void>;
  webphoneToVoicemail: (sessionId: string) => Promise<void>;
  webphoneReject: (sessionId: string) => Promise<void>;
  webphoneHangup: (sessionId: string) => Promise<void>;
  webphoneResume(sessionId: string): Promise<void>;
  onCreateContact?: (options: OnCreateContactOptions) => Promise<void>;
  onClickToDial?: (recipient: any) => void;
  onClickToSms?: (
    contact: ToNumber & {
      name?: string;
    },
    isDummyContact?: boolean,
  ) => Promise<void>;
}
