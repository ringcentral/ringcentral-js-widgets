import type { FormattedConversation } from '../Conversations';

export enum SMSOptStatus {
  OptOut = 'OptOut',
  OptIn = 'OptIn',
}

export enum SmsConsentCoverage {
  PhoneNumber = 'PhoneNumber',
  Account = 'Account',
  CampaignType = 'CampaignType',
}

export enum SmsOptSource {
  Recipient = 'Recipient',
  Api = 'Api',
  Upstream = 'Upstream',
  Carrier = 'Carrier',
}

export enum SmsCampaignType {
  Conversational = 'Conversational',
  Informational = 'Informational',
  Promotional = 'Promotional',
}

export enum SmsCoverageCampaignType {
  PhoneNumber = 'PhoneNumber',
  Account = 'Account',
  Conversational = 'Conversational',
  Informational = 'Informational',
  Promotional = 'Promotional',
}

export enum ConsentControlLevel {
  Edit = 'Edit',
  View = 'View',
  None = 'None',
}

export type SMSConsent = {
  to: string;
  optStatus: SMSOptStatus;
  coverage: SmsConsentCoverage;
  source: SmsOptSource | string;
  notes?: string;
  lastModifiedTime: string;
  campaignType?: SmsCampaignType;
  from?: string;
};

export type SmsConsentChangeEventRecord = {
  from: string;
  to: string;
  optStatus: SMSOptStatus | string;
  source: SmsOptSource | string;
};

export type SmsConsentChangeEventBody = {
  etag?: string;
  records?: SmsConsentChangeEventRecord[];
};

export type BaseUpdateSMSConsent = Omit<SMSConsent, 'lastModifiedTime'>;

export type UpdateSMSConsentRequest = {
  records: BaseUpdateSMSConsent[];
};

export type UpdateSMSConsentResponse = {
  failedRecords: SMSOptFailureRecord[];
};

export type SMSOptFailureRecord = BaseUpdateSMSConsent & {
  error: {
    errorCode: string;
    message: string;
  };
};

export type EffectiveConsentResponse = {
  explicitConsents: SMSConsent[];
  campaignSettings: {
    campaignType: SmsCampaignType;
    optInRequired: boolean;
  };
  optStatus?: SMSOptStatus;
};

export type SmsConsentRecordsPaging = {
  perPage: number;
  pageToken?: string;
  nextPageToken?: string;
  previousPageToken?: string;
  firstPageToken?: string;
};

export type SearchSmsConsentRecordsRequest = {
  from?: string[];
  to?: string[];
  optStatus?: SMSOptStatus;
  coverage?: SmsConsentCoverage[];
  campaignType?: SmsCampaignType[];
  pageToken?: string;
  perPage?: number;
};

export type SearchSmsConsentRecordsResponse = {
  records: SMSConsent[];
  paging: SmsConsentRecordsPaging;
};

export type PhoneNumberPair = {
  from: string;
  to: string;
};

export type SmsConsentSettings = {
  optInRequired: boolean;
  coverage: {
    optIn: SmsCoverageCampaignType;
    optOut: SmsCoverageCampaignType;
  };
  automaticConsentCollecting?: {
    enabled: boolean;
    replyMessageBody?: string;
  };
};

export type SmsCampaignInfo = {
  id: string;
  consentSettings: SmsConsentSettings;
  coverageType: SmsCoverageCampaignType;
};

export type SmsBrandInfo = {
  id: string;
  status: string;
  externalId: string;
};

export type SmsConfigurationRecord = {
  phoneNumberId: string;
  phoneNumber: string;
  smsCampaignInfo?: SmsCampaignInfo;
  smsBrandInfo?: SmsBrandInfo;
};

export type SmsConfigurationResponse = SmsConfigurationRecord;

export type SmsConsentFetchStatus = 'idle' | 'fetching' | 'success' | 'error';

export type SmsConsentState<T> = {
  status: SmsConsentFetchStatus;
  data?: T;
  error?: string;
};

export type SmsConsentConversation = Pick<
  FormattedConversation,
  | 'conversationId'
  | 'type'
  | 'direction'
  | 'self'
  | 'correspondents'
  | 'from'
  | 'to'
>;

export type SmsConsentRecordScope = {
  coverage: SmsConsentCoverage;
  campaignType?: SmsCampaignType;
};

export type SaveSmsConsentRecordOptions = {
  from: string;
  to: string;
  optStatus: SMSOptStatus;
  notes: string;
} & SmsConsentRecordScope;
