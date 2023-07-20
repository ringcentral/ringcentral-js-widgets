import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { HistoryCall } from '@ringcentral-integration/commons/modules/CallHistory';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import type {
  DateTimeFormat,
  FormatDateTimeOptions,
} from '@ringcentral-integration/commons/modules/DateTimeFormat';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RecentCalls } from '@ringcentral-integration/commons/modules/RecentCalls';
import type { RecentMessages } from '@ringcentral-integration/commons/modules/RecentMessages';

import type { Tab, trackTabsMap } from './getTabs';

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
