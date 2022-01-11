import { format, formatTypes } from '@ringcentral-integration/phone-number';

export type FormatNumberParams = {
  phoneNumber: string;
  removeExtension?: boolean;
  countryCode?: string;
  areaCode?: string;
  siteCode?: string;
  international?: boolean;
  isMultipleSiteEnabled?: boolean;
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
}: FormatNumberParams) {
  return format({
    phoneNumber,
    countryCode,
    areaCode,
    siteCode,
    isMultipleSiteEnabled,
    removeExtension,
    type: international ? formatTypes.international : formatTypes.local,
  });
}
