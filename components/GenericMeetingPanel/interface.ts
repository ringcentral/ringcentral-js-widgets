import type { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import type { BrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type {
  RcmItemType,
  RcMMeetingModel,
} from '@ringcentral-integration/commons/modules/Meeting';
import type {
  AUTH_USER,
  ALLOW_MEETING_ACCESS,
  RcvDelegator,
  RcvItemType,
} from '@ringcentral-integration/commons/modules/RcVideo';
import type {
  RcCheckboxProps,
  RcDatePickerSize,
  RcTimePickerSize,
} from '@ringcentral/juno';
import type { FunctionComponent } from 'react';

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
  scheduleButton?: FunctionComponent<ScheduleButtonProps>;
  invite?: (meeting: any, opener: any) => any;
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
  enablePersonalMeeting?: boolean;
  hasSettingsChanged?: boolean;
  personalMeetingId?: string;
  personalMeetingName?: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
}

export interface VideoPanelProps extends CommonProps {
  showRemoveMeetingWarning: boolean;
  meeting: RcVMeetingModel;
  personalMeeting?: RcVMeetingModel | null;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  onCloseMigrationAlert?: () => void;
  updateScheduleFor: (userExtensionId: string) => any;
  showSpinnerInConfigPanel: boolean;
  recipientsSection?: React.ReactNode;
  showMigrationAlert?: boolean;
  brandConfig: BrandConfig;
  // TODO: any is reserved for RcM
  updateMeetingSettings: (meeting: RcVMeetingModel | any) => void;
  updatePersonalMeetingSettings?: (meeting: RcVMeetingModel | any) => void;
  trackSettingChanges?: (itemName: RcvItemType | RcmItemType) => void;
  validatePasswordSettings?: (password: string, isSecret: boolean) => boolean;
  e2eeInteractFunc: (e2eeValue: boolean) => void;
  onPmiChangeClick: () => void;
  onPasswordChangeClick?: () => void;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  checkboxSize?: RcCheckboxProps['size'];
  showRcvAdminLock?: boolean;
  showPmiConfirm?: boolean;
  showAllowAnyoneRecord?: boolean;
  showAllowAnyoneTranscribe?: boolean;
  delegators?: RcvDelegator[];
  joinBeforeHostLabel: string;
  authUserTypeValue: AUTH_USER;
  isJoinBeforeHostDisabled: boolean;
  isPasswordFieldDisabled: boolean;
  isAllowToRecordDisabled: boolean;
  isAllowAnyoneTranscribeDisabled: boolean;
  isMuteAudioDisabled: boolean;
  isTurnOffCameraDisabled: boolean;
  isAllowScreenSharingDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isRequirePasswordDisabled: boolean;
  isWaitingRoomNotCoworkerDisabled: boolean;
  isWaitingRoomGuestDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isWaitingRoomTypeDisabled: boolean;
  showWaitingRoom?: boolean;
  showE2EE?: boolean;
  isE2EEDisabled?: boolean;
  isPersonalMeetingDisabled?: boolean;
  isPmiChangeConfirmed?: boolean;
  personalMeetingName?: string;
  personalMeetingLink?: string;
  useSimpleRcv?: boolean;
}

export interface MeetingPanelProps extends CommonProps {
  showRemoveMeetingWarning: boolean;
  meeting: RcMMeetingModel;
  personalMeeting?: RcMMeetingModel;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  showSpinnerInConfigPanel: boolean;
  onCloseMigrationAlert?: () => void;
  audioOptionToggle?: boolean;
  meetingOptionToggle?: boolean;
  showRecurringMeeting?: boolean;
  recipientsSection?: React.ReactNode;
  passwordPlaceholderEnable?: boolean;
  launchMeeting?: () => any;
  showLaunchMeetingBtn: boolean;
  scheduleButtonLabel: string;
  appCode: string;
  updateScheduleFor: (userExtensionId: string) => any;
  extensionId: number;
  recurringMeetingPosition?: 'middle' | 'bottom';
  enableServiceWebSettings?: boolean;
  delegators?: RcvDelegator[];
  showMigrationAlert?: boolean;
  brandConfig: BrandConfig;
  appName?: string;
}

export interface GenericMeetingPanelProps
  extends Omit<VideoPanelProps, 'meeting' | 'personalMeeting'>,
    Omit<MeetingPanelProps, 'meeting' | 'personalMeeting'> {
  isRCM: boolean;
  isRCV: boolean;
  meeting: Partial<RcVMeetingModel> | RcMMeetingModel | null;
  personalMeeting?: Partial<RcVMeetingModel> | RcMMeetingModel | null;
  brandName: string;
  showSpinner: boolean;
  defaultTopic: string;
}

export interface GenericMeetingPanelState {}
