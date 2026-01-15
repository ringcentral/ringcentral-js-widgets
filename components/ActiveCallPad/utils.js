"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickElements = pickElements;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.to-string.js");
/**
 * @file utils for active call pad
 */

function pickElements() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var rawList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var rawListMap = rawList.reduce(function (acc, item) {
    var id = item.id;
    acc[id] = item;
    return acc;
  }, {});
  var result = ids.reduce(function (acc, expectId) {
    if (rawListMap[expectId]) {
      acc.push(rawListMap[expectId]);
    }
    return acc;
  }, []);
  return result;
}
//# sourceMappingURL=utils.js.map
