export interface CallLogStatus {
  isSucceed: boolean;
  isEdited: boolean;
  latestSaveTime: number;
  latestUpdateTime: number;
  isSaving: boolean;
}

export interface CallLogUIStatus extends CallLogStatus {
  isFailed: boolean;
  isAutoSave: boolean;
  isCreated: boolean;
  isSaveDelaying: boolean;
}

export type CallsMapping = Record<string, CallLogStatus>;

export interface CallLogSectionOptions {}

export type AddLogHandlerFunctions = {
  logFunction?: (identify: string, ...args: any) => unknown | Promise<unknown>;
  onSuccess?: (identify: string, ...args: any) => void | Promise<void>;
  onUpdate?: (identify: string, ...args: any) => void | Promise<void>;
  onError?: (identify: string, ...args: any) => void | Promise<void>;
};
