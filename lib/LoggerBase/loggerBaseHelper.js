"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertListToMap = convertListToMap;
exports.defaultIdentityFunction = defaultIdentityFunction;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
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
