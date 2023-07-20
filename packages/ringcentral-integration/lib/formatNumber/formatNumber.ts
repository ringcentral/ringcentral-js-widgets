import type { CountryCode } from '@ringcentral-integration/phone-number';
import { format, formatTypes } from '@ringcentral-integration/phone-number';

export type FormatNumberParams = {
  phoneNumber: string;
  removeExtension?: boolean;
  countryCode?: string;
  areaCode?: string;
  siteCode?: string;
  international?: boolean;
  isMultipleSiteEnabled?: boolean;
  maxExtensionLength?: number;
  isEDPEnabled?: boolean;
};

/**
 * @function
 * @description Format phone numbers
 */
export default function formatNumber({
  phoneNumber,
  removeExtension = false,
  countryCode = 'US',
  areaCode = '',
  siteCode = '',
  international = false,
  isMultipleSiteEnabled = false,
  maxExtensionLength = 6,
  isEDPEnabled = false,
}: FormatNumberParams) {
  return format({
    phoneNumber,
    countryCode: countryCode as CountryCode,
    areaCode,
    siteCode,
    isMultipleSiteEnabled,
    removeExtension,
    type: international ? formatTypes.international : formatTypes.local,
    maxExtensionLength,
    isEDPEnabled,
  });
}
