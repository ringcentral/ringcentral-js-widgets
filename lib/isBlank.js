"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBlank;
function isBlank(str) {
  if (!str) {
    return true;
  }
  return !/\S/.test(str);
}
//# sourceMappingURL=isBlank.js.map
