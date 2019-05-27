"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isBlank;

function isBlank(str) {
  if (!str) {
    return true;
  }

  return !/\S/.test(str);
}
//# sourceMappingURL=isBlank.js.map
