import { PhoneNumberInfoNumberParser } from '@rc-ex/core/definitions';
import { Brand } from '../Brand';
import { RegionSettings } from '../RegionSettingsV2';
import { AccountInfo } from '../AccountInfoV2';
import { CompanyContacts } from '../CompanyContactsV2';
import { ExtensionInfo } from '../ExtensionInfoV2';

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
