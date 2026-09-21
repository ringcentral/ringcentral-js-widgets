export interface PhoneNumber {
  number: string;
  type: string;
}

export type LogCallsMultiMatchStrategy =
  | 'DONT_LINK_CONTACT'
  | 'ALPHABETICAL'
  | 'RECENTLY_ACTIVE'
  | 'RECENTLY_UPDATED'
  | 'ALL_MATCHING'
  | 'CUSTOM_RULES';

export type LogCallsUnknownNumberStrategy =
  | 'SKIP'
  | 'LOG_WITHOUT_LINKING'
  | 'CREATE_CONTACT'
  | 'AUTO_CREATE_RECORD';

export type CallTypeLoggingPreference =
  | 'ALL'
  | 'OUTGOING_CALLS'
  | 'INCOMING_ANSWERED'
  | 'MISSED_WITH_VOICEMAIL'
  | 'MISSED_WITHOUT_VOICEMAIL';

export type ContactTypeLoggingPreference = 'ALL' | 'COMPANY' | 'OUTSIDE_COMPANY';

export interface AccountConfigurationResponse {
  id: 'auto-call-logging';
  modifiedBy: string;
  logCallsSubCategoryMultipleMatches: SUBCATEGORY_MATCHING_SETTING;
  updatedAt: string;
  isEnabled: boolean;
  logCallsUnknownNumber: LogCallsUnknownNumberStrategy;
  logCallsMultipleMatches: LogCallsMultiMatchStrategy;
  delayInCallLogging: DELAY_IN_CALL_LOGGING;
  exclusionListDetails: ParticipantDetail[];
  contactTypes: ContactTypeLoggingPreference[];
  inclusionList: string[];
  exclusionList: string[];
  callTypes: CallTypeLoggingPreference[];
  inclusionListDetails: ParticipantDetail[];
  namePriorityStandardObject: string[] | UifSoftphoneLayoutItem[];
  relatedToPriorityStandardObject: string[] | UifSoftphoneLayoutItem[];
  relatedToPriorityCustomObject: UifSoftphoneLayoutItem[];
  namePriorityCustomObject: UifSoftphoneLayoutItem[];
  isStandardObject: boolean;
  recordCreationConfig: RecordCreationConfig;
  isAutoLogAiNotesEnabled?: boolean;
}

export enum SUBCATEGORY_MATCHING_SETTING {
  ALPHABETICAL = 'ALPHABETICAL',
  RECENTLY_ACTIVE = 'RECENTLY_ACTIVE',
}

export enum DELAY_IN_CALL_LOGGING {
  NO_DELAY = 'NO_DELAY',
  '5_MIN' = '5_MIN',
  '10_MIN' = '10_MIN',
  '15_MIN' = '15_MIN',
  '20_MIN' = '20_MIN',
  '25_MIN' = '25_MIN',
  '30_MIN' = '30_MIN',
}

export type ParticipantDetail = {
  id: string;
  type: string | null;
  name: string;
  accountId: string;
  source: string;
  email: string | null;
  phoneNumbers: PhoneNumber[] | null;
  profileImageUrl?: string;
  extensionNumber?: string | null;
};

export interface UifSoftphoneLayoutItem {
  labelName: string;
  apiName: string;
}

export interface RecordTypeTemplate {
  labelName: string;
  apiName: string;
  defaultValue: any;
  type: string;
  length: number;
  picklistValues: string[];
}

export type NameObject = 'Contact' | 'Lead';

export interface RecordCreationConfig {
  autoCreateRecordType: NameObject;
  contactRecordTypeTemplate: RecordTypeTemplate[];
  leadRecordTypeTemplate: RecordTypeTemplate[];
}
