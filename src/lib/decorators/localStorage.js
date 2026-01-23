"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localStorageOnlyKey = exports.localStorageOnly = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
/* eslint-disable @typescript-eslint/no-explicit-any */
var localStorageOnlyKey = exports.localStorageOnlyKey = Symbol('localStorageOnly');

/**
 *
 * with storage only methods, that can get value from storage `synchronize`
 *
 * that always synchronize update storage directly when you set value.
 *
 * ### can't work with `@state`, only for normal value, and will not be clear after logout.
 * !!! Only setters can be used to trigger the saving of localStorage value
 *
 * @example
 *
 * ```ts
 * class User extends RcModule {
 *   @localStorageOnly
 *   example = 100;
 *
 *   something() {
 *     this.example = 100; // after this execution, default value already be changed in `localStorage`
 *
 *   }
 * }
 * ```
 */
var localStorageOnly = exports.localStorageOnly = function localStorageOnly(target, key, descriptor) {
  target[localStorageOnlyKey] = target[localStorageOnlyKey] || new Set();
  target[localStorageOnlyKey].add(key);
  return descriptor;
};
//# sourceMappingURL=localStorage.js.map
