"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeNumber = normalizeNumber;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _phoneNumber = require("@ringcentral-integration/phone-number");
/**
 * @function
 * @description Normalize phone numbers into E164 format
 */
function normalizeNumber(_ref) {
  var phoneNumber = _ref.phoneNumber,
    _ref$removeExtension = _ref.removeExtension,
    removeExtension = _ref$removeExtension === void 0 ? false : _ref$removeExtension,
    _ref$countryCode = _ref.countryCode,
    countryCode = _ref$countryCode === void 0 ? 'US' : _ref$countryCode,
    _ref$areaCode = _ref.areaCode,
    areaCode = _ref$areaCode === void 0 ? '' : _ref$areaCode,
    _ref$maxExtensionLeng = _ref.maxExtensionLength,
    maxExtensionLength = _ref$maxExtensionLeng === void 0 ? 6 : _ref$maxExtensionLeng,
    _ref$siteCode = _ref.siteCode,
    siteCode = _ref$siteCode === void 0 ? '' : _ref$siteCode,
    _ref$isMultipleSiteEn = _ref.isMultipleSiteEnabled,
    isMultipleSiteEnabled = _ref$isMultipleSiteEn === void 0 ? false : _ref$isMultipleSiteEn;
  var normalizedNumber = (0, _phoneNumber.format)({
    phoneNumber: phoneNumber,
    removeExtension: removeExtension,
    countryCode: countryCode,
    areaCode: areaCode,
    type: _phoneNumber.formatTypes.e164,
    maxExtensionLength: maxExtensionLength,
    siteCode: siteCode,
    isMultipleSiteEnabled: isMultipleSiteEnabled
  });
  return normalizedNumber.replace(/\s/g, '');
}
//# sourceMappingURL=normalizeNumber.js.map
