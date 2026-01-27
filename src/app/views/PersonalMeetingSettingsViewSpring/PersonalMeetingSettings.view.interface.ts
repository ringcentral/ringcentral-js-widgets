import type { BrandConfig } from '@ringcentral-integration/micro-core/src/app/services';
import type { ComponentType } from 'react';

export interface PersonalMeetingSettingsPanelSpringProps {
  // Personal Meeting Settings
  requirePassword: boolean;
  meetingPassword: string;
  whoCanJoin: string;
  useWaitingRoom: boolean;
  waitingRoomParticipants: string;
  startMeetingAfterJoin: boolean;
  personalMeetingLink: string;

  // UI State
  isLoading: boolean;
  isUpdating: boolean;
  disabled: boolean;
  brandConfig: BrandConfig;

  // Options
  whoCanJoinOptions: Array<{ label: string; value: string }>;
  waitingRoomOptions: Array<{ label: string; value: string }>;

  // Disabled States
  isJoinBeforeHostDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isWaitingRoomTypeDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isRequirePasswordDisabled: boolean;

  // Locked States
  isRequirePasswordLocked?: boolean;
  isJoinBeforeHostLocked?: boolean;
  isWaitingRoomLocked?: boolean;
  isAuthUserTypeLocked?: boolean;

  // Additional properties
  isRCV?: boolean;
  brandName?: string;
}

export interface PersonalMeetingSettingsPanelSpringFunctions {
  onRequirePasswordChange: (require: boolean) => void;
  onPasswordChange: (password: string) => void;
  onWhoCanJoinChange: (value: string) => void;
  onUseWaitingRoomChange: (use: boolean) => void;
  onWaitingRoomParticipantsChange: (value: string) => void;
  onStartMeetingAfterJoinChange: (start: boolean) => void;
  onBackClick: () => void;
}

export interface PersonalMeetingSettingsViewSpringOptions {
  component?: ComponentType<
    PersonalMeetingSettingsPanelSpringProps &
      PersonalMeetingSettingsPanelSpringFunctions
  >;
}
