import type { CallLoggerTriggerType } from '@ringcentral-integration/commons/enums/callLoggerTriggerTypes';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { ActiveCall } from '@ringcentral-integration/commons/interfaces/Presence.model';
import type { LogOptions as BaseLogOptions } from '@ringcentral-integration/micro-core/src/app/services';

import type { HistoryCall } from '../CallHistory';

export interface CallLoggerOptions {
  autoLog?: boolean;
  logFunction: <P, S>(options: BaseLogOptions<P, S>) => Promise<void>;
  readyCheckFunction: () => boolean;
}

export type Hook = (sessionId: string) => boolean;

export type UpdatedCallLog = HistoryCall & {
  isTransferredCall: boolean;
  transferredMiddleNumber: string | null;
};

export type UpdatedCallMap = {
  presenceUpdate: ActiveCall & {
    isTransferredCall: boolean;
    transferredMiddleNumber?: string | null;
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
