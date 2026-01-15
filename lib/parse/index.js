"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parse;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.split.js");
var _libphonenumberJs = require("libphonenumber-js");
var _cleanNumber = _interopRequireDefault(require("../cleanNumber"));
var _extractControls2 = _interopRequireDefault(require("../extractControls"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var invalidCharsRegExp = /[^\d*+#\-(). ]/;
var plusRegex = /\+/g;
var extensionDelimiter = /[*#]/g;

/**
 * helper function to attach parsed country and phone number with libphonenumber
 */
function attachParsedCountryInfo(result, countryCode) {
  var asYouType = new _libphonenumberJs.AsYouType(countryCode);
  var _ref = (0, _libphonenumberJs.parseNumber)(result.phoneNumber, countryCode),
    _ref$country = _ref.country,
    country = _ref$country === void 0 ? null : _ref$country,
    _ref$phone = _ref.phone,
    phone = _ref$phone === void 0 ? null : _ref$phone;
  result.parsedCountry = country;
  result.parsedNumber = phone || asYouType.input(result.phoneNumber);
  result.countryCallingCode = asYouType.getCallingCode();
}
function processServiceNumber(_ref2) {
  var result = _ref2.result,
    tokens = _ref2.tokens;
  if (tokens[1] && tokens[1].length) {
    result.isServiceNumber = true;
    result.phoneNumber = "*".concat(tokens[1]);
    result.isValid = true;
  }
  return result;
}

/**
 * process the tokens as an E164 formatted number
 */
function processInternational(_ref3) {
  var result = _ref3.result,
    tokens = _ref3.tokens,
    countryCode = _ref3.countryCode;
  if (tokens[0] && tokens[0].length) {
    result.hasPlus = true;
    result.phoneNumber = "+".concat(tokens[0]);
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
function processLocalNumber(_ref4) {
  var result = _ref4.result,
    tokens = _ref4.tokens,
    countryCode = _ref4.countryCode,
    maxExtensionLength = _ref4.maxExtensionLength;
  if (tokens[0] && tokens[0].length) {
    // not extension
    if (maxExtensionLength !== undefined && tokens[0].length > maxExtensionLength) {
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
function parse(_ref5) {
  var input = _ref5.input,
    _ref5$countryCode = _ref5.countryCode,
    countryCode = _ref5$countryCode === void 0 ? 'US' : _ref5$countryCode,
    _ref5$maxExtensionLen = _ref5.maxExtensionLength,
    maxExtensionLength = _ref5$maxExtensionLen === void 0 ? 6 : _ref5$maxExtensionLen;
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
  var startWithStar = withoutPlus[0] === '*';

  // cleanInput = '+*xxxx'; // is invalid
  if (startWithPlus && startWithStar) {
    return result;
  }
  var tokens = withoutPlus.split(extensionDelimiter);

  // cleanInput = '*xxxx'; // service number
  if (startWithStar) {
    return processServiceNumber({
      result: result,
      tokens: tokens
    });
  }

  // cleanInput = '+xxx'; // should contain country code
  if (startWithPlus) {
    return processInternational({
      result: result,
      tokens: tokens,
      countryCode: countryCode
    });
  }

  // cleanNumber = 'xxxxx'; // is local number
  return processLocalNumber({
    result: result,
    tokens: tokens,
    countryCode: countryCode,
    maxExtensionLength: maxExtensionLength
  });
}
//# sourceMappingURL=index.js.map
