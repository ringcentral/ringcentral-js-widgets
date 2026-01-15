"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cleanNumber;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var cleanRegex = /[^\d*+,#]/g;

/**
 * @function
 * @param {String} input
 * @returns {String}
 */
function cleanNumber(input) {
  return (input || '').replace(cleanRegex, '');
}
//# sourceMappingURL=index.js.map
