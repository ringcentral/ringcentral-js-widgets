'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = parseNumber;

var _cleanNumber = require('../cleanNumber');

var _cleanNumber2 = _interopRequireDefault(_cleanNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invalidCharsRegExp = /[^\d*+#\-(). ]/;

function parseNumber(phoneNumber) {
  var cleaned = (0, _cleanNumber2.default)('' + phoneNumber);
  var hasPlus = cleaned[0] === '+';
  var withoutPlus = hasPlus ? cleaned.substring(1) : cleaned;
  var isServiceNumber = withoutPlus[0] === '*';

  var _withoutPlus$split = withoutPlus.split('*'),
      _withoutPlus$split2 = (0, _slicedToArray3.default)(_withoutPlus$split, 2),
      number = _withoutPlus$split2[0],
      extension = _withoutPlus$split2[1];

  return {
    hasPlus: hasPlus && number !== '',
    number: isServiceNumber && extension || number || '',
    extension: !isServiceNumber && extension || '',
    isServiceNumber: isServiceNumber,
    hasInvalidChars: invalidCharsRegExp.test(phoneNumber)
  };
}
//# sourceMappingURL=index.js.map
