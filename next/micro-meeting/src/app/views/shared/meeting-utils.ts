import type { RcVPreferencesGET } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { RCV_WAITING_ROOM_MODE } from '@ringcentral-integration/commons/modules/RcVideo/constants';
import {
  BrandConfig,
  type Brand,
} from '@ringcentral-integration/micro-core/src/app/services';
import { getTranslateFn } from '@ringcentral-integration/utils';

import { GenericMeeting } from '../../services';
import {
  WAITING_ROOM_MODE,
  WHO_CAN_JOIN_OPTIONS,
  WAITING_ROOM_PARTICIPANTS_OPTIONS,
} from '../GenericMeetingViewSpring/constants';
import i18n from '../GenericMeetingViewSpring/i18n';

const t = getTranslateFn(i18n);

/**
 * Core logic for calculating who can join related updates
 * Returns the updates that should be applied to settings
 */
export function calculateWhoCanJoinUpdates(
  currentSettings: any,
  whoCanJoinValue: string,
  settingLock: any = {},
  preferences: RcVPreferencesGET,
): Partial<any> {
  const isOnlyCoworkersJoin =
    whoCanJoinValue === WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS;
  const isOnlyAuthUserJoin =
    whoCanJoinValue === WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS ||
    whoCanJoinValue === WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS;

  const updates: any = {
    isOnlyCoworkersJoin,
    isOnlyAuthUserJoin,
  };

  /* Handle waiting room mode logic */
  const currentWaitingRoomMode = currentSettings?.waitingRoomMode;
  let newWaitingRoomMode = currentWaitingRoomMode;
  let shouldUpdateWaitingRoomMode = false;

  if (currentWaitingRoomMode === undefined || currentWaitingRoomMode === null) {
    newWaitingRoomMode = WAITING_ROOM_MODE.NOT_COWORKER;
    shouldUpdateWaitingRoomMode = true;
  }

  // If waiting room mode is locked, use preferences value at first
  if (settingLock.waitingRoomMode) {
    newWaitingRoomMode =
      preferences.waiting_room && preferences.waiting_room_guests_only
        ? RCV_WAITING_ROOM_MODE[preferences.waiting_room_guests_only]
        : RCV_WAITING_ROOM_MODE.off;
    shouldUpdateWaitingRoomMode = true;
  }

  // whoCanJoinValue would affect waiting room mode
  if (isOnlyCoworkersJoin /* Only my coworkers */) {
    if (
      newWaitingRoomMode !== WAITING_ROOM_MODE.OFF &&
      newWaitingRoomMode !== WAITING_ROOM_MODE.ALL
    ) {
      newWaitingRoomMode = WAITING_ROOM_MODE.ALL;
      shouldUpdateWaitingRoomMode = true;
    }
  } else if (isOnlyAuthUserJoin /* Only {brand} accounts */) {
    if (newWaitingRoomMode === WAITING_ROOM_MODE.GUESTS) {
      newWaitingRoomMode = WAITING_ROOM_MODE.NOT_COWORKER;
      shouldUpdateWaitingRoomMode = true;
    }
  }

  // Update regardless of lock status (linkage changed)
  if (shouldUpdateWaitingRoomMode) {
    updates.waitingRoomMode = newWaitingRoomMode;
  }

  /* Handle allowJoinBeforeHost logic */
  let shouldUpdateAllowJoinBeforeHost = false;
  let newAllowJoinBeforeHost: boolean | undefined;

  // If allowJoinBeforeHost is locked, use preferences value at first
  if (settingLock.allowJoinBeforeHost) {
    newAllowJoinBeforeHost = preferences.join_before_host;
    shouldUpdateAllowJoinBeforeHost = true;
  }

  // waitingRoomMode would affect allowJoinBeforeHost
  if (updates.waitingRoomMode === WAITING_ROOM_MODE.ALL) {
    newAllowJoinBeforeHost = false;
    shouldUpdateAllowJoinBeforeHost = true;
  }

  // Update regardless of lock status (linkage changed)
  if (shouldUpdateAllowJoinBeforeHost) {
    updates.allowJoinBeforeHost = newAllowJoinBeforeHost;
  }

  return updates;
}

