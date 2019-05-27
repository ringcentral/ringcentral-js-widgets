"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNoAreaCode;

var _phoneNumber = require("@ringcentral-integration/phone-number");

function isNoAreaCode(input, regionSettings, brandId) {
  var _parse = (0, _phoneNumber.parse)({
    input: input,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode
  }),
      hasPlus = _parse.hasPlus,
      phoneNumber = _parse.phoneNumber,
      isServiceNumber = _parse.isServiceNumber;

  var countryCode = regionSettings.countryCode,
      areaCode = regionSettings.areaCode;

  if (brandId === '1210' && !isServiceNumber && !hasPlus && phoneNumber.length === 7 && (countryCode === 'CA' || countryCode === 'US') && areaCode === '') {
    return true;
  }

  return false;
}
//# sourceMappingURL=isNoAreaCode.js.map
