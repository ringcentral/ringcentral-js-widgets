import type { FunctionComponent } from 'react';

import type { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import type { BrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type {
  RcmItemType,
  RcMMeetingModel,
} from '@ringcentral-integration/commons/modules/Meeting';
import type {
  AUTH_USER,
  RcvDelegator,
  RcvItemType,
} from '@ringcentral-integration/commons/modules/RcVideo';
import type {
  RcCheckboxProps,
  RcDatePickerSize,
  RcTimePickerSize,
} from '@ringcentral/juno';

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
  enablePersonalMeeting?: boolean;
  hasSettingsChanged?: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  defaultTopic: string;
}

export interface VideoPanelProps extends CommonProps {
  // TODO: any is reserved for RcM
  updateMeetingSettings: (meeting: RcVMeetingModel | any) => void;
  trackSettingChanges?: (itemName: RcvItemType | RcmItemType) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;
  e2eeInteractFunc: (e2eeValue: boolean) => void;
  onPmiChangeClick: () => void;
  datePickerSize?: RcDatePickerSize;
  timePickerSize?: RcTimePickerSize;
  checkboxSize?: RcCheckboxProps['size'];
  showRcvAdminLock?: boolean;
  showPmiConfirm?: boolean;
  delegators?: RcvDelegator[];
  joinBeforeHostLabel: string;
  authUserTypeValue: AUTH_USER;
  isJoinBeforeHostDisabled: boolean;
  isMuteAudioDisabled: boolean;
  isTurnOffCameraDisabled: boolean;
  isAllowScreenSharingDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isRequirePasswordDisabled: boolean;
  isWaitingRoomNotCoworkerDisabled: boolean;
  isWaitingRoomGuestDisabled: boolean;
  isWaitingRoomAllDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isWaitingRoomTypeDisabled: boolean;
  isSignedInUsersDisabled: boolean;
  isSignedInCoWorkersDisabled: boolean;
  showWaitingRoom?: boolean;
  showE2EE?: boolean;
  isE2EEDisabled?: boolean;
  isPersonalMeetingDisabled?: boolean;
  isPmiChangeConfirmed?: boolean;
}

export interface MeetingPanelProps extends CommonProps {
  audioOptionToggle?: boolean;
  meetingOptionToggle?: boolean;
  showRecurringMeeting?: boolean;
  recipientsSection: React.ReactNode;
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
  showIeSupportAlert?: boolean;
  appName?: string;
}

export interface GenericMeetingPanelProps
  extends VideoPanelProps,
    MeetingPanelProps {
  meeting: RcMMeetingModel | Partial<RcVMeetingModel>;
  useRcmV2: boolean;
  isRCM: boolean;
  isRCV: boolean;
  showSpinnerInConfigPanel: boolean;
  showCustom?: boolean;
  CustomPanel?: React.ReactNode;
  brandName: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  showRemoveMeetingWarning: boolean;
  brandConfig: BrandConfig;
}

export interface GenericMeetingPanelState {}
