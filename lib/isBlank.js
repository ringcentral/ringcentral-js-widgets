"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.isBlank = isBlank;
function isBlank(str) {
  if (!str) {
    return true;
  }
  return !/\S/.test(str);
}
var _default = isBlank;
exports["default"] = _default;
//# sourceMappingURL=isBlank.js.map
