"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.isBlank = isBlank;
require("core-js/modules/es.regexp.exec.js");
function isBlank(str) {
  if (!str) {
    return true;
  }
  return !/\S/.test(str);
}
var _default = exports["default"] = isBlank;
//# sourceMappingURL=isBlank.js.map
