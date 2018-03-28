import { formatE164 } from 'phoneformat.js';
import parseNumber from '../parseNumber';

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
  const {
    hasPlus,
    number,
    extension,
    isServiceNumber,
  } = parseNumber(phoneNumber);

  // service number
  if (isServiceNumber) return `*${number}`;
  // extension or special number or empty string
  if (number === '' || number.length <= 6) return number;

  let normalizedNumber;
  if (
    !hasPlus &&
    number.length === 7 &&
    (countryCode === 'CA' || countryCode === 'US') &&
    areaCode !== ''
  ) {
    normalizedNumber = formatE164(countryCode, `${areaCode + number}`);
  } else {
    normalizedNumber = formatE164(countryCode, `${hasPlus ? '+' : ''}${number}`);
  }

  return extension && !removeExtension ?
    `${normalizedNumber}*${extension}` :
    normalizedNumber;
}