/**
 * Core logic for calculating waiting room toggle updates
 * Returns the updates that should be applied to settings
 */
export function calculateUseWaitingRoomUpdates(use: boolean): Partial<any> {
  return {
    waitingRoomMode: use
      ? WAITING_ROOM_MODE.NOT_COWORKER
      : WAITING_ROOM_MODE.OFF,
  };
}

/**
 * Core logic for calculating waiting room participants updates
 * Returns the updates that should be applied to settings
 */
export function calculateWaitingRoomParticipantsUpdates(
  value: string,
  settingLock: any = {},
  preferences: RcVPreferencesGET,
): Partial<any> {
  // Map string values back to numeric waiting room modes
  let waitingRoomMode: number;
  switch (value) {
    case WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS:
      waitingRoomMode = WAITING_ROOM_MODE.ALL;
      break;
    case WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY:
      waitingRoomMode = WAITING_ROOM_MODE.NOT_COWORKER;
      break;
    case WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_NOT_SIGNED_IN:
      waitingRoomMode = WAITING_ROOM_MODE.GUESTS;
      break;
    default:
      waitingRoomMode = WAITING_ROOM_MODE.NOT_COWORKER;
  }

  const updates: any = {
    waitingRoomMode,
  };

  /* Handle allowJoinBeforeHost logic */
  let shouldUpdateAllowJoinBeforeHost = false;
  let newAllowJoinBeforeHost: boolean | undefined;

  // If allowJoinBeforeHost is locked, use preferences value at first
  if (settingLock.allowJoinBeforeHost) {
    newAllowJoinBeforeHost = preferences.join_before_host;
    shouldUpdateAllowJoinBeforeHost = true;
  }

  if (waitingRoomMode === WAITING_ROOM_MODE.ALL) {
    newAllowJoinBeforeHost = false;
    shouldUpdateAllowJoinBeforeHost = true;
  }

  // Update regardless of lock status (linkage changed)
  if (shouldUpdateAllowJoinBeforeHost) {
    updates.allowJoinBeforeHost = newAllowJoinBeforeHost;
  }

  return updates;
}

/**
 * Determines the "Who can join" display value based on meeting settings
 */
export function getWhoCanJoinValue(meeting: any): string {
  if ((meeting as any)?.isOnlyCoworkersJoin)
    return WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS;
  if ((meeting as any)?.isOnlyAuthUserJoin)
    return WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS;
  return WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK;
}

export const getWhoCanJoinDisplayText = (
  value: string,
  brandConfig: BrandConfig,
) => {
  const shortName = brandConfig.shortName as string;
  switch (value) {
    case WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK:
      return t('anyoneWithLink');
    case WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS:
      return t('onlyMyCoworkers');
    case WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS:
      return t('onlyRingCentralAccounts', { shortName });
    default:
      return value;
  }
};

/**
 * Determines the waiting room participants display value based on meeting settings
 * This function only displays the current value, business logic is handled in calculateWhoCanJoinUpdates
 */
export function getWaitingRoomValue(meeting: any): string {
  const waitingRoomMode = (meeting as any)?.waitingRoomMode;
  const isOnlyCoworkersJoin = (meeting as any)?.isOnlyCoworkersJoin;

  // Map numeric waiting room modes to option values
  switch (waitingRoomMode) {
    case WAITING_ROOM_MODE.OFF:
      return WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY;
    case WAITING_ROOM_MODE.ALL:
      return WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS;
    case WAITING_ROOM_MODE.GUESTS:
      // If "Only my coworkers" is selected, "Anyone not signed in" is not available
      // So we should return a valid option instead
      if (isOnlyCoworkersJoin) {
        return WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS;
      }
      return WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_NOT_SIGNED_IN;
    case WAITING_ROOM_MODE.NOT_COWORKER: // notcoworker - only people outside company go to waiting room
      return WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY;
    default:
      if (isOnlyCoworkersJoin) {
        return WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS;
      }
      return WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY;
  }
}

