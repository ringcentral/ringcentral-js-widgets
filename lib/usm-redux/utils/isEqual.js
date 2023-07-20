"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areShallowEqualWithArray = areShallowEqualWithArray;
exports.isEqual = void 0;
var isEqual = function isEqual(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }

  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y;
};
exports.isEqual = isEqual;
function areShallowEqualWithArray(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }
  var length = prev.length;
  for (var i = 0; i < length; i += 1) {
    if (!isEqual(prev[i], next[i])) {
      return false;
    }
  }
  return true;
}
//# sourceMappingURL=isEqual.js.map
