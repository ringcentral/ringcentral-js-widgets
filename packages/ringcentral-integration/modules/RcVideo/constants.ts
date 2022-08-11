const RCV_WAITING_ROOM_API_KEYS = 'waitingRoomMode';

const ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';

const AUTH_USER_TYPE = {
  SIGNED_IN_CO_WORKERS: 'signedInCoWorkers',
  SIGNED_IN_USERS: 'signedInUsers',
} as const;

const JBH_LABEL = {
  JOIN_AFTER_HOST: 'onlyJoinAfterHost',
  JOIN_AFTER_ME: 'onlyJoinAfterMe',
} as const;

const RCV_WAITING_ROOM_MODE = {
  off: 0,
  all: 1,
  guests: 2,
  notcoworker: 3,
} as const;

const DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH = {
  isMeetingSecret: false,
  [RCV_WAITING_ROOM_API_KEYS]: RCV_WAITING_ROOM_MODE.off,
  isOnlyAuthUserJoin: false,
};
const RCV_WAITING_ROOM_MODE_REVERSE: RcvWaitingRoomModeReverse = {
  0: 'all',
  1: 'all',
  2: 'guests',
  3: 'notcoworker',
} as const;

const RCV_PASSWORD_REGEX = /^[A-Za-z0-9]{1,10}$/;

const INVITATION_BOUNDARY_REGEX =
  /-*Boundary(_\d+)*-*(\r\n)?|((Content-Type|Content-Disposition).+((\r\n)+(\s+\n)?))|-{3}(\n\r\n)*/g;

const RCV_E2EE_API_KEYS = 'e2ee';

const RCV_ITEM_NAME = {
  scheduleFor: 'scheduleFor',
  isMeetingSecret: 'isMeetingSecret',
  meetingPassword: 'meetingPassword',
  allowJoinBeforeHost: 'allowJoinBeforeHost',
  waitingRoomMode: 'waitingRoomMode',
  waitingRoomType: 'waitingRoomType',
  e2ee: 'e2ee',
  isOnlyAuthUserJoin: 'isOnlyAuthUserJoin',
  isOnlyCoworkersJoin: 'isOnlyCoworkersJoin',
  muteVideo: 'muteVideo',
  muteAudio: 'muteAudio',
  allowScreenSharing: 'allowScreenSharing',
} as const;

type RcvItemType = typeof RCV_ITEM_NAME[keyof typeof RCV_ITEM_NAME];

type AUTH_USER = typeof AUTH_USER_TYPE[keyof typeof AUTH_USER_TYPE];

// eslint-disable-next-line max-len
type RcvWaitingRoomModeProps =
  typeof RCV_WAITING_ROOM_MODE[keyof typeof RCV_WAITING_ROOM_MODE];

// eslint-disable-next-line max-len
type RcvWaitingRoomType = Exclude<keyof typeof RCV_WAITING_ROOM_MODE, 'off'>;

type RcvWaitingRoomModeReverse = {
  [key in RcvWaitingRoomModeProps]: RcvWaitingRoomType;
};

export {
  ASSISTED_USERS_MYSELF,
  AUTH_USER,
  AUTH_USER_TYPE,
  DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH,
  INVITATION_BOUNDARY_REGEX,
  JBH_LABEL,
  RCV_E2EE_API_KEYS,
  RCV_ITEM_NAME,
  RCV_PASSWORD_REGEX,
  RCV_WAITING_ROOM_API_KEYS,
  RCV_WAITING_ROOM_MODE,
  RCV_WAITING_ROOM_MODE_REVERSE,
  RcvItemType,
  RcvWaitingRoomModeProps,
  RcvWaitingRoomModeReverse,
};

export type { RcvWaitingRoomType };
