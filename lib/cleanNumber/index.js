"use strict";

require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cleanNumber;
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
