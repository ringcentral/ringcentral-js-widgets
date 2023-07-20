"use strict";

require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCountryCode = void 0;
var _i18nIsoCountries = _interopRequireDefault(require("i18n-iso-countries"));
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _enums = require("../enums");
var _EvTypeError = require("./EvTypeError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var checkCountryCode = function checkCountryCode(input) {
  var cleanedNumber = (0, _phoneNumber.parseIncompletePhoneNumber)(input.toString());
  var isE164Number = (0, _phoneNumber.isE164)(cleanedNumber);
  if (isE164Number) {
    var _parse = (0, _phoneNumber.parse)({
        input: input
      }),
      parsedNumber = _parse.parsedNumber,
      isValid = _parse.isValid,
      hasInvalidChars = _parse.hasInvalidChars,
      parsedCountry = _parse.parsedCountry;
    if (isValid && !hasInvalidChars && parsedNumber) {
      var dialoutCountryCode = _i18nIsoCountries["default"].alpha2ToAlpha3(parsedCountry);
      if (dialoutCountryCode !== 'USA') {
        throw new _EvTypeError.EvTypeError({
          type: _enums.messageTypes.NO_SUPPORT_COUNTRY
        });
      }
    }
  }
};
exports.checkCountryCode = checkCountryCode;
//# sourceMappingURL=checkCountryCode.js.map
