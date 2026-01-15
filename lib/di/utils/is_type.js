"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
exports.isEmpty = isEmpty;
exports.isExistingProvider = isExistingProvider;
exports.isFactoryProvider = isFactoryProvider;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isStaticClassProvider = isStaticClassProvider;
exports.isValueProvider = isValueProvider;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
// @ts-nocheck
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
