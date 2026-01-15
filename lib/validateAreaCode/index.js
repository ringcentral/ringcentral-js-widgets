"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateAreaCode;
require("core-js/modules/es.string.trim.js");
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
