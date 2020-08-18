import { format, formatTypes } from '@ringcentral-integration/phone-number';
/**
 * @function
 * @description Format phone numbers
 * @param {String} params.phoneNumber
 * @param {Boolean} params.removeExtension
 * @param {String} params.countryCode
 * @param {String} params.areaCode
 * @return {String}
 */
export default function formatNumber({
  phoneNumber,
  removeExtension = false,
  countryCode = 'US',
  areaCode = '',
  siteCode = '',
  international = false,
  isMultipleSiteEnabled = false,
}) {
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
