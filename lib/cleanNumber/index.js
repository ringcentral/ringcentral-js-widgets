"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cleanNumber;

require("core-js/modules/es6.regexp.replace");

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
