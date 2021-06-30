import {
  RcDatePickerSize,
  RcTimePickerSize,
  RcCheckboxProps,
} from '@ringcentral/juno';
import { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { RcvDelegator } from '@ringcentral-integration/commons/modules/RcVideoV2/RcVideo.interface';
import {
  RcMMeetingModel,
  MeetingDelegator,
} from '@ringcentral-integration/commons/modules/MeetingV2';

export interface ScheduleButtonProps {
  currentLocale: string;
  disabled?: boolean;
  meeting: any;
  onOK: () => void;
  onClick: () => void;
  update: (meeting: any) => any;
  showSaveAsDefault: boolean;
  disableSaveAsDefault: boolean;
  launchMeeting: () => any;
  showLaunchMeetingBtn: boolean;
  scheduleButtonLabel: string;
  appCode: string;
}

export interface CommonProps {
  scheduleButton?: React.FunctionComponent<ScheduleButtonProps>;
  invite?: (meeting: any, opener: any) => any;
  showSpinner: boolean;
  showScheduleOnBehalf?: boolean;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  showSaveAsDefault?: boolean;
  disableSaveAsDefault?: boolean;
  openNewWindow?: boolean;
  currentLocale: string;
  disabled?: boolean;
  configDisabled?: boolean;
  onOK?: () => any;
  init: () => any;
  schedule?: (meeting: any, opener: any) => any;
  showPmiAlert?: boolean;
  enableWaitingRoom?: boolean;
  enablePersonalMeeting?: boolean;
  hasSettingsChanged?: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  defaultTopic: string;
}

export interface VideoPanelProps extends CommonProps {
  // TODO: any is reserved for RcM
  updateMeetingSettings: (meeting: RcVMeetingModel | any) => void;
  updateHasSettingsChanged: (isChanged: boolean) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  checkboxSize?: RcCheckboxProps['size'];
  showRcvAdminLock?: boolean;
  delegators?: RcvDelegator[];
}

export interface MeetingPanelProps extends CommonProps {
  audioOptionToggle?: boolean;
  meetingOptionToggle?: boolean;
  showRecurringMeeting?: boolean;
  recipientsSection: React.ReactNode;
  passwordPlaceholderEnable?: boolean;
  launchMeeting: () => any;
  showLaunchMeetingBtn: boolean;
  scheduleButtonLabel: string;
  appCode: string;
  updateScheduleFor: (userExtensionId: string) => any;
  extensionId: number;
  recurringMeetingPosition?: 'middle' | 'bottom';
  enableServiceWebSettings?: boolean;
  delegators?: RcvDelegator[];
}

export interface GenericMeetingPanelProps
  extends VideoPanelProps,
    MeetingPanelProps {
  meeting: RcMMeetingModel | RcVMeetingModel;
  useRcmV2: boolean;
  isRCM: boolean;
  isRCV: boolean;
  showSpinnerInConfigPanel: boolean;
  showCustom?: boolean;
  CustomPanel?: React.ReactNode;
  brandName: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export interface GenericMeetingPanelState {}
