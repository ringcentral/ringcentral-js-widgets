"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultIdentityFunction = defaultIdentityFunction;
exports.convertListToMap = convertListToMap;

require("core-js/modules/es6.array.for-each");

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
