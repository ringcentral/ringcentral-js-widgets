"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatContactPhoneNumber = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var formatContactPhoneNumber = function formatContactPhoneNumber() {
  var phoneNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var countryCode = arguments.length > 1 ? arguments[1] : undefined;
  var isMultipleSiteEnabled = arguments.length > 2 ? arguments[2] : undefined;
  var siteCode = arguments.length > 3 ? arguments[3] : undefined;

  if (!phoneNumber) {
    return phoneNumber;
  } // if the cleaned phone number is not a E164 format
  // we will show it directly, doesn't format it.


  var cleanedNumber = (0, _phoneNumber.parseIncompletePhoneNumber)(phoneNumber.toString());
  var isE164Number = (0, _phoneNumber.isE164)(cleanedNumber);

  if (isE164Number) {
    var formattedNumber = (0, _formatNumber.formatNumber)({
      phoneNumber: phoneNumber,
      countryCode: countryCode
    });
    return formattedNumber;
  } // if multi-site is enabled then we will try to remove site code with same site


  if (isMultipleSiteEnabled && siteCode) {
    var _formattedNumber = (0, _formatNumber.formatNumber)({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      siteCode: siteCode,
      isMultipleSiteEnabled: isMultipleSiteEnabled
    });

    return _formattedNumber;
  }

  return phoneNumber;
};

exports.formatContactPhoneNumber = formatContactPhoneNumber;
//# sourceMappingURL=helper.js.map
