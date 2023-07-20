"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = isSafari;
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
//# sourceMappingURL=isSafari.js.map
