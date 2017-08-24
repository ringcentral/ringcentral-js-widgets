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
 * @description Remove any characters except numeric, #, *, and leading +. We only consider
 * first occurence of * or #. Things after subsequent * or # will be removed.
 */

function cleanNumber(phoneNumber) {
  var keepPlus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var cleaned = phoneNumber.replace(cleanRegex, '');
  var hasPlus = cleaned[0] === '+';
  var output = cleaned.replace(plusRegex, '').split(extensionDelimiter).slice(0, 2).join('*');
  return hasPlus && keepPlus ? '+' + output : output;
}
//# sourceMappingURL=index.js.map
