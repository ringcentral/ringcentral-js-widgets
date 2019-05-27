"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parse;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

var _libphonenumberJs = require("libphonenumber-js");

var _cleanNumber = _interopRequireDefault(require("../cleanNumber"));

var _extractControls2 = _interopRequireDefault(require("../extractControls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var invalidCharsRegExp = /[^\d*+#\-(). ]/;
var plusRegex = /\+/g;
var extensionDelimiter = /[*#]/g;
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
  var _parseNumber = (0, _libphonenumberJs.parseNumber)(result.phoneNumber, countryCode),
      _parseNumber$country = _parseNumber.country,
      country = _parseNumber$country === void 0 ? null : _parseNumber$country,
      _parseNumber$phone = _parseNumber.phone,
      phone = _parseNumber$phone === void 0 ? null : _parseNumber$phone;

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
    result.phoneNumber = "*".concat(tokens[1]);
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
    result.phoneNumber = "+".concat(tokens[0]); // use libphonenumber to parse country code in the number

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


function parse(_ref) {
  var input = _ref.input,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === void 0 ? 'US' : _ref$countryCode;

  var _extractControls = (0, _extractControls2["default"])(input),
      phoneNumber = _extractControls.phoneNumber,
      extendedControls = _extractControls.extendedControls;

  var cleanInput = (0, _cleanNumber["default"])(phoneNumber);
  var result = {
    input: input,
    parsedCountry: null,
    parsedNumber: null,
    isValid: false,
    hasInvalidChars: invalidCharsRegExp.test(input),
    isExtension: false,
    isServiceNumber: false,
    hasPlus: false,
    phoneNumber: null,
    extension: null,
    extendedControls: extendedControls
  };
  var startWithPlus = cleanInput[0] === '+';
  var withoutPlus = cleanInput.replace(plusRegex, '');
  var startWithStar = withoutPlus[0] === '*'; // cleanInput = '+*xxxx'; // is invalid

  if (startWithPlus && startWithStar) {
    return result;
  }

  var tokens = withoutPlus.split(extensionDelimiter); // cleanInput = '*xxxx'; // service number

  if (startWithStar) {
    return processServiceNumber(result, tokens);
  } // cleanInput = '+xxx'; // should contain country code


  if (startWithPlus) {
    return processInternational(result, tokens, countryCode);
  } // cleanNumber = 'xxxxx'; // is local number


  return processLocalNumber(result, tokens, countryCode);
}
//# sourceMappingURL=index.js.map
