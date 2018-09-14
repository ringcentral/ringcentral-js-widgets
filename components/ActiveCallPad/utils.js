"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickElements = pickElements;
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
