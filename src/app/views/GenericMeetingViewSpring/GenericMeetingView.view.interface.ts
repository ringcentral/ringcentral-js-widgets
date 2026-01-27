import type { BrandConfig } from '@ringcentral-integration/micro-core/src/app/services';
import { ComponentType } from 'react';

export interface GenericMeetingPanelSpringProps {
  // Meeting Configuration
  meetingTitle: string;
  meetingDate: Date;
  meetingTime: Date;
  meetingDuration: {
    hours: string;
    minutes: string;
  };

  // General Settings
  requirePassword: boolean;
  meetingPassword: string;
  whoCanJoin: string;
  useWaitingRoom: boolean;
  waitingRoomParticipants: string;
  startMeetingAfterJoin: boolean;

  // Personal Meeting Settings
  isPersonalMeetingEnabled: boolean;
  personalMeetingLink: string;

  // UI State
  isLoading: boolean;
  isUpdating: boolean;
  disabled: boolean;

  // Options
  whoCanJoinOptions: Array<{ label: string; value: string }>;
  waitingRoomOptions: Array<{ label: string; value: string }>;
  hourOptions: Array<{ label: string; value: string }>;
  minuteOptions: Array<{ label: string; value: string }>;

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
  meeting?: any;
  brandName?: string;

  brandConfig: BrandConfig;

  navigationState?: string;
}

export interface GenericMeetingPanelSpringFunctions {
  onMeetingTitleChange: (title: string) => void;
  onMeetingDateChange: (date: Date) => void;
  onMeetingTimeChange: (time: Date) => void;
  onMeetingDurationChange: (duration: {
    hours: string;
    minutes: string;
  }) => void;
  onRequirePasswordChange: (require: boolean) => void;
  onPasswordChange: (password: string) => void;
  onWhoCanJoinChange: (value: string) => void;
  onUseWaitingRoomChange: (use: boolean) => void;
  onWaitingRoomParticipantsChange: (value: string) => void;
  onStartMeetingAfterJoinChange: (start: boolean) => void;
  onPersonalMeetingToggle: (enabled: boolean) => void;
  onScheduleMeeting: () => Promise<any>;
  init: () => Promise<void>;
  viewPersonalMeetingSettings: () => void;
}

export interface GenericMeetingViewSpringOptions {
  component?: ComponentType<
    GenericMeetingPanelSpringProps & GenericMeetingPanelSpringFunctions
  >;
}
