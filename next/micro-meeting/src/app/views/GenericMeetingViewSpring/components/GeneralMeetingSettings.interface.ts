import type { BrandConfig } from '@ringcentral-integration/micro-core/src/app/services';

export interface GeneralMeetingSettingsProps {
  // General Settings
  requirePassword: boolean;
  meetingPassword: string;
  whoCanJoin: string;
  useWaitingRoom: boolean;
  waitingRoomParticipants: string;
  startMeetingAfterJoin: boolean;

  // Options
  whoCanJoinOptions: Array<{ label: string; value: string }>;
  waitingRoomOptions: Array<{ label: string; value: string }>;

  // UI State
  disabled: boolean;
  className?: string;
  brandConfig: BrandConfig;

  // Disabled States
  isJoinBeforeHostDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isWaitingRoomTypeDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isRequirePasswordDisabled: boolean;
  isEditPasswordDisabled?: boolean;

  // Locked States
  isRequirePasswordLocked?: boolean;
  isJoinBeforeHostLocked?: boolean;
  isWaitingRoomLocked?: boolean;
  isAuthUserTypeLocked?: boolean;
}

export interface GeneralMeetingSettingsFunctions {
  onRequirePasswordChange: (require: boolean) => void;
  onPasswordChange: (password: string) => void;
  onWhoCanJoinChange: (value: string) => void;
  onUseWaitingRoomChange: (use: boolean) => void;
  onWaitingRoomParticipantsChange: (value: string) => void;
  onStartMeetingAfterJoinChange: (start: boolean) => void;
}
