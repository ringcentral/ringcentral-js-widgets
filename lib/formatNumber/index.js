'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatNumber;

var _phoneNumber = require('@ringcentral-integration/phone-number');

/**
 * @function
 * @description Format phone numbers
 * @param {String} params.phoneNumber
 * @param {Boolean} params.removeExtension
 * @param {String} params.countryCode
 * @param {String} params.areaCode
 * @return {String}
 */
function formatNumber(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$removeExtension = _ref.removeExtension,
      removeExtension = _ref$removeExtension === undefined ? false : _ref$removeExtension,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === undefined ? 'US' : _ref$countryCode,
      _ref$areaCode = _ref.areaCode,
      areaCode = _ref$areaCode === undefined ? '' : _ref$areaCode,
      _ref$international = _ref.international,
      international = _ref$international === undefined ? false : _ref$international;

  return (0, _phoneNumber.format)({
    phoneNumber: phoneNumber,
    countryCode: countryCode,
    areaCode: areaCode,
    removeExtension: removeExtension,
    type: international ? _phoneNumber.formatTypes.international : _phoneNumber.formatTypes.local
  });
}
//# sourceMappingURL=index.js.map
