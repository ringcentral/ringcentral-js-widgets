import { PhoneNumberInfoNumberParser } from '@rc-ex/core/definitions';

import { AccountInfo } from '../AccountInfoV2';
import { Brand } from '../Brand';
import { CompanyContacts } from '../CompanyContactsV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { RegionSettings } from '../RegionSettings';

export interface NumberValidateOptions {
  //
}

export interface Deps {
  brand: Brand;
  client: any;
  regionSettings: RegionSettings;
  accountInfo: AccountInfo;
  companyContacts: CompanyContacts;
  extensionInfo?: ExtensionInfo;
  numberValidateOptions?: NumberValidateOptions;
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
