import { formatNumber, getCountryCallingCode } from 'libphonenumber-js';
import type {
  CountryCode,
  NumberFormat,
  NationalNumber,
} from 'libphonenumber-js';

import parse from '../parse';
import type { ParseResult } from '../parse/parse.interface';

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

const ISOCode_US = 'US';
const ISOCode_CA = 'CA';
const ISOCode_PR = 'PR';

// US/CA/PR should be in the same phone area
export const isUSOrCAOrPR = (countryCode: CountryCode) =>
  [ISOCode_US, ISOCode_CA, ISOCode_PR].includes(countryCode);

export type PhoneNumberFormatType = {
  phoneNumber: string;
  countryCode?: CountryCode;
  areaCode?: string;
  siteCode?: string;
  type?: (typeof formatTypes)[keyof typeof formatTypes];
  removeExtension?: boolean;
  isMultipleSiteEnabled?: boolean;
  extensionDelimiter?: string;
  maxExtensionLength?: number;
  isEDPEnabled?: boolean;
};

/**
 * Format a phone number string based on parsing and formatting options.
 *
 * This method only returns the formatted number. If you also need the parser result,
 * use `formatWithParserResult` instead.
 */
export default function format(option: PhoneNumberFormatType) {
  return formatWithParserResult(option).number;
}

/**
 * Format a phone number and return both formatted output and parser result.
 *
 * Use this method when caller logic depends on parse details such as
 * `isValid`, `isExtension`, `parsedCountry`, or `extension`.
 */
export function formatWithParserResult(option: PhoneNumberFormatType) {
  const { phoneNumber, countryCode = 'US', maxExtensionLength = 6 } = option;

  const result: ParseResult = parse({
    input: phoneNumber,
    countryCode,
    maxExtensionLength,
  });

  return {
    parserResult: result,
    number: getNumberResult(result, option),
  };
}

const getNumberResult = (
  result: ParseResult,
  option: Omit<PhoneNumberFormatType, 'phoneNumber' | 'maxExtensionLength'>,
) => {
  const {
    countryCode = 'US',
    areaCode = '',
    siteCode = '',
    type = formatTypes.local,
    removeExtension = false,
    isMultipleSiteEnabled = false,
    extensionDelimiter = ' * ',
    isEDPEnabled = false,
  } = option;
  const {
    phoneNumber: number,
    extension,
    parsedCountry,
    parsedNumber,
    isExtension,
    isServiceNumber,
    isValid,
    hasPlus,
    countryCallingCode,
  } = result;

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
      extension: number as string,
    });
  }

  let finalType: NumberFormat;
  if (type === formatTypes.e164) {
    finalType = 'E.164';
  } else if (type === formatTypes.international) {
    finalType = 'INTERNATIONAL';
  } else {
    finalType =
      // parsedCountry is the country of phoneNumber country, countryCode is the country of caller
      (isUSOrCAOrPR(countryCode) &&
        isUSOrCAOrPR(parsedCountry as CountryCode)) ||
      parsedCountry === countryCode ||
      countryCallingCode === getCountryCallingCode(countryCode)
        ? 'NATIONAL'
        : 'INTERNATIONAL';
  }

  let formattedNumber;
  if (
    !hasPlus &&
    // for projects don't support EDP, only US/PR/CA will append areaCode for 7-digits number, details in RCINT-26493
    isUSOrCAOrPR(countryCode) &&
    !isEDPEnabled &&
    areaCode &&
    areaCode !== '' &&
    number?.length === 7
  ) {
    formattedNumber = formatNumber(
      `${areaCode}${number}` as NationalNumber,
      (parsedCountry || countryCode) as CountryCode,
      finalType,
    );
  } else if (parsedNumber) {
    formattedNumber = formatNumber(
      parsedNumber as NationalNumber,
      (parsedCountry || countryCode) as CountryCode,
      finalType,
    );
  } else if (!hasPlus) {
    formattedNumber = formatNumber(
      number as NationalNumber,
      countryCode,
      finalType,
    );
  } else {
    formattedNumber = number;
  }
  return extension && !removeExtension
    ? `${formattedNumber}${extensionDelimiter}${extension}`
    : formattedNumber;
};
