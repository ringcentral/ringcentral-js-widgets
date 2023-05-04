import type ActiveCallInfo from '@rc-ex/core/lib/definitions/ActiveCallInfo';
import type CallLogCallerInfo from '@rc-ex/core/lib/definitions/CallLogCallerInfo';
import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import type UserCallLogRecord from '@rc-ex/core/lib/definitions/UserCallLogRecord';
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
  to: CallLogCallerInfo;
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
