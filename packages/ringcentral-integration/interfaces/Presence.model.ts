import type ActiveCallInfo from '@rc-ex/core/lib/definitions/ActiveCallInfo';
import type CallLogFromParty from '@rc-ex/core/lib/definitions/CallLogFromParty';
import type CallLogRecord from '@rc-ex/core/lib/definitions/CallLogRecord';
import type CallLogToParty from '@rc-ex/core/lib/definitions/CallLogToParty';
import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import type { dndStatus } from '../enums/dndStatus';
import type { presenceStatus } from '../enums/presenceStatus.enum';

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
  to: CallLogToParty;
  from?: CallLogFromParty;
  action?: CallLogRecord['action'];
  result?: CallLogRecord['result'];
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
  sequence?: number;
}
