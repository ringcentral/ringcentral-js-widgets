import { CallLoggerTriggerType } from '../../enums/callLoggerTriggerTypes';
import { Entity } from '../../interfaces/Entity.interface';
import { ActiveCall } from '../../interfaces/Presence.model';
import { LogOptions as BaseLogOptions } from '../../lib/LoggerBase';
import { ActivityMatcher } from '../ActivityMatcher';
import { CallHistory, HistoryCall } from '../CallHistory';
import { CallMonitor } from '../CallMonitor';
import { ContactMatcher } from '../ContactMatcher';
import { Storage } from '../Storage';
import { TabManager } from '../TabManager';

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
