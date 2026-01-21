import { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';

/**
 * Common interface for disabled states of meeting UI components
 */
export interface MeetingDisabledStates {
  isJoinBeforeHostDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isWaitingRoomTypeDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isRequirePasswordDisabled: boolean;
}

/**
 * Interface for dropdown options
 */
export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * Common props for meeting components
 */
export interface CommonMeetingUIProps {
  // Meeting settings
  requirePassword: boolean;
  meetingPassword: string;
  whoCanJoin: string;
  useWaitingRoom: boolean;
  waitingRoomParticipants: string;
  startMeetingAfterJoin: boolean;

  // UI State
  isLoading: boolean;
  isUpdating: boolean;
  disabled: boolean;

  // Options
  whoCanJoinOptions: DropdownOption[];
  waitingRoomOptions: DropdownOption[];

  // Disabled States
  isJoinBeforeHostDisabled: boolean;
  isWaitingRoomDisabled: boolean;
  isWaitingRoomTypeDisabled: boolean;
  isAuthenticatedCanJoinDisabled: boolean;
  isAuthUserTypeDisabled: boolean;
  isRequirePasswordDisabled: boolean;
}

/**
 * Common functions for meeting UI components
 */
export interface CommonMeetingUIFunctions {
  onRequirePasswordChange: (require: boolean) => void;
  onPasswordChange: (password: string) => void;
  onWhoCanJoinChange: (value: string) => void;
  onUseWaitingRoomChange: (use: boolean) => void;
  onWaitingRoomParticipantsChange: (value: string) => void;
  onStartMeetingAfterJoinChange: (start: boolean) => void;
}
