import { CountryCode } from 'libphonenumber-js';

export interface ParseResult {
  input: string;
  parsedCountry?: string | null;
  parsedNumber?: string | null;
  isValid: boolean;
  hasInvalidChars: boolean;
  isExtension: boolean;
  isServiceNumber: boolean;
  hasPlus: boolean;
  phoneNumber?: string | null;
  extension?: string | null;
  extendedControls?: any;
  countryCallingCode?: string | undefined;
}
export interface ParseParam {
  input: string;
  countryCode?: CountryCode;
  /**
   * Max extension number length, when phone number length is bigger than this, it's not an extension number
   * Used to support 6 digits @default 6
   * It can be set in admin web
   */
  maxExtensionLength?: number;
  areaCode?: string;
}

export interface ProcessParam {
  result: ParseResult;
  tokens: string[];
  countryCode?: CountryCode;
  maxExtensionLength?: number;
}
