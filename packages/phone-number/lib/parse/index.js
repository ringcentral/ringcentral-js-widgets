import { parseNumber } from 'libphonenumber-js';

const invalidCharsRegExp = /[^\d*+#\-(). ]/;
const cleanRegex = /[^\d*+#]/g;
const plusRegex = /\+/g;
const extensionDelimiter = /[*#]/g;
const validRegExp = /^(\+\d)|^(\*\d)|^(\d)/;

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

  var phoneNumberIsValid = phoneNumber => phoneNumber.length > 3 && validRegExp.test(phoneNumber);

  var isServiceNumber = tokens => !tokens[0] && tokens[1];

  var hasPlus = tokens => tokens[0][0] === '+';

  var phoneNumberLessThanDefine = phoneNumber => phoneNumber.length <= 6;

  var parseCountrycodeAndPhone = () => {
    const {
      country = null,
      phone = null,
    } = parseNumber(result.phoneNumber, countryCode);
    result.parsedCountry = country;
    result.parsedNumber = phone;
  }

  var formatInput = input => {
    const inputWithPlus = (input || '').replace(cleanRegex, '');
    return inputWithPlus[0]+inputWithPlus.slice(1).replace(plusRegex, '');
  }

  const cleanInput = formatInput(input);
  const tokens = cleanInput.split(extensionDelimiter);

  if (!phoneNumberIsValid(cleanInput)){
    result.isValid = false;
    return result;
  }

  if (isServiceNumber(tokens)) {
    result.isServiceNumber = true;
    result.phoneNumber = `*${tokens[1]}`;
    return result;
  }

  //dont know the relationship between two column bellow
  result.isExtension = phoneNumberLessThanDefine(tokens[0]);
  result.extension = tokens[1] || null;
  result.hasPlus = hasPlus(tokens);
  result.phoneNumber = tokens[0];
  parseCountrycodeAndPhone();
  return result;

}
