export interface ParseResult {
  input: string;
  parsedCountry?: string;
  parsedNumber?: string;
  isValid: boolean;
  hasInvalidChars: boolean;
  isExtension: boolean;
  isServiceNumber: boolean;
  hasPlus: boolean;
  phoneNumber?: string;
  extension?: string;
  extendedControls?: any;
}
