import { parseNumber } from 'libphonenumber-js';

const invalidCharsRegExp = /[^\d*+#\-(). ]/;
const cleanRegex = /[^\d*+#]/g;
const plusRegex = /\+/g;
const extensionDelimiter = /[*#]/g;

export default function parse({ input, countryCode = 'US' }) {
  const result = {
    input,
    parsedCountry: null,
    parsedNumber: null,
    isValid: true,
    hasInvalidChars: invalidCharsRegExp.test(input),
    isExtension: false,
    isServiceNumber: false,
    hasPlus: false,
    phoneNumber: null,
    extension: null,

  };
  const cleanInput = (input || '').replace(cleanRegex, '');
  const startWithPlus = cleanInput[0] === '+';
  const withoutPlus = cleanInput.replace(plusRegex, '');
  const startWithStar = withoutPlus[0] === '*';
  if (startWithPlus && startWithStar) {
    result.isValid = false;
  } else {
    const tokens = withoutPlus.split(extensionDelimiter);
    if (startWithStar) {
      if (tokens[1] && tokens[1].length) {
        result.isServiceNumber = true;
        result.phoneNumber = `*${tokens[1]}`;
      } else {
        result.isValid = false;
      }
    } else if (startWithPlus) {
      if (tokens[0] && tokens[0].length) {
        result.hasPlus = true;
        result.phoneNumber = `+${tokens[0]}`;
        const {
          country = null,
          phone = null,
        } = parseNumber(result.phoneNumber, countryCode);
        result.parsedCountry = country;
        result.parsedNumber = phone;
        if (tokens[1] && tokens[1].length) {
          result.extension = tokens[1];
        }
      } else {
        result.isValid = false;
      }
    } else if (tokens[0] && tokens[0].length) {
      if (tokens[0].length > 6) {
        result.phoneNumber = tokens[0];
        const {
          country = null,
          phone = null,
        } = parseNumber(result.phoneNumber, countryCode);
        result.parsedCountry = country;
        result.parsedNumber = phone;
        if (tokens[1] && tokens[1].length) {
          result.extension = tokens[1];
        }
      } else {
        result.isExtension = true;
        result.phoneNumber = tokens[0];
      }
    } else {
      result.isValid = false;
    }
  }
  return result;
}
