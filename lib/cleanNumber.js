'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanNumber;
var cleanRegex = /[^\d*+#]/g;
var plusRegex = /\+/g;

/**
 * @function
 * @param {String} phoneNumber
 * @description Remove any characters except numeric, #, *, and leading +
 */
function cleanNumber(phoneNumber) {
  // remove everything except numerics,#, *, and leading +
  var result = phoneNumber.replace(cleanRegex, '');
  return result[0] === '+' ? '+' + result.substring(1).replace(plusRegex, '') : result;
}
//# sourceMappingURL=cleanNumber.js.map
