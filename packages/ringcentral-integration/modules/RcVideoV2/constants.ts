export const ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';

export const RCV_WAITING_ROOM_MODE = {
  off: 0,
  all: 1,
  guests: 2,
  notcoworker: 3,
} as const;

// eslint-disable-next-line max-len
export type RcvWaitingRoomModeProps = typeof RCV_WAITING_ROOM_MODE[keyof typeof RCV_WAITING_ROOM_MODE];

// eslint-disable-next-line max-len
export type RcvWaitingRoomType = Exclude<
  keyof typeof RCV_WAITING_ROOM_MODE,
  'off'
>;

export type RcvWaitingRoomModeReverse = {
  [key in RcvWaitingRoomModeProps]: RcvWaitingRoomType;
};

export const RCV_WAITING_ROOM_MODE_REVERSE: RcvWaitingRoomModeReverse = {
  0: 'all',
  1: 'all',
  2: 'guests',
  3: 'notcoworker',
} as const;
