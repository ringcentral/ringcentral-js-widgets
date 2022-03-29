import { format, formatTypes } from '@ringcentral-integration/phone-number';

type NormalizeNumberParams = {
  phoneNumber: string;
  removeExtension?: boolean;
  countryCode?: string;
  areaCode?: string;
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
}: NormalizeNumberParams) {
  const normalizedNumber: string = format({
    phoneNumber,
    removeExtension,
    countryCode,
    areaCode,
    type: formatTypes.e164,
  });
  return normalizedNumber.replace(/\s/g, '');
}
