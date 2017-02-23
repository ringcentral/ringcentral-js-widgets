'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanNumber;
exports.hasInvalidChar = hasInvalidChar;
exports.hasNumber = hasNumber;
var cleanRegex = /[^\d*+#]/g;
var plusRegex = /\+/g;
var extensionDelimiter = /[*#]/g;
/**
 * @function
 * @param {String} phoneNumber
 * @description Remove any characters except numeric, #, *, and leading +. We only consider
 * first occurence of * or #. Things after subsequent * or # will be removed.
 */

function cleanNumber(phoneNumber) {
  var cleaned = phoneNumber.replace(cleanRegex, '');
  var hasPlus = cleaned[0] === '+';
  var output = cleaned.replace(plusRegex, '').split(extensionDelimiter).slice(0, 2).join('*');
  return hasPlus ? '+' + output : output;
}

/**
 * @function
 * @param {String} phoneNumber
 * @description confirm has any invalid char
 */
function hasInvalidChar(phoneNumber) {
  return cleanRegex.test(phoneNumber);
}

/**
 * @function
 * @param {String} phoneNumber
 * @description confirm cleanedNumber has any digit
 */
function hasNumber(phoneNumber) {
  return (/\d/.test(phoneNumber)
  );
}
//# sourceMappingURL=index.js.map
