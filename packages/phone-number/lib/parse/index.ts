import {
  parseNumber,
  CountryCode,
  AsYouType,
  ParsedNumber,
} from 'libphonenumber-js';
import cleanNumber from '../cleanNumber';
import extractControls from '../extractControls';
import { ParseResult, ParseParam, ProcessParam } from './parse.interface';

const invalidCharsRegExp = /[^\d*+#\-(). ]/;
const plusRegex = /\+/g;
const extensionDelimiter = /[*#]/g;

/**
 * helper function to attach parsed country and phone number with libphonenumber
 */
function attachParsedCountryInfo(
  result: ParseResult,
  countryCode?: CountryCode,
) {
  const asYouType = new AsYouType(countryCode);
  const { country = null, phone = null } = parseNumber(
    result.phoneNumber!,
    countryCode,
  ) as ParsedNumber;
  result.parsedCountry = country;
  result.parsedNumber = phone || asYouType.input(result.phoneNumber!);
  result.countryCallingCode = asYouType.getCallingCode();
}

function processServiceNumber({ result, tokens }: ProcessParam): ParseResult {
  if (tokens[1] && tokens[1].length) {
    result.isServiceNumber = true;
    result.phoneNumber = `*${tokens[1]}`;
    result.isValid = true;
  }
  return result;
}

/**
 * process the tokens as an E164 formatted number
 */
function processInternational({ result, tokens, countryCode }: ProcessParam) {
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
 * process the tokens as local numbers including extensions
 */
function processLocalNumber({
  result,
  tokens,
  countryCode,
  maxExtensionLength,
}: ProcessParam): ParseResult {
  if (tokens[0] && tokens[0].length) {
    // not extension
    if (
      maxExtensionLength !== undefined &&
      tokens[0].length > maxExtensionLength
    ) {
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
 * parse the input phone number
 */
export default function parse({
  input,
  countryCode = 'US',
  maxExtensionLength = 6,
}: ParseParam): ParseResult {
  const { phoneNumber, extendedControls } = extractControls(input);
  const cleanInput = cleanNumber(phoneNumber);
  const result: ParseResult = {
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
    return processServiceNumber({ result, tokens });
  }

  // cleanInput = '+xxx'; // should contain country code
  if (startWithPlus) {
    return processInternational({ result, tokens, countryCode });
  }

  // cleanNumber = 'xxxxx'; // is local number
  return processLocalNumber({
    result,
    tokens,
    countryCode,
    maxExtensionLength,
  });
}
