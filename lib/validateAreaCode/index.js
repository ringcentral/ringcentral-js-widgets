'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateAreaCode;
function validateAreaCode(code) {
  if (code === undefined) {
    return true;
  }
  if (code === null) {
    return false;
  }
  var areaCode = code.trim();
  if (areaCode.length === 0) {
    return true;
  }
  return areaCode.length === 3 && areaCode[0] !== '0';
}
//# sourceMappingURL=index.js.map
