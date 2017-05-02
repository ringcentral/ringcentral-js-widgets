'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeNumber;

var _phoneformat = require('phoneformat.js');

var _parseNumber2 = require('../parseNumber');

var _parseNumber3 = _interopRequireDefault(_parseNumber2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @description Normalize phone numbers into E164 format
 * @param {String} params.phoneNumber
 * @param {Boolean} params.removeExtension
 * @param {String} params.countryCode
 * @param {String} params.areaCode
 * @return {String}
 */
function normalizeNumber(_ref) {
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

  // service number


  if (isServiceNumber) return '*' + number;
  // extension or special number or empty string
  if (number === '' || number.length <= 6) return number;

  var normalizedNumber = void 0;
  if (!hasPlus && number.length === 7 && (countryCode === 'CA' || countryCode === 'US') && areaCode !== '') {
    normalizedNumber = (0, _phoneformat.formatE164)(countryCode, '' + (areaCode + number));
  } else {
    normalizedNumber = (0, _phoneformat.formatE164)(countryCode, '' + (hasPlus ? '+' : '') + number);
  }

  return extension && !removeExtension ? normalizedNumber + '*' + extension : normalizedNumber;
}
//# sourceMappingURL=index.js.map
