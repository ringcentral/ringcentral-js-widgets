'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.isEmpty = isEmpty;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isValueProvider = isValueProvider;
exports.isStaticClassProvider = isStaticClassProvider;
exports.isExistingProvider = isExistingProvider;
exports.isFactoryProvider = isFactoryProvider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(param) {
  return !param || param.length === 0;
}

function isArray(x) {
  return Array.isArray ? Array.isArray(x) : Object.prototype.toString.call(x).slice(8, -1) === 'Array';
}

function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) === 'object' && !isArray(x);
}

function isFunction(x) {
  return typeof x === 'function';
}

/**
 * Provider type guard functions
 */
var USE_VALUE = 'useValue';
function isValueProvider(provider) {
  return USE_VALUE in provider;
}

function isStaticClassProvider(provider) {
  return provider.useClass !== undefined;
}

function isExistingProvider(provider) {
  return provider.useExisting !== undefined;
}

function isFactoryProvider(provider) {
  return provider.useFactory !== undefined;
}
//# sourceMappingURL=is_type.js.map
