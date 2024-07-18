"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customFormat = customFormat;
var _extractDigits = require("../extractDigits");
/**
 * @param localPhoneNumber phone number in local number format
 * @param template template to format the phone number
 * @param templateChar character to replace with phone number digits
 * @param strict if true, will throw an error if the number of digits in the phone number doesn't match the number of template characters
 * @returns formatted phone number
 *
 * @example
 * ```ts
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXXX' }); // '650-555-1234'
 *
 * customFormat({ localPhoneNumber: '6505551234', template: '(YYY) YYY-YYYY', templateChar: 'Y' }); // '(650) 555-1234'
 *
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXX', strict: true }); // Error: Invalid custom format: 6505551234 => XXX-XXX-XXX, number of digits don't match: 10 !== 9
 *
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXX'}); // '650-555-123' // ignore extra digits in non strict mode
 *
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXXXX'); // '650-555-1234' // extra X will be ignored in non strict mode
 * ```
 */
function customFormat(_ref) {
  var localPhoneNumber = _ref.localPhoneNumber,
    template = _ref.template,
    _ref$templateChar = _ref.templateChar,
    templateChar = _ref$templateChar === void 0 ? 'X' : _ref$templateChar,
    _ref$strict = _ref.strict,
    strict = _ref$strict === void 0 ? false : _ref$strict;
  var localDigits = (0, _extractDigits.extractDigits)(localPhoneNumber).split('');
  var numOfDigits = localDigits.length;
  var templateCharCount = 0;
  var result = template.split('').reduce(function (acc, _char) {
    if (_char === templateChar) {
      templateCharCount += 1;
      if (localDigits.length > 0) {
        acc.push(localDigits.shift());
      }
    } else {
      acc.push(_char);
    }
    return acc;
  }, []).join('');
  if (strict && templateCharCount !== numOfDigits) {
    throw new Error("Invalid custom format: ".concat(localPhoneNumber, " => ").concat(template, ", number of digits don't match: ").concat(numOfDigits, " !== ").concat(templateCharCount));
  }
  return result;
}
//# sourceMappingURL=customFormat.js.map
