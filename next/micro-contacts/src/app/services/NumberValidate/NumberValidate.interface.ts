import type PhoneNumberInfoNumberParser from '@rc-ex/core/lib/definitions/PhoneNumberInfoNumberParser';
import type {
  ConflictHandling,
  Country,
  ResultFormattedItem,
} from '@ringcentral-integration/commons/interfaces/NumberParserResponse.interface';

export interface NumberValidateOptions {
  //
}

export type ValidateFormattedError = {
  phoneNumber: string;
  type: 'noToNumber' | 'noAreaCode';
}[];

export type ValidateParsedError = {
  phoneNumber: string;
  type: 'specialNumber' | 'notAnExtension';
}[];

export type ValidatedPhoneNumbers = (PhoneNumberInfoNumberParser & {
  availableExtension?: string;
  isAnExtension?: boolean;
})[];

export type ValidateFormattingResult = {
  result: boolean;
  errors: ValidateFormattedError;
};

export type ValidateParsingResult = {
  result: boolean;
  errors: ValidateParsedError;
  numbers?: ValidatedPhoneNumbers;
};

export type ValidateResult = ValidateFormattingResult | ValidateParsingResult;

// introduce number parser v2

export const contextSourceOption = {
  default: 'Default',
  account: 'Account',
};

export interface ParsePhoneNumberAPIParam {
  originalStrings: Array<string>;
  contextSource?: (typeof contextSourceOption)[keyof typeof contextSourceOption];
  context?: {
    brandId?: string;
    country?: Pick<Country, 'isoCode'>;
    defaultAreaCode?: string;
    vanityPhoneNumbersAllowed?: boolean;
    maxExtensionNumberLength?: number;
    shortCodesAllowed?: boolean;
    siteCode?: string;
    shortExtensionNumberLength?: number;
    outboundCallPrefix?: string | null;
    maskedPhoneNumbersAllowed?: boolean;
    conflictHandling?: ConflictHandling;
  };
  resultContent?: {
    includeNumberDetails?: boolean;
    includeDialingDetails?: boolean;
    includeFormatting?: boolean;
  };
}

export interface ParseResultItem extends ResultFormattedItem {
  originalString?: string;
  isAnExtension?: boolean;
  isInternational?: boolean;
  specialService?: boolean;
  parsedNumber?: string;
  availableExtension?: string | null;
}
