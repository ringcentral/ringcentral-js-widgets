export interface CallLogStatus {
  isSucceed: boolean;
  isEdited: boolean;
  latestSaveTime: number;
  latestUpdateTime: number;
  isSaving: boolean;
}

export type CallsMapping = Record<string, CallLogStatus>;

export interface SimpleCrmObject {
  type?: string;
  id?: string;
  name?: string;
}

export interface RecordsSelectionInfo {
  displayedSelection?: SimpleCrmObject;
  selections?: SimpleCrmObject[];
}

export type CallSelectionMap = Record<string, RecordsSelectionInfo>;
