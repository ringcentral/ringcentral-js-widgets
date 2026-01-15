"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCountryCode = void 0;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _i18nIsoCountries = _interopRequireDefault(require("i18n-iso-countries"));
var _enums = require("../enums");
var _EvTypeError = require("./EvTypeError");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var checkCountryCode = exports.checkCountryCode = function checkCountryCode(input) {
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
//# sourceMappingURL=checkCountryCode.js.map
