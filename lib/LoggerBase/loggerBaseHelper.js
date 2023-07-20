"use strict";

require("core-js/modules/es.array.for-each");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertListToMap = convertListToMap;
exports.defaultIdentityFunction = defaultIdentityFunction;
/**
 * Identity function returns a deterministic id value for each item.
 */
function defaultIdentityFunction(item) {
  return item.id;
}

/**
 * Convert array of { name, id } objects into a map.
 */
function convertListToMap(loggingList) {
  var mapping = {};
  loggingList.forEach(function (id) {
    mapping[id] = true;
  });
  return mapping;
}
//# sourceMappingURL=loggerBaseHelper.js.map
