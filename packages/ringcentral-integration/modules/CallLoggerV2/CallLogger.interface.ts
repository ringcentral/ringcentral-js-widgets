import { Storage } from '../StorageV2';
import { CallHistory, HistoryCall } from '../CallHistoryV2';
import { CallMonitor } from '../CallMonitorV2';
import { ActivityMatcher } from '../ActivityMatcherV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { TabManager } from '../TabManager';
import { LogOptions as BaseLogOptions } from '../../lib/LoggerBaseV2';
import { Entity } from '../../interfaces/Entity.interface';
import { CallLoggerTriggerType } from '../../enums/callLoggerTriggerTypes';
import { ActiveCall } from '../../interfaces/Presence.model';

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

export type UpdatedCallMap = {
  presenceUpdate: ActiveCall & {
    isTransferredCall: boolean;
    transferredMiddleNumber: string;
    phoneNumberUpdated?: boolean;
  };
  callLogSync: HistoryCall & {
    isTransferredCall: boolean;
    transferredMiddleNumber: string;
  };
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
