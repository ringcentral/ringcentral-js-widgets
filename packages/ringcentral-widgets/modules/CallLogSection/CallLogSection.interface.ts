import type { CallHistory } from '@ringcentral-integration/commons/modules/CallHistory';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { Storage } from '@ringcentral-integration/commons/modules/Storage';

export interface CallLogSectionCallStatus {
  isEdited: boolean;
  isSucceed: boolean;
  isSaving: boolean;
}

export interface CallLogStatus {
  isSucceed: boolean;
  isEdited: boolean;
  latestSaveTime: number;
  latestUpdateTime: number;
}

export type CallsMappingType = Record<string, CallLogStatus>;

export interface CallLogSectionOptions {
  notSyncOpenState: boolean;
}

export interface Deps {
  storage: Storage;
  callHistory: CallHistory;
  callMonitor: CallMonitor;
  callLogSectionOptions: CallLogSectionOptions;
}

export type AddLogHandlerFunctions = {
  logFunction?: (identify: string, ...args: any) => {};
  readyCheckFunction?: (identify?: string, ...args: any) => boolean;
  onSuccess?: (identify: string, ...args: any) => void;
  onUpdate?: (identify: string, ...args: any) => void;
  onError?: (identify: string, ...args: any) => void;
};
