import { formatNumber } from 'libphonenumber-js';
import parse from '../parse';

const formatTypes = {
  local: 'local',
  international: 'international',
  e164: 'e164'
};

export { formatTypes };

export default function format({
  phoneNumber,
  countryCode = 'US',
  areaCode = '',
  type = formatTypes.local,
  removeExtension = false,
  extensionDelimeter = ' * ',
}) {
  const {
    phoneNumber: number,
    extension,
    parsedCountry,
    parsedNumber,
    isExtension,
    isServiceNumber,
    isValid,
    hasPlus,
  } = parse({ input: phoneNumber, countryCode });

  if (!isValid) {
    return '';
  }
  if (
    isServiceNumber ||
    isExtension
  ) {
    return number;
  }
  const isUSCA = countryCode === 'CA' || countryCode === 'US';
  let finalType;
  if (type === formatTypes.e164) {
    finalType = 'E.164';
  } else if (type === formatTypes.international) {
    finalType = 'International';
  } else {
    finalType = (
      // assume local
      !parsedCountry ||
      // ignore US/CA difference
      isUSCA && (parsedCountry === 'US' || parsedCountry === 'CA') ||
      parsedCountry === countryCode
    ) ?
      'National' :
      'International';
  }

  let formattedNumber;
  if (!hasPlus && isUSCA && areaCode && areaCode !== '' && number.length === 7) {
    formattedNumber = formatNumber(
      `${areaCode}${number}`,
      parsedCountry || countryCode,
      finalType,
    );
  } else if (parsedNumber) {
    formattedNumber = formatNumber(
      parsedNumber,
      parsedCountry || countryCode,
      finalType,
    );
  } else if (!hasPlus) {
    formattedNumber = formatNumber(
      number,
      countryCode,
      finalType,
    );
  } else {
    formattedNumber = number;
  }
  return extension && !removeExtension ?
    `${formattedNumber}${extensionDelimeter}${extension}` :
    formattedNumber;
}
