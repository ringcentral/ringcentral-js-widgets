import { format, formatTypes } from '@ringcentral-integration/phone-number';
/**
 * @function
 * @description Normalize phone numbers into E164 format
 * @param {String} params.phoneNumber
 * @param {Boolean} params.removeExtension
 * @param {String} params.countryCode
 * @param {String} params.areaCode
 * @return {String}
 */
export default function normalizeNumber({
  phoneNumber,
  removeExtension = false,
  countryCode = 'US',
  areaCode = '',
}) {
  return format({
    phoneNumber,
    removeExtension,
    countryCode,
    areaCode,
    type: formatTypes.e164,
  });
}
