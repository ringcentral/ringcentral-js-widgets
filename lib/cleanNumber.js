'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanNumber;
var cleanRegex = /[^\d*+#]/g;
var plusRegex = /\+/g;
var extensionDelimiter = /[*#]/g;
/**
 * @function
 * @param {String} phoneNumber
 * @description Remove any characters except numeric, #, *, and leading +. We do not consider the 
 * situation that a number contains several *, # or a combination of these 2 symbols strictly.
 */
function cleanNumber(phoneNumber) {
  var cleaned = phoneNumber.replace(cleanRegex, '');
  var hasPlus = cleaned[0] === '+';
  var output = cleaned.replace(plusRegex, '').split(extensionDelimiter).slice(0, 2).join('*');
  return hasPlus ? '+' + output : output;
}
//# sourceMappingURL=cleanNumber.js.map
