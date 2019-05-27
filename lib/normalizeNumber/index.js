"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeNumber;

require("core-js/modules/es6.regexp.replace");

var _phoneNumber = require("@ringcentral-integration/phone-number");

/**
 * @function
 * @description Normalize phone numbers into E164 format
 * @param {String} params.phoneNumber
 * @param {Boolean} params.removeExtension
 * @param {String} params.countryCode
 * @param {String} params.areaCode
 * @return {String}
 */
function normalizeNumber(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$removeExtension = _ref.removeExtension,
      removeExtension = _ref$removeExtension === void 0 ? false : _ref$removeExtension,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === void 0 ? 'US' : _ref$countryCode,
      _ref$areaCode = _ref.areaCode,
      areaCode = _ref$areaCode === void 0 ? '' : _ref$areaCode;
  var normalizedNumber = (0, _phoneNumber.format)({
    phoneNumber: phoneNumber,
    removeExtension: removeExtension,
    countryCode: countryCode,
    areaCode: areaCode,
    type: _phoneNumber.formatTypes.e164
  });
  return normalizedNumber.replace(/\s/g, '');
}
//# sourceMappingURL=index.js.map