/**
 * Returns the standard set of "Who can join" options for dropdowns
 */
export function getWhoCanJoinOptions(brand: Brand) {
  const shortName = brand.brandConfig.shortName as string;
  return [
    {
      label: t('anyoneWithLink'),
      value: WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK,
    },
    {
      label: t('onlyRingCentralAccounts', { shortName }),
      value: WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS,
    },
    {
      label: t('onlyMyCoworkers'),
      value: WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS,
    },
  ];
}

/**
 * Returns appropriate waiting room options based on meeting settings
 */
export function getWaitingRoomOptions(meeting: any) {
  const isOnlyCoworkersJoin = (meeting as any)?.isOnlyCoworkersJoin;
  const isOnlyAuthUserJoin = (meeting as any)?.isOnlyAuthUserJoin;

  // When "Only my coworkers" is selected, only show "For all participants" and "Off"
  if (isOnlyCoworkersJoin) {
    return [
      {
        label: t('allParticipants'),
        value: WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS,
      },
    ];
  }

  // When "Only RingCentral accounts" is selected, "For anyone not signed in" is not available
  if (isOnlyAuthUserJoin) {
    return [
      {
        label: t('allParticipants'),
        value: WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS,
      },
      {
        label: t('forAnyoneOutsideMyCompany'),
        value: WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
      },
    ];
  }

  // Default options for "Anyone with link"
  return [
    {
      label: t('allParticipants'),
      value: WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS,
    },
    {
      label: t('forAnyoneOutsideMyCompany'),
      value: WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
    },
    {
      label: t('forAnyoneNotSignedIn'),
      value: WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_NOT_SIGNED_IN,
    },
  ];
}

/**
 * Calculate disabled states for UI components
 */
export function calculateDisabledStates(
  genericMeeting: GenericMeeting,
  meeting: any,
) {
  // Calculate disabled states based on dependencies
  const waitingRoomMode = (meeting as any)?.waitingRoomMode;
  const enableWaitingRoom =
    genericMeeting.ready && genericMeeting.enableWaitingRoom;
  const showE2EE = genericMeeting.ready && genericMeeting.enableE2EE;
  const isE2eeRelatedOptionsDisabled =
    showE2EE && Boolean((meeting as any)?.e2ee);
  const isWaitingRoomDisabled =
    genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled;
  const settingLock = (meeting as any)?.settingLock || {};

  return {
    // Join before host is disabled when waiting room is set to "all" (mode 1)
    isJoinBeforeHostDisabled:
      genericMeeting.isUpdating ||
      (enableWaitingRoom && waitingRoomMode === WAITING_ROOM_MODE.ALL),

    // Waiting room is disabled when E2EE is enabled and active
    isWaitingRoomDisabled: isWaitingRoomDisabled,

    // Waiting room type dropdown is disabled when general disabled or waiting room disabled
    isWaitingRoomTypeDisabled:
      genericMeeting.isUpdating || isWaitingRoomDisabled,

    // "Who can join" options are disabled when E2EE is enabled and active
    isAuthenticatedCanJoinDisabled:
      genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled,

    // "Who can join" dropdown is disabled when general disabled or authenticated can join disabled
    isAuthUserTypeDisabled:
      genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled,

    // Require password is disabled when E2EE is enabled and active
    isRequirePasswordDisabled:
      genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled,

    // Locked states from admin settings
    isRequirePasswordLocked: Boolean(settingLock.isMeetingSecret),
    isJoinBeforeHostLocked: Boolean(settingLock.allowJoinBeforeHost),
    isWaitingRoomLocked: Boolean(settingLock.waitingRoomMode),
    isAuthUserTypeLocked: Boolean(settingLock.isOnlyAuthUserJoin),
  };
}

