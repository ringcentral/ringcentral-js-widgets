"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalStorageKey = exports.globalStorage = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _storage = require("./storage");
var globalStorageKey = exports.globalStorageKey = Symbol('globalStorage');

/**
 *  global storage
 */
var globalStorage = exports.globalStorage = function globalStorage(target, key, descriptor) {
  var _target$globalStorage;
  (0, _storage.storage)(target, key, descriptor);
  target[globalStorageKey] = (_target$globalStorage = target[globalStorageKey]) !== null && _target$globalStorage !== void 0 ? _target$globalStorage : new Set();
  target[globalStorageKey].add(key);
  return descriptor;
};
//# sourceMappingURL=globalStorage.js.map
