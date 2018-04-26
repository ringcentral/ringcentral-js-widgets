import { formatLocal, formatInternational } from 'phoneformat.js';
import parseNumber from '../parseNumber';

const SWITCH_US_CA = {
  US: 'CA',
  CA: 'US',
};

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
  international = false,
}) {
  const {
    hasPlus,
    number,
    extension,
    isServiceNumber,
  } = parseNumber(phoneNumber);

  if (isServiceNumber) return `*${number}`;
  // extension or special number
  if (number === '' || number.length <= 6) return number;

  let formattedNumber;
  if (countryCode === 'CA' || countryCode === 'US') {
    const numberWithAreaCode = (!hasPlus && number.length === 7 && areaCode !== '') ?
      (areaCode + number) :
      number;
    if (international) {
      formattedNumber = formatInternational(countryCode, `${hasPlus ? '+' : ''}${numberWithAreaCode}`);
    } else {
      formattedNumber = formatLocal(countryCode, `${hasPlus ? '+' : ''}${numberWithAreaCode}`);
      if (formattedNumber[0] === '+' && number[0] === '1') {
        const switchedFormat = formatLocal(
          SWITCH_US_CA[countryCode],
          `+${numberWithAreaCode}`
        );
        if (switchedFormat[0] !== '+') formattedNumber = switchedFormat;
      }
    }
  } else {
    formattedNumber = international ?
      formatInternational(countryCode, `${hasPlus ? '+' : ''}${number}`) :
      formatLocal(countryCode, `${hasPlus ? '+' : ''}${number}`);
  }

  return extension && !removeExtension ?
    `${formattedNumber} * ${extension}` :
    formattedNumber;
}
