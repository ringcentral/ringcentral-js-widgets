"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cleanNumber;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.split.js");
var cleanRegex = /[^\d*+#]/g;
var plusRegex = /\+/g;
var extensionDelimiter = /[*#]/g;
/**
 * Remove any characters except numeric, #, *, and leading +. We only consider
 * first occurrence of * or #. Things after subsequent * or # will be removed.
 */

function cleanNumber(phoneNumber) {
  var keepPlus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var cleaned = phoneNumber.replace(cleanRegex, '');
  var hasPlus = cleaned[0] === '+';
  var output = cleaned.replace(plusRegex, '').split(extensionDelimiter).slice(0, 2).join('*');
  return hasPlus && keepPlus ? "+".concat(output) : output;
}
//# sourceMappingURL=index.js.map
