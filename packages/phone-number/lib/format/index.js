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
    country,
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
  const withAreaCode = (!hasPlus && isUSCA && countryCode && countryCode !== '') ?
    `${areaCode}${number}` :
    number;

  let finalType;
  if (type === formatTypes.e164) {
    finalType = 'E.164';
  } else if (type === formatTypes.international) {
    finalType = 'International';
  } else {
    finalType = (
      // assume local
      !country ||
      // ignore US/CA difference
      isUSCA && (country === 'US' || country === 'CA') ||
      country === countryCode
    ) ?
      'National' :
      'International';
  }

  const formattedNumber = formatNumber(
    withAreaCode,
    country || countryCode,
    finalType,
  );
  return extension && !removeExtension ?
    `${formattedNumber}${extensionDelimeter}${extension}` :
    formattedNumber;
}
