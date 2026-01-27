import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { FormatDateTimeOptions } from '@ringcentral-integration/micro-core/src/app/services';
import type RecentActivityPanel from '@ringcentral-integration/widgets/components/RecentActivityPanel';

import type { HistoryCall } from '../../services';

import type { trackTabsMap } from './RecentActivity.view';
import type { Tab } from './getTabs';

export interface RecentActivityViewOptions {
  component?: typeof RecentActivityPanel;
  // getTabs?: typeof getTabs;
}

export interface RecentActivityContainerProps {
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

export interface RecentActivityViewProps {
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
