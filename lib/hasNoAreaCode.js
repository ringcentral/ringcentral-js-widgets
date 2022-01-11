"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasNoAreaCode = hasNoAreaCode;

var _phoneNumber = require("@ringcentral-integration/phone-number");

function hasNoAreaCode(_ref) {
  var input = _ref.input,
      countryCode = _ref.countryCode,
      areaCode = _ref.areaCode;

  var _parse = (0, _phoneNumber.parse)({
    input: input,
    countryCode: countryCode
  }),
      hasPlus = _parse.hasPlus,
      phoneNumber = _parse.phoneNumber,
      isServiceNumber = _parse.isServiceNumber;

  return !isServiceNumber && !hasPlus && phoneNumber.length === 7 && (countryCode === 'CA' || countryCode === 'US') && areaCode === '';
} // allowRegionSettings
//# sourceMappingURL=hasNoAreaCode.js.map
