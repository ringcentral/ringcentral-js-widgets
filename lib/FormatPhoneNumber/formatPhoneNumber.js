"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPhoneNumber = void 0;

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formatPhoneNumber = function formatPhoneNumber(_ref) {
  var phoneNumber = _ref.phoneNumber,
      _ref$countryCode = _ref.countryCode,
      countryCode = _ref$countryCode === void 0 ? 'US' : _ref$countryCode,
      _ref$currentLocale = _ref.currentLocale,
      currentLocale = _ref$currentLocale === void 0 ? 'en-US' : _ref$currentLocale;
  return phoneNumber ? (0, _phoneNumber.format)({
    phoneNumber: phoneNumber,
    countryCode: countryCode
  }) || phoneNumber : _i18n["default"].getString('unKnown', currentLocale);
};

exports.formatPhoneNumber = formatPhoneNumber;
//# sourceMappingURL=formatPhoneNumber.js.map