/**
 * Creates a handler for requiring password changes
 */
export function createRequirePasswordChangeHandler(
  genericMeeting: GenericMeeting,
  getSettings: () => any,
) {
  return (require: boolean) => {
    // Get current settings at the time of the update
    const settings = getSettings();
    const settingLock = settings?.settingLock || {};

    // If isMeetingSecret is locked, don't allow changes
    if (settingLock.isMeetingSecret) {
      return;
    }

    const updatedSettings = {
      ...settings,
      isMeetingSecret: require,
    };

    genericMeeting.updateMeetingSettings(updatedSettings);

    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for password changes
 */
export function createPasswordChangeHandler(
  genericMeeting: GenericMeeting,
  getSettings: () => any,
) {
  return (password: string) => {
    const settings = getSettings();

    const updatedSettings = {
      ...settings,
      meetingPassword: password,
    };

    genericMeeting.updateMeetingSettings(updatedSettings);

    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for "who can join" changes
 */
export function createWhoCanJoinChangeHandler(
  genericMeeting: GenericMeeting,
  getSettings: () => any,
) {
  return (value: string) => {
    // Get current settings at the time of the update
    const settings = getSettings();
    const settingLock = settings?.settingLock || {};

    // Use the core logic to calculate updates
    const updates = calculateWhoCanJoinUpdates(
      settings,
      value,
      settingLock,
      genericMeeting.preferences,
    );

    const updatedSettings = {
      ...settings,
      ...updates,
    };

    genericMeeting.updateMeetingSettings(updatedSettings);

    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for waiting room toggle
 */
export function createUseWaitingRoomChangeHandler(
  genericMeeting: GenericMeeting,
  getSettings: () => any,
) {
  return (use: boolean) => {
    // Get current settings at the time of the update
    const settings = getSettings();
    const settingLock = settings?.settingLock || {};

    // If waitingRoomMode is locked, don't allow changes
    if (settingLock.waitingRoomMode) {
      return;
    }

    // Use the core logic to calculate updates
    const updates = calculateUseWaitingRoomUpdates(use);

    const updatedSettings = {
      ...settings,
      ...updates,
    };

    genericMeeting.updateMeetingSettings(updatedSettings);

    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for waiting room participants changes
 */
export function createWaitingRoomParticipantsChangeHandler(
  genericMeeting: GenericMeeting,
  getSettings: () => any,
) {
  return (value: string) => {
    // Get current settings at the time of the update
    const settings = getSettings();
    const settingLock = settings?.settingLock || {};

    // If waitingRoomMode is locked, don't allow changes
    if (settingLock.waitingRoomMode) {
      return;
    }

    // Use the core logic to calculate updates
    const updates = calculateWaitingRoomParticipantsUpdates(
      value,
      settingLock,
      genericMeeting.preferences,
    );

    const updatedSettings = {
      ...settings,
      ...updates,
    };

    genericMeeting.updateMeetingSettings(updatedSettings);

    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for "start meeting after join" changes
 */
export function createStartMeetingAfterJoinChangeHandler(
  genericMeeting: GenericMeeting,
  getSettings: () => any,
) {
  return (start: boolean) => {
    // Get current settings at the time of the update
    const settings = getSettings();
    const settingLock = settings?.settingLock || {};

    // If allowJoinBeforeHost is locked, don't allow changes
    if (settingLock.allowJoinBeforeHost) {
      return;
    }

    const currentWaitingRoomMode = settings?.waitingRoomMode;

    // If waiting room is set to "all" (mode 1), don't allow enabling join before host
    if (currentWaitingRoomMode === WAITING_ROOM_MODE.ALL && !start) {
      // Cannot enable join before host when waiting room is "all"
      return;
    }

    const updatedSettings = {
      ...settings,
      allowJoinBeforeHost: !start,
    };

    genericMeeting.updateMeetingSettings(updatedSettings);

    genericMeeting.updateHasSettingsChanged(true);
  };
}
