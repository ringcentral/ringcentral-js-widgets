import type {
  GenericMeetingPanel,
  ScheduleButtonProps,
} from '@ringcentral-integration/widgets/components/GenericMeetingPanel';
import type { RcDatePickerSize, RcTimePickerSize } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';

export interface GenericMeetingViewOptions {
  component?: typeof GenericMeetingPanel;
}

export interface GenericMeetingViewProps {
  disabled?: boolean;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  openNewWindow?: boolean;
  showRemoveMeetingWarning?: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  scheduleButton?: FunctionComponent<ScheduleButtonProps>;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  recurringMeetingPosition?: 'middle' | 'bottom';
  showRecurringMeeting?: boolean;
  showRcvAdminLock?: boolean;
  configDisabled?: boolean;
  showPmiConfirm?: boolean;
}
