import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { GenericMeeting } from '@ringcentral-integration/commons/modules/GenericMeeting';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type { RcDatePickerSize, RcTimePickerSize } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';

import type { ModalUI } from '../ModalUI';

export interface Deps {
  appFeatures: AppFeatures;
  genericMeeting: GenericMeeting;
  locale: Locale;
  rateLimiter: RateLimiter;
  connectivityMonitor: ConnectivityMonitor;
  modalUI: ModalUI;
  brand: Brand;
}

export interface GenericMeetingContainerProps {
  disabled?: boolean;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  openNewWindow?: boolean;
  showRemoveMeetingWarning?: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  scheduleButton?: FunctionComponent;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  recurringMeetingPosition?: 'middle' | 'bottom';
  showRecurringMeeting?: boolean;
  showRcvAdminLock?: boolean;
  configDisabled?: boolean;
  showPmiConfirm?: boolean;
  showAllowAnyoneRecord?: boolean;
  showAllowAnyoneTranscribe?: boolean;
}
