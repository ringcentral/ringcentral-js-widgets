import { FieldItemOption } from '../CallLogFields/FieldItem/FieldItem.interface';

// This interface will change folder in the future
export interface CallLog {
  call?: Call;
  currentSessionId?: string;
  // TODO remove sf call log interface
  nameEntities?: SfEntity[];
  relatedToEntities?: SfEntity[];
  subjectPicklist?: string[];
  task?: Task;
  // TODO remove sf call log interface
  navigateToEntities?: NavigateToEntities;
  currentLogCall?: CurrentLogCall;
  showLog?: boolean;
  showSpinner?: boolean;
  type?: string;
  logName?: string;
  customLogFields?: FieldItemOption[];
}

export interface Call {
  id: string;
  sessionId: string;
  startTime: number;
  duration?: number;
  type?: string;
  direction?: string;
  action?: string;

  result?: string;
  to?: PhoneInfo;
  from: PhoneInfo;
  extension?: Extension;
  fromMatches: SfEntity[];
  toMatches: any[];
  activityMatches: SfEntity[];
  telephonyStatus: any;
  telephonySessionId: any;

  partyId: string;
  offset: number;
}

export interface SfEntity {
  id: string;
  name: string;
  phoneNumber: string;
  phoneNumbers: PhoneNumber[];
  type: string;
  isPersonAccount: null;
  personContactId: null;
  recordTypeId: null;
  isConverted: null;
  entityType?: string;
}

export interface PhoneNumber {
  phoneNumber: string;
  phoneType: string;
}

export interface Extension {
  uri: string;
  id: number;
}

export interface PhoneInfo {
  phoneNumber: string;
  name?: string;
  extensionId?: string;
}

export interface CurrentLogCall {
  nameEntities?: string[];
  relatedToEntities?: any[];
  phoneNumber?: string;
  taskId?: string;
  task?: Task;
  isFailed?: boolean;
  isAutoSave?: boolean;
  isCreated?: boolean;
}

export interface Task {
  id?: string;
  priority?: string;
  external_whoid__c?: string;
  whoid?: string;
  whatid?: string;
  description?: string;
  activitydate?: number;
  callobject?: string;
  calltype?: string;
  status?: string;
  RC_Logging_Type__c?: string;
  TaskSubtype?: string;
  subject?: string;
  calldisposition?: string;
  calldurationinseconds?: number;
  recording_information__c?: string;
}

export interface NavigateToEntities {
  name: any[];
  relatedTo: any[];
}

export type CallStatus = 'onHold' | 'active' | 'callEnd';
