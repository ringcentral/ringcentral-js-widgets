"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userStorageKey = exports.userStorage = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _storage = require("./storage");
var userStorageKey = exports.userStorageKey = Symbol('userStorage');

/**
 * User storage - After logout, the user cache will not be cleared.
 */
var userStorage = exports.userStorage = function userStorage(target, key, descriptor) {
  target[userStorageKey] = target[userStorageKey] || new Set();
  target[userStorageKey].add(key);
  target[_storage.storageKey] = target[_storage.storageKey] || new Set();
  target[_storage.storageKey].add(key);
  return descriptor;
};
//# sourceMappingURL=userStorage.js.map
