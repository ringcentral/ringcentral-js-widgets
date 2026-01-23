"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageKey = exports.storage = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var storageKey = exports.storageKey = Symbol('storage');

/**
 *  Non-user storage - After logout, the cache will be cleared.
 */
var storage = exports.storage = function storage(target, key, descriptor) {
  target[storageKey] = target[storageKey] || new Set();
  target[storageKey].add(key);
  return descriptor;
};
//# sourceMappingURL=storage.js.map
