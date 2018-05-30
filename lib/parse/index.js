'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _libphonenumberJs = require('libphonenumber-js');

var invalidCharsRegExp = /[^\d*+#\-(). ]/;
var cleanRegex = /[^\d*+#]/g;
var plusRegex = /\+/g;
var extensionDelimiter = /[*#]/g;

function parse(_ref) {
  var input = _ref.input,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === undefined ? 'US' : _ref$countryCode;

  var result = {
    input: input,
    country: null,
    isValid: true,
    hasInvalidChars: invalidCharsRegExp.test(input),
    isExtension: false,
    isServiceNumber: false,
    hasPlus: false,
    phoneNumber: null,
    extension: null
  };
  var cleanInput = input.replace(cleanRegex, '');
  var startWithPlus = cleanInput[0] === '+';
  var withoutPlus = cleanInput.replace(plusRegex, '');
  var startWithStar = withoutPlus[0] === '*';
  if (startWithPlus && startWithStar) {
    result.isValid = false;
  } else {
    var tokens = withoutPlus.split(extensionDelimiter);
    if (startWithStar) {
      if (tokens[1] && tokens[1].length) {
        result.isServiceNumber = true;
        result.phoneNumber = '*' + tokens[1];
      } else {
        result.isValid = false;
      }
    } else if (startWithPlus) {
      if (tokens[0] && tokens[0].length) {
        result.hasPlus = true;
        result.phoneNumber = '+' + tokens[0];
        result.country = (0, _libphonenumberJs.parseNumber)(result.phoneNumber, countryCode).country || null;
        if (tokens[1] && tokens[1].length) {
          result.extension = tokens[1];
        }
      } else {
        result.isValid = false;
      }
    } else if (tokens[0] && tokens[0].length) {
      if (tokens[0].length > 6) {
        result.phoneNumber = tokens[0];
        result.country = (0, _libphonenumberJs.parseNumber)(result.phoneNumber, countryCode).country || null;
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
//# sourceMappingURL=index.js.map
