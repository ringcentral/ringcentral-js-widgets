import {
  CallLogSync,
  UserCallLogRecord,
  UserCallLogResponse,
} from '@rc-ex/core/definitions';
import { Auth } from '../AuthV2';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumberV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManagerV2';
import { Storage } from '../StorageV2';
import { ExtensionFeatures } from '../ExtensionFeatures';

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
  //  = LIST_RECORD_COUNT,
  /**
   * list record count pre page, default 250.
   */
  listRecordCount?: number;
}

export interface Deps {
  auth: Auth;
  client: any;
  extensionPhoneNumber: ExtensionPhoneNumber;
  extensionInfo: ExtensionInfo;
  subscription: Subscription;
  extensionFeatures: ExtensionFeatures;
  tabManager?: TabManager;
  storage?: Storage;
  callLogOptions?: CallLogOptions;
}

export type CallLogRecord = Pick<
  UserCallLogRecord,
  Exclude<keyof UserCallLogRecord, 'startTime'>
> & {
  // TODO: fix type issue in 'UserCallLogRecord' in '@rc-ex/core/definitions'
  startTime: number;
};

export type CallLogItem = Pick<
  CallLogRecord,
  Exclude<keyof UserCallLogRecord, 'uri'>
>;

export type CallLogSyncData = Pick<CallLogSync, 'syncInfo' | 'uri'> & {
  records: CallLogList;
};

export type CallLogList = CallLogItem[];

export type CallLogRecords = CallLogRecord[];

export type UserCallLogResponseData = Pick<
  UserCallLogResponse,
  Exclude<keyof UserCallLogResponse, 'records'>
> & {
  // TODO: fix type issue in 'UserCallLogRecord' in '@rc-ex/core/definitions'
  records: CallLogRecords;
};

export interface CallLogData {
  list: CallLogRecords;
  token: string;
  timestamp: number;
}

export interface SyncSuccessOptions {
  timestamp: number;
  syncToken: string;
  daySpan: number;
  records?: CallLogList;
  supplementRecords?: CallLogList;
}
