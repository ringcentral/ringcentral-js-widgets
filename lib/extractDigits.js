"use strict";

require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractDigits = extractDigits;
var regNonDigits = /[^\d]/g;
function extractDigits(str) {
  return str.replace(regNonDigits, '');
}
//# sourceMappingURL=extractDigits.js.map
