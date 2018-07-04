'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeNumber;

var _phoneNumber = require('@ringcentral-integration/phone-number');

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
      removeExtension = _ref$removeExtension === undefined ? false : _ref$removeExtension,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === undefined ? 'US' : _ref$countryCode,
      _ref$areaCode = _ref.areaCode,
      areaCode = _ref$areaCode === undefined ? '' : _ref$areaCode;

  return (0, _phoneNumber.format)({
    phoneNumber: phoneNumber,
    removeExtension: removeExtension,
    countryCode: countryCode,
    areaCode: areaCode,
    type: _phoneNumber.formatTypes.e164
  });
}
//# sourceMappingURL=index.js.map
