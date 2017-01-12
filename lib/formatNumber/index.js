'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = formatNumber;

var _phoneformat = require('phoneformat.js');

var _cleanNumber = require('../cleanNumber');

var _cleanNumber2 = _interopRequireDefault(_cleanNumber);

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
