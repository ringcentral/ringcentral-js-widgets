"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractDigits = extractDigits;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var regNonDigits = /[^\d]/g;
function extractDigits(str) {
  return str.replace(regNonDigits, '');
}
//# sourceMappingURL=extractDigits.js.map
