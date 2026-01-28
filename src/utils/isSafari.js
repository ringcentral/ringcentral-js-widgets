"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = isSafari;
require("core-js/modules/es.regexp.exec.js");
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
//# sourceMappingURL=isSafari.js.map
