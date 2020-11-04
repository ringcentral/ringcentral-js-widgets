export const ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';

export const RCV_WAITING_ROOM_MODE = {
  off: 0,
  all: 1,
  guests: 2,
  notcoworker: 3,
} as const;

export const RCV_WAITING_ROOM_MODE_REVERSE = {
  0: 'all',
  1: 'all',
  2: 'guests',
  3: 'notcoworker',
} as const;
