import type { CallLoggerTriggerType } from '../../enums/callLoggerTriggerTypes';
import type { Entity } from '../../interfaces/Entity.interface';
import type { ActiveCall } from '../../interfaces/Presence.model';
import type { LogOptions as BaseLogOptions } from '../../lib/LoggerBase';
import type { ActivityMatcher } from '../ActivityMatcher';
import type { CallHistory, HistoryCall } from '../CallHistory';
import type { CallMonitor } from '../CallMonitor';
import type { ContactMatcher } from '../ContactMatcher';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';

export interface CallLoggerOptions {
  autoLog?: boolean;
  logFunction: <P, S>(options: BaseLogOptions<P, S>) => Promise<void>;
  readyCheckFunction: () => boolean;
}

export interface Deps {
  storage: Storage;
  callHistory: CallHistory;
  callMonitor: CallMonitor;
  callLoggerOptions: CallLoggerOptions;
  activityMatcher?: ActivityMatcher;
  contactMatcher?: ContactMatcher;
  tabManager?: TabManager;
}

export type Hook = (sessionId: string) => boolean;

export type UpdatedCallLog = HistoryCall & {
  isTransferredCall: boolean;
  transferredMiddleNumber: string;
};

export type UpdatedCallMap = {
  presenceUpdate: ActiveCall & {
    isTransferredCall: boolean;
    transferredMiddleNumber: string;
    phoneNumberUpdated?: boolean;
  };
  callLogSync: UpdatedCallLog;
};

export type UpdatedCall<T extends keyof UpdatedCallMap> = UpdatedCallMap[T];

export type LogCallOptions<T> = {
  call: HistoryCall | ActiveCall;
  contact: Entity;
} & T;

export interface AutoLogCallOptions {
  call: HistoryCall | ActiveCall;
  fromEntity?: Entity;
  toEntity?: Entity;
  triggerType: CallLoggerTriggerType;
}

export interface TransferredCall {
  transferredMiddleNumber: string;
}

export type LogOptions<T> = {
  // TODO: fix type for sessionId
  call: Record<string, any> & {
    // sessionId: string;
    duration: number;
    result: ActiveCall['result'] | HistoryCall['telephonyStatus'];
  };
  fromEntity?: Entity;
  toEntity?: Entity;
} & T;
