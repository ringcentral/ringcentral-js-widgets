import { parseNumber } from 'libphonenumber-js';
import cleanNumber from '../cleanNumber';
import extractControls from '../extractControls';

const invalidCharsRegExp = /[^\d*+#\-(). ]/;
const plusRegex = /\+/g;
const extensionDelimiter = /[*#]/g;

/**
 * @typedef {object} ParsedResult
 * @property {string} input
 * @property {string} parsedCountry
 * @property {string} parsedNumber
 * @property {boolean} isValid
 * @property {boolean} hasInvalidChars
 * @property {boolean} isExtension
 * @property {boolean} isServiceNumber
 * @property {boolean} hasPlus
 * @property {string} phoneNumber
 * @property {string} extension
 * @property {string[]} extendedControls
 */

/**
 * @description helper function to attatch parsed country and phone number with libphonenumber
 * @param {ParsedResult} result
 * @param {string} countryCode
 */
function attachParsedCountryInfo(result, countryCode) {
  const { country = null, phone = null } = parseNumber(
    result.phoneNumber,
    countryCode,
  );
  result.parsedCountry = country;
  result.parsedNumber = phone;
}

/**
 * @description process the tokens as a service number
 * @param {ParsedResult} result
 * @param {string[]} tokens
 * @returns {ParsedResult}
 */
function processServiceNumber(result, tokens) {
  if (tokens[1] && tokens[1].length) {
    result.isServiceNumber = true;
    result.phoneNumber = `*${tokens[1]}`;
    result.isValid = true;
  }
  return result;
}

/**
 * @description process the tokens as an E164 formatted number
 * @param {ParsedResult} result
 * @param {string[]} tokens
 * @param {string} countryCode
 * @returns {ParsedResult}
 */
function processInternational(result, tokens, countryCode) {
  if (tokens[0] && tokens[0].length) {
    result.hasPlus = true;
    result.phoneNumber = `+${tokens[0]}`;
    // use libphonenumber to parse country code in the number
    attachParsedCountryInfo(result, countryCode);
    if (tokens[1] && tokens[1].length) {
      result.extension = tokens[1];
    }
    result.isValid = true;
  }
  return result;
}

/**
 * @description process the tokens as local numbers including extensions
 * @param {ParsedResult} result
 * @param {string[]} tokens
 * @param {string} countryCode
 * @returns {ParsedResult}
 */
function processLocalNumber(result, tokens, countryCode) {
  if (tokens[0] && tokens[0].length) {
    // not extension
    if (tokens[0].length > 6) {
      result.phoneNumber = tokens[0];
      attachParsedCountryInfo(result, countryCode);
      if (tokens[1] && tokens[1].length) {
        result.extension = tokens[1];
      }
    } else {
      result.isExtension = true;
      result.phoneNumber = tokens[0];
    }
    result.isValid = true;
    return result;
  }
  return result;
}

/**
 * @typedef {object} ParseInput
 * @property {string} input
 * @property {string} countryCode
 */

/**
 * @param {ParseInput}
 * @returns {ParsedResult}
 */
export default function parse({
  input,
  countryCode = 'US',
}: {
  input: string;
  countryCode?: string;
}) {
  const { phoneNumber, extendedControls } = extractControls(input);
  const cleanInput = cleanNumber(phoneNumber);
  const result = {
    input,
    parsedCountry: null,
    parsedNumber: null,
    isValid: false,
    hasInvalidChars: invalidCharsRegExp.test(input),
    isExtension: false,
    isServiceNumber: false,
    hasPlus: false,
    phoneNumber: null,
    extension: null,
    extendedControls,
  };

  const startWithPlus = cleanInput[0] === '+';
  const withoutPlus = cleanInput.replace(plusRegex, '');
  const startWithStar = withoutPlus[0] === '*';

  // cleanInput = '+*xxxx'; // is invalid
  if (startWithPlus && startWithStar) {
    return result;
  }
  const tokens = withoutPlus.split(extensionDelimiter);

  // cleanInput = '*xxxx'; // service number
  if (startWithStar) {
    return processServiceNumber(result, tokens);
  }

  // cleanInput = '+xxx'; // should contain country code
  if (startWithPlus) {
    return processInternational(result, tokens, countryCode);
  }

  // cleanNumber = 'xxxxx'; // is local number
  return processLocalNumber(result, tokens, countryCode);
}
