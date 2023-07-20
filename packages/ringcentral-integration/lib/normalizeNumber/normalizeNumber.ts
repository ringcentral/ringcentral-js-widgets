import type { CountryCode } from '@ringcentral-integration/phone-number';
import { format, formatTypes } from '@ringcentral-integration/phone-number';

type NormalizeNumberParams = {
  phoneNumber: string;
  removeExtension?: boolean;
  countryCode?: string;
  areaCode?: string;
  maxExtensionLength?: number;
  isMultipleSiteEnabled?: boolean;
  siteCode?: string;
};

/**
 * @function
 * @description Normalize phone numbers into E164 format
 */
export function normalizeNumber({
  phoneNumber,
  removeExtension = false,
  countryCode = 'US',
  areaCode = '',
  maxExtensionLength = 6,
  siteCode = '',
  isMultipleSiteEnabled = false,
}: NormalizeNumberParams) {
  const normalizedNumber: string = format({
    phoneNumber,
    removeExtension,
    countryCode: countryCode as CountryCode,
    areaCode,
    type: formatTypes.e164,
    maxExtensionLength,
    siteCode,
    isMultipleSiteEnabled,
  })!;
  return normalizedNumber.replace(/\s/g, '');
}
