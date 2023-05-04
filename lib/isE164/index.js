"use strict";

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isE164;

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
