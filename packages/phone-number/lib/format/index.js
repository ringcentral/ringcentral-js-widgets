import { formatNumber } from 'libphonenumber-js';
import parse from '../parse';

const formatTypes = {
  local: 'local',
  international: 'international',
  e164: 'e164',
};

export { formatTypes };

/**
 * Given current account is enabled the multiple site, when number is the same with current account
 * then the number needs to be formatted.
 */
export const formatSameSiteExtension = ({
  /**
   * current user's site code
   */
  currentSiteCode = '',
  /**
   * extension number need to be format
   */
  extension = '',
}) => {
  if (
    currentSiteCode === '' ||
    !extension ||
    extension.indexOf(currentSiteCode) !== 0
  ) {
    return extension;
  }
  const regex = new RegExp(`${currentSiteCode}0*`);
  return extension.replace(regex, '') || '0';
};

export default function format({
  phoneNumber,
  countryCode = 'US',
  areaCode = '',
  siteCode = '',
  type = formatTypes.local,
  removeExtension = false,
  isMultipleSiteEnabled = false,
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
  if (isServiceNumber) {
    return number;
  }
  if (isExtension) {
    if (!isMultipleSiteEnabled) {
      return number;
    }
    return formatSameSiteExtension({
      currentSiteCode: siteCode,
      extension: number,
    });
  }
  const isUSCA = countryCode === 'CA' || countryCode === 'US';
  let finalType;
  if (type === formatTypes.e164) {
    finalType = 'E.164';
  } else if (type === formatTypes.international) {
    finalType = 'International';
  } else {
    finalType =
      // assume local
      !parsedCountry ||
      // ignore US/CA difference
      (isUSCA && (parsedCountry === 'US' || parsedCountry === 'CA')) ||
      parsedCountry === countryCode
        ? 'National'
        : 'International';
  }

  let formattedNumber;
  if (
    !hasPlus &&
    isUSCA &&
    areaCode &&
    areaCode !== '' &&
    number.length === 7
  ) {
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
    formattedNumber = formatNumber(number, countryCode, finalType);
  } else {
    formattedNumber = number;
  }
  return extension && !removeExtension
    ? `${formattedNumber}${extensionDelimeter}${extension}`
    : formattedNumber;
}
