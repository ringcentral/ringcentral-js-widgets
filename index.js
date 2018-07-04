'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameLocalNumber = exports.isValidNumber = exports.formatTypes = exports.parse = exports.detect = exports.format = undefined;

var _libphonenumberJs = require('libphonenumber-js');

var _format = require('./lib/format');

var _format2 = _interopRequireDefault(_format);

var _detect = require('./lib/detect');

var _detect2 = _interopRequireDefault(_detect);

var _parse = require('./lib/parse');

var _parse2 = _interopRequireDefault(_parse);

var _isSameLocalNumber = require('./lib/isSameLocalNumber');

var _isSameLocalNumber2 = _interopRequireDefault(_isSameLocalNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.format = _format2.default;
exports.detect = _detect2.default;
exports.parse = _parse2.default;
exports.formatTypes = _format.formatTypes;
exports.isValidNumber = _libphonenumberJs.isValidNumber;
exports.isSameLocalNumber = _isSameLocalNumber2.default;
//# sourceMappingURL=index.js.map
