'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

exports.getParentClass = getParentClass;
exports.camelize = camelize;
exports.assert = assert;

var _error = require('./error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParentClass(klass) {
  return (0, _getPrototypeOf2.default)(klass);
}

/* eslint-disable */
var STRING_CAMELIZE_REGEXP_1 = /(\-|\_|\.|\s)+(.)?/g;
var STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;

// Transfrom string to camel case, from Ember String
function camelize(key) {
  return key.replace(STRING_CAMELIZE_REGEXP_1, function (match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(STRING_CAMELIZE_REGEXP_2, function (match, separator, chr) {
    return match.toLowerCase();
  });
}
/* eslint-enable */

function assert(cond, msg) {
  if (!cond) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (msg) throw _error.DIError.apply(undefined, [msg].concat(args));else throw (0, _error.DIError)('Assertion Failed');
  }
}
//# sourceMappingURL=utils.js.map
