import { getTranslateFn } from '@ringcentral-integration/utils';

import { RCV_WAITING_ROOM_MODE } from '../../services/RcVideo/constants';

import i18n from './i18n';

const t = getTranslateFn(i18n);

export const MEETING_CONFIG = {
  DEFAULT_DURATION_MINUTES: 60,
  DEFAULT_MEETING_TITLE: 'RingCentral Video Meeting',
} as const;

// Waiting Room Mode Constants (reusing existing constants)
export const WAITING_ROOM_MODE = {
  OFF: RCV_WAITING_ROOM_MODE.off, // 0
  ALL: RCV_WAITING_ROOM_MODE.all, // 1
  GUESTS: RCV_WAITING_ROOM_MODE.guests, // 2
  NOT_COWORKER: RCV_WAITING_ROOM_MODE.notcoworker, // 3
} as const;

// Who Can Join Options
export const WHO_CAN_JOIN_OPTIONS = {
  ANYONE_WITH_LINK: 'anyoneWithLink',
  ONLY_RINGCENTRAL_ACCOUNTS: 'onlyRingCentralAccounts',
  ONLY_MY_COWORKERS: 'onlyMyCoworkers',
} as const;

// Waiting Room Participants Options
export const WAITING_ROOM_PARTICIPANTS_OPTIONS = {
  ALL_PARTICIPANTS: 'allParticipants',
  FOR_ANYONE_OUTSIDE_MY_COMPANY: 'forAnyoneOutsideMyCompany',
  FOR_ANYONE_NOT_SIGNED_IN: 'forAnyoneNotSignedIn',
} as const;

export const DURATION_VALUES = {
  HOURS: Array.from({ length: 13 }, (_, i) => i.toString().padStart(2, '0')),
  MINUTES: ['00', '15', '30', '45'],
};

export const getDurationOptions = () => ({
  HOURS: DURATION_VALUES.HOURS.map((value) => ({
    label: `${value} ${t('hour')}`,
    value,
  })),
  MINUTES: DURATION_VALUES.MINUTES.map((value) => ({
    label: `${value} ${t('minute')}`,
    value,
  })),
});

export const constructPersonalMeetingLink = (joinUrl?: string): string => {
  return joinUrl?.split('?')[0] || '';
};
