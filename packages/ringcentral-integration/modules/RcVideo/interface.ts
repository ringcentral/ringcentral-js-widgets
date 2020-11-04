import {
  RCV_WAITING_ROOM_MODE,
  RCV_WAITING_ROOM_MODE_REVERSE,
} from './constants';

export interface RcvDelegator {
  extensionId: string;
  id: string;
  name: string;
  accountId: string;
  isLoginUser?: boolean;
}

// eslint-disable-next-line max-len
export type RcvWaitingRoomModeProps = typeof RCV_WAITING_ROOM_MODE[keyof typeof RCV_WAITING_ROOM_MODE];

// eslint-disable-next-line max-len
export type RcvWaitingRoomType = typeof RCV_WAITING_ROOM_MODE_REVERSE[keyof typeof RCV_WAITING_ROOM_MODE_REVERSE];
