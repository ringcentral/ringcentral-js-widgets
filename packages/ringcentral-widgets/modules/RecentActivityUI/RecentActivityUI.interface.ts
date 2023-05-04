import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { HistoryCall } from '@ringcentral-integration/commons/modules/CallHistory';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import {
  DateTimeFormat,
  FormatDateTimeOptions,
} from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RecentCalls } from '@ringcentral-integration/commons/modules/RecentCalls';
import { RecentMessages } from '@ringcentral-integration/commons/modules/RecentMessages';

import { Tab, trackTabsMap } from './getTabs';

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
  entry: string;
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
  trackClickToggle?: (expanded: boolean) => void;
  trackClickTab?: (tabName: keyof typeof trackTabsMap) => void;
}
