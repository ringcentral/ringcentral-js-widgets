import { FunctionComponent } from 'react';

import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { GenericMeeting } from '@ringcentral-integration/commons/modules/GenericMeeting';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RcDatePickerSize, RcTimePickerSize } from '@ringcentral/juno';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';

import { ModalUI } from '../ModalUI';

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
  useRcmV2?: boolean;
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
}
