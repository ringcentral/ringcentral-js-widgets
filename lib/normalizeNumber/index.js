'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = normalizeNumber;

var _cleanNumber = require('../cleanNumber');

var _cleanNumber2 = _interopRequireDefault(_cleanNumber);

var _phoneformat = require('phoneformat.js');

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

  var cleaned = (0, _cleanNumber2.default)('' + phoneNumber);
  var hasPlus = cleaned[0] === '+';
  var withoutPlus = hasPlus ? cleaned.substring(1) : cleaned;
  if (withoutPlus === '' || withoutPlus[0] === '*' // service number
  ) return withoutPlus;

  var _withoutPlus$split = withoutPlus.split('*'),
      _withoutPlus$split2 = (0, _slicedToArray3.default)(_withoutPlus$split, 2),
      number = _withoutPlus$split2[0],
      extension = _withoutPlus$split2[1];

  // extension or special number


  if (number.length <= 5) return number;

  var normalizedNumber = void 0;
  if (!hasPlus && number.length === 7 && (countryCode === 'CA' || countryCode === 'US') && areaCode !== '') {
    normalizedNumber = (0, _phoneformat.formatE164)(countryCode, '' + (areaCode + number));
  } else {
    normalizedNumber = (0, _phoneformat.formatE164)(countryCode, '' + (hasPlus ? '+' : '') + number);
  }

  return extension && !removeExtension ? normalizedNumber + '*' + extension : normalizedNumber;
}
//# sourceMappingURL=index.js.map
