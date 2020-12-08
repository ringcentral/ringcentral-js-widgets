import { RcDatePickerSize, RcTimePickerSize } from '@ringcentral/juno';
import { RcVMeetingModel } from 'ringcentral-integration/interfaces/Rcv.model';
import {
  RcMMeetingModel,
  MeetingDelegators,
} from 'ringcentral-integration/modules/Meeting';

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
  onOK?: () => any;
  init: () => any;
  schedule?: (meeting: any, opener: any) => any;
  showAdminLock?: boolean;
  showPmiAlert?: boolean;
  enableWaitingRoom?: boolean;
  enablePersonalMeeting?: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
}

export interface VideoPanelProps extends CommonProps {
  // TODO: any is reserved for RcM
  updateMeetingSettings: (meeting: RcVMeetingModel | any) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  enableJoinAfterMeCopy?: boolean;
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
  delegators: MeetingDelegators[];
  updateScheduleFor: (userExtensionId: string) => any;
  extensionId: number;
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
