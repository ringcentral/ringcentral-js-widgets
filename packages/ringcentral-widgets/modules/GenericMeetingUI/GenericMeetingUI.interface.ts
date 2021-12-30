import { FunctionComponent } from 'react';

import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import { GenericMeeting } from '@ringcentral-integration/commons/modules/GenericMeetingV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RcDatePickerSize, RcTimePickerSize } from '@ringcentral/juno';

import { ModalUI } from '../ModalUI';

export interface Deps {
  appFeatures: AppFeatures;
  genericMeeting: GenericMeeting;
  locale: Locale;
  rateLimiter: RateLimiter;
  connectivityMonitor: ConnectivityMonitor;
  modalUI: ModalUI;
}

export interface GenericMeetingContainerProps {
  useRcmV2?: boolean;
  disabled?: boolean;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  openNewWindow?: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  scheduleButton?: FunctionComponent;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  recurringMeetingPosition?: 'middle' | 'bottom';
  showRecurringMeeting?: boolean;
  showRcvAdminLock?: boolean;
  configDisabled?: boolean;
  showPmiConfirm?: boolean;
}
