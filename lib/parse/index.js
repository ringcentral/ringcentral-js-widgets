'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _libphonenumberJs = require('libphonenumber-js');

var _cleanNumber = require('../cleanNumber');

var _cleanNumber2 = _interopRequireDefault(_cleanNumber);

var _extractControls2 = require('../extractControls');

var _extractControls3 = _interopRequireDefault(_extractControls2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invalidCharsRegExp = /[^\d*+#\-(). ]/;
var plusRegex = /\+/g;
var extensionDelimiter = /[*#]/g;

function parse(_ref) {
  var input = _ref.input,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === undefined ? 'US' : _ref$countryCode;

  var _extractControls = (0, _extractControls3.default)(input),
      phoneNumber = _extractControls.phoneNumber,
      extendedControls = _extractControls.extendedControls;

  var cleanInput = (0, _cleanNumber2.default)(phoneNumber);
  var result = {
    input: input,
    parsedCountry: null,
    parsedNumber: null,
    isValid: true,
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

        var _parseNumber = (0, _libphonenumberJs.parseNumber)(result.phoneNumber, countryCode),
            _parseNumber$country = _parseNumber.country,
            country = _parseNumber$country === undefined ? null : _parseNumber$country,
            _parseNumber$phone = _parseNumber.phone,
            phone = _parseNumber$phone === undefined ? null : _parseNumber$phone;

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

        var _parseNumber2 = (0, _libphonenumberJs.parseNumber)(result.phoneNumber, countryCode),
            _parseNumber2$country = _parseNumber2.country,
            _country = _parseNumber2$country === undefined ? null : _parseNumber2$country,
            _parseNumber2$phone = _parseNumber2.phone,
            _phone = _parseNumber2$phone === undefined ? null : _parseNumber2$phone;

        result.parsedCountry = _country;
        result.parsedNumber = _phone;
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
