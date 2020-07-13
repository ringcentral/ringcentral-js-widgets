// import {
//   RcDatePickerSize,
//   RcTimePickerSize,
// } from '@ringcentral-integration/rcui';
import { RcVMeetingModel } from 'ringcentral-integration/models/rcv.model';

export interface RcMMeetingModel {
  name: string;
  startTime: Date;
  duration: number;
  allowJoinBeforeHost: boolean;
  muteAudio: boolean;
  muteVideo: boolean;
  saveAsDefault: boolean;
}

export interface ScheduleButtonProps {
  currentLocale: string;
  disabled?: boolean;
  meeting: any;
  onOK: () => void;
  onClick: () => void;
  update: (any) => any;
  showSaveAsDefault: boolean;
  disableSaveAsDefault: boolean;
  launchMeeting: () => any;
  showLaunchMeetingBtn: boolean;
  scheduleButtonLabel: string;
  appCode: string;
  schedule: () => void;
}

export interface CommonProps {
  scheduleButton?: React.FunctionComponent<ScheduleButtonProps>;
  invite?: (meeting: any, opener: any) => any;
  showSaveAsDefault?: boolean;
  disableSaveAsDefault?: boolean;
  openNewWindow?: boolean;
  currentLocale: string;
  disabled?: boolean;
  onOK?: () => any;
  init: () => any;
  schedule?: (meeting: any, opener: any) => any;
}

export interface VideoPanelProps extends CommonProps {
  // TODO: any is reserved for RcM
  updateMeetingSettings: (meeting: RcVMeetingModel | any) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;
  // datePickerSize?: RcDatePickerSize;
  // timePickerSize?: RcTimePickerSize;
  onClick: () => any;
}

export interface MeetingPanelProps extends CommonProps {
  showSpinner: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  audioOptionToggle?: boolean;
  meetingOptionToggle?: boolean;
  showRecurringMeeting?: boolean;
  recipientsSection: React.ReactNode;
  passwordPlaceholderEnable?: boolean;
  launchMeeting: () => any;
  showLaunchMeetingBtn: boolean;
  scheduleButtonLabel: string;
  appCode: string;
}

export interface GenericMeetingPanelProps
  extends VideoPanelProps,
    MeetingPanelProps {
  meeting: RcMMeetingModel | RcVMeetingModel;
  isRCM: boolean;
  isRCV: boolean;
  showCustom?: boolean;
  CustomPanel?: React.ReactNode;
  brandName: string;
  personalMeetingId?: string;
}

export interface GenericMeetingPanelState {}
