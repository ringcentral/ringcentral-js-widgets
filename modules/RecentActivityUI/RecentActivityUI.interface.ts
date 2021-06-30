import { RecentMessages } from '@ringcentral-integration/commons/modules/RecentMessagesV2';
import { RecentCalls } from '@ringcentral-integration/commons/modules/RecentCallsV2';
import { Locale } from '@ringcentral-integration/commons/modules/LocaleV2';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import {
  DateTimeFormat,
  FormatDateTimeOptions,
} from '@ringcentral-integration/commons/modules/DateTimeFormatV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { HistoryCall } from '@ringcentral-integration/commons/modules/CallHistoryV2';
import { Tab } from './getTabs';

export interface RecentActivityUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  dateTimeFormat: DateTimeFormat;
  recentMessages: RecentMessages;
  recentCalls: RecentCalls;
  contactMatcher: ContactMatcher;
  recentActivityUIOptions?: RecentActivityUIOptions;
}

export interface RecentActivityContainerProps {
  currentLocale?: string;
  navigateTo: (path: string) => void;
  dateTimeFormatter?: (options: Partial<FormatDateTimeOptions>) => string;
  getSession: () => NormalizedSession;
  useContact?: boolean;
  getContact?: () => Entity;
  showRecentCalls?: boolean;
  showRecentMessage?: boolean;
  showFax?: boolean;
  showVoiceMails?: boolean;
}

// TODO: move to `RecentActivityPanel`
export interface RecentActivityPanelProps {
  currentLocale: string;
  title: string;
  showSpinner: boolean;
  currentContact: Entity;
  calls: Record<string, HistoryCall[]>;
  tabs: Tab[];
  defaultTab: string;
  className?: string;
}
