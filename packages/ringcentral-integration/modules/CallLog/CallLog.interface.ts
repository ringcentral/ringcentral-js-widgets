import type UserCallLogRecord from '@rc-ex/core/lib/definitions/CallLogRecord';
import type UserCallLogResponse from '@rc-ex/core/lib/definitions/CallLogResponse';
import type CallLogSyncResponse from '@rc-ex/core/lib/definitions/CallLogSyncResponse';

import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

export interface CallLogOptions {
  /**
   * local cache time, default 5 min.
   */
  ttl?: number;
  /**
   * time for token expire, default 3 min.
   */
  refreshLock?: number;
  /**
   * time for token expire, default 1 hour.
   */
  tokenExpiresIn?: number;
  /**
   * waiting time to retry, default 62 seconds.
   */
  timeToRetry?: number;
  /**
   * day span of call log, , default 7 days.
   */
  daySpan?: number;
  /**
   * polling flag, default true.
   */
  polling?: boolean;
  /**
   * disable cache flag, default false.
   */
  disableCache?: boolean;
  /**
   * limit List, default false.
   */
  isLimitList?: boolean;
  /**
   * list record count per page, default 250.
   */
  listRecordCount?: number;
  /**
   * full sync record count, default 250.
   */
  recordCount?: number;
  /**
   * disable handling the deleted call log.
   */
  enableDeleted?: boolean;
}

export interface Deps {
  auth: Auth;
  client: any;
  extensionPhoneNumber: ExtensionPhoneNumber;
  extensionInfo: ExtensionInfo;
  subscription: Subscription;
  appFeatures: AppFeatures;
  tabManager?: TabManager;
  storage?: Storage;
  callLogOptions?: CallLogOptions;
}

export type CallLogRecord = Pick<
  UserCallLogRecord,
  Exclude<keyof UserCallLogRecord, 'startTime'>
> & {
  // TODO: fix type issue in 'CallLogRecord' in '@rc-ex/core/lib/definitions'
  startTime: number;
};

export type CallLogItem = Pick<
  CallLogRecord,
  Exclude<keyof UserCallLogRecord, 'uri'>
>;

export type CallLogSyncData = Pick<CallLogSyncResponse, 'syncInfo' | 'uri'> & {
  records: CallLogList;
};

export type CallLogList = CallLogItem[];

export type CallLogRecords = CallLogRecord[];

export type UserCallLogResponseData = Pick<
  UserCallLogResponse,
  Exclude<keyof UserCallLogResponse, 'records'>
> & {
  // TODO: fix type issue in 'CallLogResponse' in '@rc-ex/core/lib/definitions'
  records: CallLogRecords;
};

export interface CallLogData {
  list: string[];
  map: Record<string, CallLogRecord>;
  token: string | null;
  timestamp: number | null;
}

export interface SyncSuccessOptions {
  timestamp: number;
  syncToken: string;
  daySpan: number;
  records?: CallLogList;
  supplementRecords?: CallLogList;
}
