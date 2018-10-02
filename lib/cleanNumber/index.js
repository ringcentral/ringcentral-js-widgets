'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanNumber;
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
