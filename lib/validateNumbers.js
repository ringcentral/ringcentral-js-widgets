"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateNumbers;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

var _normalizeNumber = _interopRequireDefault(require("./normalizeNumber"));

var _isValidNumber = _interopRequireDefault(require("./isValidNumber"));

var _isNoAreaCode = _interopRequireDefault(require("./isNoAreaCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function numberParser(phoneNumbers, regionSettings) {
  var countryCode = regionSettings.countryCode,
      areaCode = regionSettings.areaCode;
  var normalizedNumbers = phoneNumbers.map(function (phoneNumber) {
    return (0, _normalizeNumber["default"])({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      areaCode: areaCode
    });
  });
  return normalizedNumbers;
}

function numberFormat(phoneNumbers, regionSettings, brandId) {
  var errors = [];
  phoneNumbers.map(function (phoneNumber) {
    if (!(0, _isValidNumber["default"])(phoneNumber, regionSettings)) {
      errors.push({
        phoneNumber: phoneNumber,
        type: 'noToNumber'
      });
      return null;
    }

    if ((0, _isNoAreaCode["default"])(phoneNumber, regionSettings, brandId)) {
      errors.push({
        phoneNumber: phoneNumber,
        type: 'noAreaCode'
      });
    }

    return null;
  });
  return {
    result: errors.length === 0,
    errors: errors
  };
}

function validateNumbers(phoneNumbers, regionSettings, brandId) {
  var formatedResult = numberFormat(phoneNumbers, regionSettings, brandId);

  if (!formatedResult.result) {
    formatedResult.errors.forEach(function (error) {
      throw error;
    });
    return formatedResult;
  }

  var parsedResult = numberParser(phoneNumbers, regionSettings);
  return parsedResult;
}
//# sourceMappingURL=validateNumbers.js.map
