'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatNumber;

var _phoneformat = require('phoneformat.js');

var _parseNumber2 = require('../parseNumber');

var _parseNumber3 = _interopRequireDefault(_parseNumber2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SWITCH_US_CA = {
  US: 'CA',
  CA: 'US'
};

/**
 * @function
 * @description Format phone numbers
 * @param {String} params.phoneNumber
 * @param {Boolean} params.removeExtension
 * @param {String} params.countryCode
 * @param {String} params.areaCode
 * @return {String}
 */
function formatNumber(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$removeExtension = _ref.removeExtension,
      removeExtension = _ref$removeExtension === undefined ? false : _ref$removeExtension,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === undefined ? 'US' : _ref$countryCode,
      _ref$areaCode = _ref.areaCode,
      areaCode = _ref$areaCode === undefined ? '' : _ref$areaCode;

  var _parseNumber = (0, _parseNumber3.default)(phoneNumber),
      hasPlus = _parseNumber.hasPlus,
      number = _parseNumber.number,
      extension = _parseNumber.extension,
      isServiceNumber = _parseNumber.isServiceNumber;

  if (isServiceNumber) return '*' + number;
  // extension or special number
  if (number === '' || number.length <= 5) return number;

  var formattedNumber = void 0;
  if (countryCode === 'CA' || countryCode === 'US') {
    var numberWithAreaCode = !hasPlus && number.length === 7 && areaCode !== '' ? areaCode + number : number;
    formattedNumber = (0, _phoneformat.formatLocal)(countryCode, '' + (hasPlus ? '+' : '') + numberWithAreaCode);
    if (formattedNumber[0] === '+' && number[0] === '1') {
      var switchedFormat = (0, _phoneformat.formatLocal)(SWITCH_US_CA[countryCode], '+' + numberWithAreaCode);
      if (switchedFormat[0] !== '+') formattedNumber = switchedFormat;
    }
  } else {
    formattedNumber = (0, _phoneformat.formatLocal)(countryCode, '' + (hasPlus ? '+' : '') + number);
  }

  return extension && !removeExtension ? formattedNumber + ' * ' + extension : formattedNumber;
}
//# sourceMappingURL=index.js.map
