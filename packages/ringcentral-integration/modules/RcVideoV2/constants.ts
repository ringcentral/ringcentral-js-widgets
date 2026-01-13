export const RCV_WAITING_ROOM_MODE = {
  Nobody: 0,
  Everybody: 1,
  GuestsOnly: 2,
  OtherAccount: 3,
} as const;

export const RCV_WAITING_ROOM_MODE_REVERSE = {
  0: 'Nobody',
  1: 'Everybody',
  2: 'GuestsOnly',
  3: 'OtherAccount',
} as const;
