import { format, formatTypes } from '@ringcentral-integration/phone-number';

/**
 * @function
 * @description Normalize phone numbers into E164 format
 *
 * @param {Object} params
 * @param {String} params.phoneNumber
 * @param {Boolean} [params.removeExtension]
 * @param {String} [params.countryCode]
 * @param {String} [params.areaCode]
 * @return {String}
 */
function normalizeNumber({
  phoneNumber,
  removeExtension = false,
  countryCode = 'US',
  areaCode = '',
}: {
  phoneNumber: string;
  removeExtension?: boolean;
  countryCode?: string;
  areaCode?: string;
}) {
  const normalizedNumber: string = format({
    phoneNumber,
    removeExtension,
    countryCode,
    areaCode,
    type: formatTypes.e164,
  });
  return normalizedNumber.replace(/\s/g, '');
}

export { normalizeNumber as default, normalizeNumber };
