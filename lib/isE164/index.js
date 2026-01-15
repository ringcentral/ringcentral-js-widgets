"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isE164;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
/**
 * @description helper function to judge if the number is E164 format
 * @param {number | string} result
 * @returns {Boolean}
 */
function isE164(number) {
  var E164Regex = /^\+[1-9]\d{1,14}$/;
  return E164Regex.test(number.toString());
}
//# sourceMappingURL=index.js.map
