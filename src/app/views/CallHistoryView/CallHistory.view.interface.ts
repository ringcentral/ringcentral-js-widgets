import type { DateTimeFormat } from '@ringcentral-integration/micro-core/src/app/services';
import type { OnViewContactOptions } from '@ringcentral-integration/micro-message/src/app/views';
import type { CallHistoryPanel } from '@ringcentral-integration/widgets/components/CallHistoryPanel';

import type {
  OnCreateContactOptions,
  OnLogCallOptions,
} from '../CallsListView';

export interface CallHistoryViewOptions {
  component?: typeof CallHistoryPanel;
}

export interface CallHistoryViewProps {
  enableContactFallback?: boolean;
  useNewList?: boolean;
  onCreateContact?: (options: OnCreateContactOptions) => any;
  dateTimeFormatter?: (
    ...args: Parameters<DateTimeFormat['formatDateTime']>
  ) => string | null;
  onLogCall?: (options: OnLogCallOptions) => any;
  isLoggedContact?: boolean;
  dialerRoute?: string;
  composeTextRoute?: string;
  formatPhone: (phoneNumber: string) => string | undefined;
  onViewContact: (options: OnViewContactOptions) => any;
}
