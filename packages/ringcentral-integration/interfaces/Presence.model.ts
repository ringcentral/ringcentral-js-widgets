import {
  ActiveCallInfo,
  CallLogCallerInfo,
  GetPresenceInfo,
  UserCallLogRecord,
} from '@rc-ex/core/definitions';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import { dndStatus } from '../enums/dndStatus';
import { presenceStatus } from '../enums/presenceStatus.enum';

export interface PresenceModel {
  dndStatus: string;
  // meetingStatus is optional as our app does not use it
  meetingStatus?: string;
  presenceStatus: string;
}

// TODO: fix type `GetPresenceInfo['activeCalls']` in `@rc-ex/core/definitions`
export type ActiveCall = Pick<
  ActiveCallInfo,
  Exclude<keyof ActiveCallInfo, 'to' | 'from' | 'startTime'>
> & {
  // TODO: remove optional type
  to?: CallLogCallerInfo;
  from?: CallLogCallerInfo;
  action?: UserCallLogRecord['action'];
  result?: UserCallLogRecord['result'];
  // normalize StartTime in CallLog/Presence/ActiveCalls
  startTime?: number;
  duration?: number;
};

export interface PresenceInfoModel {
  activeCalls?: ActiveCall[];
  dndStatus?: ObjectMapValue<typeof dndStatus>;
  meetingStatus?: GetPresenceInfo['meetingStatus'];
  presenceStatus?: ObjectMapValue<typeof presenceStatus>;
  telephonyStatus?: GetPresenceInfo['telephonyStatus'];
  userStatus?: GetPresenceInfo['userStatus'];
  lastDndStatus?: ObjectMapValue<typeof dndStatus>;
  sequence?: number;
}
