import { HistoryCall } from '@ringcentral-integration/commons/modules/CallHistory';

import { FieldItemOption } from '../CallLogFields/FieldItem/FieldItem.interface';

// This interface will change folder in the future
export interface CallLog {
  call?: Call | HistoryCall;
  currentSessionId?: string;
  // TODO: remove sf call log interface
  nameEntities?: SfEntity[];
  relatedToEntities?: SfEntity[];
  associatedEntities?: SfEntity[];
  subjectPicklist?: string[];
  task?: Task;
  // TODO: remove sf call log interface
  navigateToEntities?: NavigateToEntities;
  currentLogCall?: CurrentLogCall;
  showLog?: boolean;
  showSpinner?: boolean;
  type?: string;
  logName?: string;
  customLogFields?: FieldItemOption[];
  disableSaveLog?: boolean;
  foundFromServerEntities?: {
    name: SfEntity[];
    relatedTo: SfEntity[];
  };
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
  webphoneSession?: object;
}

export interface SfEntity {
  id: string;
  name: string;
  phoneNumber: string;
  phoneNumbers: PhoneNumber[];
  type: SalesforceEntityType;
  isPersonAccount: null;
  personContactId: null;
  recordTypeId: null;
  isConverted: null;
  entityType?: string;
}

export type SalesforceEntityType =
  | 'Order'
  | 'Account'
  | 'Opportunity'
  | 'Case'
  | 'Contact'
  | 'Lead'
  | 'Person Account'
  | 'Campaign'
  | 'Contract'
  | 'Product'
  | 'Asset'
  | 'Solution'
  | 'Coaching'
  | 'Goal'
  | 'Metric'
  | 'WorkCoaching';

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
  matches?: any;
  tickets?: any;
  option?: string;
  ticketId?: string;
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
  isEdited?: boolean;
  isLogged?: boolean;
}

export interface NavigateToEntities {
  name: any[];
  relatedTo: any[];
}

export type CallStatus = 'onHold' | 'active' | 'callEnd';

export type CallLogTitle = 'createCallLog' | 'updateCallLog' | 'createLog';
