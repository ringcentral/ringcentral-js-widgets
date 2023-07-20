"use strict";

require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatContactPhoneNumber = void 0;
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var formatContactPhoneNumber = function formatContactPhoneNumber(_ref) {
  var _ref$phoneNumber = _ref.phoneNumber,
    phoneNumber = _ref$phoneNumber === void 0 ? '' : _ref$phoneNumber,
    countryCode = _ref.countryCode,
    isMultipleSiteEnabled = _ref.isMultipleSiteEnabled,
    siteCode = _ref.siteCode,
    _ref$maxExtensionNumb = _ref.maxExtensionNumberLength,
    maxExtensionNumberLength = _ref$maxExtensionNumb === void 0 ? 6 : _ref$maxExtensionNumb;
  if (!phoneNumber) {
    return phoneNumber;
  }
  // if the cleaned phone number is not a E164 format
  // we will show it directly, doesn't format it.
  var cleanedNumber = (0, _phoneNumber.parseIncompletePhoneNumber)(phoneNumber.toString());
  var isE164Number = (0, _phoneNumber.isE164)(cleanedNumber);
  if (isE164Number) {
    var formattedNumber = (0, _formatNumber.formatNumber)({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      maxExtensionLength: maxExtensionNumberLength
    });
    return formattedNumber;
  }
  // if multi-site is enabled then we will try to remove site code with same site
  if (isMultipleSiteEnabled && siteCode) {
    var _formattedNumber = (0, _formatNumber.formatNumber)({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      siteCode: siteCode,
      isMultipleSiteEnabled: isMultipleSiteEnabled,
      maxExtensionLength: maxExtensionNumberLength
    });
    return _formattedNumber;
  }
  return phoneNumber;
};
exports.formatContactPhoneNumber = formatContactPhoneNumber;
//# sourceMappingURL=helper.js.map
