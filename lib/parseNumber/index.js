'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseNumber;

var _phoneNumber = require('@ringcentral-integration/phone-number');

function parseNumber(_ref) {
  var phoneNumber = _ref.phoneNumber,
      countryCode = _ref.countryCode,
      areaCode = _ref.areaCode;

  var _parse = (0, _phoneNumber.parse)({
    input: phoneNumber,
    countryCode: countryCode,
    areaCode: areaCode
  }),
      hasPlus = _parse.hasPlus,
      number = _parse.phoneNumber,
      isServiceNumber = _parse.isServiceNumber,
      extension = _parse.extension,
      hasInvalidChars = _parse.hasInvalidChars;

  return {
    hasPlus: hasPlus,
    number: number,
    extension: extension,
    isServiceNumber: isServiceNumber,
    hasInvalidChars: hasInvalidChars
  };
}
//# sourceMappingURL=index.js.map
