"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isSafari;

function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
//# sourceMappingURL=isSafari.js.map
