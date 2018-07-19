'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isValueProvider = isValueProvider;
exports.isStaticClassProvider = isStaticClassProvider;
exports.isExistingProvider = isExistingProvider;
exports.isFactoryProvider = isFactoryProvider;
function isEmpty(param) {
  return !param || param.length === 0;
}

function isArray(x) {
  return Array.isArray ? Array.isArray(x) : Object.prototype.toString.call(x).slice(8, -1) === 'Array';
}

function isObject(x) {
  return Object.prototype.toString.call(x).toLowerCase() === '[object object]';
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
