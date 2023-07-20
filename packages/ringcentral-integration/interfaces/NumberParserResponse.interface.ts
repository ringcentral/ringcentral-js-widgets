export interface Country {
  isoCode: string;
  name?: string;
  callingCode?: string;
}

export type NumberDetailsStatus = 'Valid' | 'Possible' | 'Invalid';

export enum Category {
  Unknown = 'Unknown',
  ServiceCode = 'ServiceCode',
  SpecialService = 'SpecialService',
  Extension = 'Extension',
  Regular = 'Regular',
  TollFree = 'TollFree',
  ShortCode = 'ShortCode',
  Ambiguous = 'Ambiguous',
}

export const ContextSourceOption = {
  default: 'Default',
  account: 'Account',
};

export type ConflictHandling = 'Default' | 'Client';

export interface ContextParam {
  brandId?: string;
  country?: Country;
  defaultAreaCode?: string;
  vanityPhoneNumbersAllowed?: boolean;
  maxExtensionNumberLength?: number;
  shortCodesAllowed?: boolean;
  siteCode: string;
  shortExtensionNumberLength?: number;
  outboundCallPrefix?: string;
  maskedPhoneNumbersAllowed?: boolean;
  maskSymbol?: string;
  maskLength?: number;
  conflictHandling?: ConflictHandling;
}

export interface DialingDetails {
  serviceCode?: {
    dialing?: string;
    pattern?: string;
  };
  outboundCallPrefix?: string;
  specialPrefix?: {
    dialing?: string;
    pattern?: string;
  };
}

// introduce number parser v2
export enum NumberDetailsType {
  Unknown = 'Unknown',
  Emergency = 'Emergency',
  DirectoryAssistance = 'DirectoryAssistance',
  UpdateEmergencyAddress = 'UpdateEmergencyAddress',
  CustomerSupport = 'CustomerSupport',
  NonEmergencyPolice = 'NonEmergencyPolice',
  NonEmergencyMedical = 'NonEmergencyMedical',
  TelecommunicationRelay = 'TelecommunicationRelay',
  Unsupported = 'Unsupported',
  Supplementary = 'Supplementary',
}

export interface NumberDetails {
  siteCode?: string;
  shortExtensionNumber?: string;
  extensionNumber?: string;
  specialService?: {
    type?: NumberDetailsType;
    pattern?: string;
  };
  country?: Country;
  nationalDestinationCode?: string;
  areaCode?: string;
  regionalDestinationCode?: string;
  subscriberNumber?: string;
  subAddress?: string;
  dtmfPostfix?: string;
  sipPostfix?: string;
  probablyMasked?: boolean;
  status?: NumberDetailsStatus;
}

export interface ResultFormattedItem {
  category?: Category;
  e164?: string;
  e164Extended?: string;
  national?: string;
  nationalExtended?: string;
  international?: string;
  internationalExtended?: string;
  dialable?: string;
  dialableExtended?: string;
}

export interface ParsePhoneNumberResultsItem {
  originalString: string;
  category: Category;
  dialingDetails: DialingDetails;
  numberDetails: NumberDetails;
  formats: Array<ResultFormattedItem>;
}

export interface NumberParserAPIResponse {
  context?: ContextParam;
  results: Array<ParsePhoneNumberResultsItem>;
}

export interface ParsePhoneNumberAPIParam {
  originalStrings: Array<string>;
  contextSource?: (typeof ContextSourceOption)[keyof typeof ContextSourceOption];
  context?: {
    brandId?: string;
    country?: Pick<Country, 'isoCode'>;
    defaultAreaCode?: string;
    vanityPhoneNumbersAllowed?: boolean;
    maxExtensionNumberLength?: number;
    shortCodesAllowed?: boolean;
    siteCode?: string;
    shortExtensionNumberLength?: number;
    outboundCallPrefix?: string;
    maskedPhoneNumbersAllowed?: boolean;
    conflictHandling?: ConflictHandling;
  };
  resultContent?: {
    includeNumberDetails?: boolean;
    includeDialingDetails?: boolean;
    includeFormatting?: boolean;
  };
}
